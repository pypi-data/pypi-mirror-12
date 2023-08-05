# Copyright (c) 2014 Stefan C. Mueller

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.

import logging
import bidict
import uuid
import urlparse
import pickle
import socket
import random

import twistit
from pickle import PicklingError
from twisted.python.failure import Failure

logger = logging.getLogger(__name__)

from twisted.internet import defer, task, reactor, endpoints

from anycall import connectionpool


def create_tcp_rpc_system(hostname=None, port_range=(0,), ping_interval=1, ping_timeout=0.5):
    """
    Creates a TCP based :class:`RPCSystem`.
    
    :param port_range: List of ports to try. If `[0]`, an arbitrary free
        port will be used.
    """
    
    def ownid_factory(listeningport):
        port = listeningport.getHost().port
        return "%s:%s" %(hostname, port)

    def make_client_endpoint(peer):
        host, port = peer.split(":")
        if host == socket.getfqdn():
            host = "localhost"
        return endpoints.TCP4ClientEndpoint(reactor, host, int(port), timeout=5)
    
    if hostname is None:
        hostname = socket.getfqdn()

    server_endpointA = TCP4ServerRangeEndpoint(reactor, port_range)
    pool = connectionpool.ConnectionPool(server_endpointA, make_client_endpoint, ownid_factory)
    return RPCSystem(pool, ping_interval=ping_interval, ping_timeout=ping_timeout)


class TCP4ServerRangeEndpoint(object):
    """
    Like a TCP4ServerEndpoint but tries to open a port from a given range
    """
    def __init__(self, reactor, port_range, backlog=50, interface=''):
        self.reactor = reactor
        self.port_range = list(port_range)
        self.backlog = backlog
        self.interface = interface
        
    @twistit.yieldefer
    def listen(self, protocolFactory):
        
        if self.port_range != [0]:
        
            # try ports in a random order to reduce the risk of a collision
            # with other processes trying to do the same
            ports = self.port_range
            ports = ports * 2 # try each port twice
            random.shuffle(ports)
            
        else:
            ports = [0]
            
        def try_open(_):
            port = ports.pop()
            endpoint = endpoints.TCP4ServerEndpoint(self.reactor, 
                                                    port, 
                                                    self.backlog, 
                                                    self.interface);
            d = endpoint.listen(protocolFactory)
            if ports:
                d.addErrback(try_open)
            
            return d
        
        return try_open(None)


class RPCSystem(object):
    
    _MESSAGE_TYPE = "RPC"
    
    _PING = uuid.uuid5(uuid.NAMESPACE_URL, "ping")
    
    #: Default RPCSystem. Used while unpicking function stubs.
    #: If not set unpicking stubs will fail.
    default = None
    
    def __init__(self, connectionpool, ping_interval = 5*60, ping_timeout = 60):
        """
        :param connectionpool: Messaging system to use for low-level communication.
        
        :param ping_interval: Every `ping_interval` seconds we send for each unfinished
           call a message to our peers asking conformation that they are still working
           on it. If the peer has somehow 'lost' the call, or if we don't get a reply
           within `ping_timeout` seconds, the call will fail.
           
           This protects against unnoticed loss of connection, or if the remote process
           dies unexpectantly. In such cases the call might otherwise hang forever .
           
         :param ping_interval: See `ping_interval`-
        """
        self._connectionpool = connectionpool
        self._connectionpool.register_type(self._MESSAGE_TYPE)
        
        #: If :meth:`open` has finished.
        self._opened = False
        
        #: Local functions that may be invoked from remote.
        #: maps `functionid <-> callable`
        self._functions = bidict.bidict()
        
        #: Calls made from remote to here that are currently in progress.
        #: Maps `(peerid, callid)` -> `Deferred`.
        self._remote_to_local = {}
        
        #: Calls made from here to remote functions.
        #: Maps `(peerid, callid)` -> `Deferred`.
        self._local_to_remote = {}

        self._ping_interval = ping_interval
        self._ping_timeout = ping_timeout
        self._ping_loop = task.LoopingCall(self._ping_loop_iteration)
        self._ping_current_iteration = None # self._ping_loop.cancel() won't cancel an ongoing call, so we use this deferred.
        
        self._functions[self._PING] = self._ping
        
    @property
    def connection_established(self):
        return self._connectionpool.connection_established
    
    @connection_established.setter
    def connection_established(self, value):
        self._connectionpool.connection_established = value
        
    def pre_connect(self, peer):
        """
        Ensures that we have an open connection to the given peer.
        
        Returns the peer id. This should be equal to the given one, but
        it might not if the given peer was, say, the IP and the peer
        actually identifies itself with a host name. The returned peer
        is the real one that should be used. This can be handy if we aren't
        100% sure of the peer's identity.
        """
        return self._connectionpool.pre_connect(peer)
        
    @property
    def ownid(self):
        return self._connectionpool.ownid

    def open(self):
        """
        Opens the port.
        
        :returns: Deferred that callbacks when we are ready to make and receive calls.
        """
        logging.debug("Opening rpc system")
        d = self._connectionpool.open(self._packet_received)
        
        def opened(_):
            logging.debug("RPC system is open")
            self._opened = True
            logging.debug("Starting ping loop")
            self._ping_loop.start(self._ping_interval, now=False)
        
        d.addCallback(opened)
        return d
    
    def close(self):
        """
        Stop listing for new connections and close all open connections.
        
        :returns: Deferred that calls back once everything is closed.
        """
        assert self._opened, "RPC System is not opened"
        logger.debug("Closing rpc system. Stopping ping loop")
        self._ping_loop.stop()
        if self._ping_current_iteration:
            self._ping_current_iteration.cancel()
        return self._connectionpool.close()

    def get_function_url(self, function):
        """
        Registers the given callable in the system (if it isn't already)
        and returns the URL that can be used to invoke the given function from remote.
        """
        assert self._opened, "RPC System is not opened"
        logging.debug("get_function_url(%s)" % repr(function))
        if function in ~self._functions:
            functionid = self._functions[:function]
        else:
            functionid = uuid.uuid1()
            self._functions[functionid] = function
        return "anycall://%s/functions/%s" % (self._connectionpool.ownid, functionid.hex)


    def create_function_stub(self, url):
        """
        Create a callable that will invoke the given remote function.
        
        The stub will return a deferred even if the remote function does not.
        """
        assert self._opened, "RPC System is not opened"
        logging.debug("create_function_stub(%s)" % repr(url))
        parseresult = urlparse.urlparse(url)
        scheme = parseresult.scheme
        path = parseresult.path.split("/")
        if scheme != "anycall":
            raise ValueError("Not an anycall URL: %s" % repr(url))
        if len(path) != 3 or path[0] != "" or path[1] != "functions":
            raise ValueError("Not an URL for a remote function: %s" % repr(url))
        try:
            functionid = uuid.UUID(path[2])
        except ValueError:
            raise ValueError("Not a valid URL for a remote function: %s" % repr(url))
        
        return _RPCFunctionStub(parseresult.netloc, functionid, self)
    
    def create_local_function_stub(self, func):
        assert self._opened, "RPC System is not opened"
        if isinstance(func, _RPCFunctionStub):
            return func
        url = self.get_function_url(func)
        return self.create_function_stub(url)
        
    def _send(self, peer, obj):
        logger.debug("Sending %r to %s." % (peer, obj))
        try:
            msg = pickle.dumps(obj, pickle.HIGHEST_PROTOCOL)
        except:
            logger.exception("Pickling of the value %r has failed." % obj)
            raise
                
        return self._connectionpool.send(peer, self._MESSAGE_TYPE, msg)
    
    def _packet_received(self, peerid, typename, data):
        try:
            if typename != self._MESSAGE_TYPE:
                raise ValueError("Received unexpected packet type:%s" % typename)
            
            obj = pickle.loads(data)
    
            logger.debug("Received %r from %s" % (obj, peerid))
            
            if isinstance(obj, _Call):
                self._Call_received(peerid, obj)
            elif isinstance(obj, _CallReturn):
                self._CallReturn_received(peerid, obj)
            elif isinstance(obj, _CallFail):
                self._CallFail_received(peerid, obj)
            elif isinstance(obj, _CallCancel):
                self._CallCancel_received(peerid, obj)
            else:
                raise ValueError("Received unknown object type")
        except:
            logger.exception("error while receiving package from %r" %(peerid))

    def _Call_received(self, peerid, obj):
        if obj.functionid not in self._functions:
            raise ValueError("Call for unregistered function.")
        
        func = self._functions[obj.functionid]
        
        logger.debug("Invoking %r for peer %s." % (func, peerid))
        d = defer.maybeDeferred(func, *obj.args, **obj.kwargs)
        
        self._remote_to_local[(peerid, obj.callid)] = d
        
        def on_success(retval):
            if (peerid, obj.callid) in self._remote_to_local:
                logger.debug("Call to %r successful." % func)
                
                try:
                    retval = self._send(peerid, _CallReturn(obj.callid, retval))
                    del self._remote_to_local[(peerid, obj.callid)]
                    return retval
                except PicklingError:
                    return on_fail(Failure())
                    
            
        def on_fail(failure):
            if (peerid, obj.callid) in self._remote_to_local:
                logger.debug("Failed call to %r: %r" % (func, failure))
                del self._remote_to_local[(peerid, obj.callid)]
                return self._send(peerid, _CallFail(obj.callid, failure))
        
        d.addCallbacks(on_success, on_fail)
        
        def uncought(failure):
            logger.error(str(failure))
            
        d.addErrback(uncought)

    def _CallReturn_received(self, peerid, obj):
        try:
            d = self._local_to_remote.pop((peerid, obj.callid))
        except KeyError:
            raise ValueError("Received return value for non-existent call.")
        if not twistit.has_result(d):
            d.callback(obj.retval)
        else:
            logger.warn("Received return for call %r to %r for deferred that is already called back."%
                        (obj.callid, peerid))
        
    def _CallFail_received(self, peerid, obj):
        try:
            d = self._local_to_remote.pop((peerid, obj.callid))
        except KeyError:
            raise ValueError("Received failure for non-existent call.")
        logging.debug("Received call failure: %s", repr(obj.failure))
        if not twistit.has_result(d):
            d.errback(obj.failure)
        
    def _CallCancel_received(self, peerid, obj):
        try:
            d = self._remote_to_local.pop((peerid, obj.callid))
            if not twistit.has_result(d):
                d.cancel()
        except KeyError:
            # We have sent the result already.
            pass
        
    def _invoke_function(self, peerid, functionid, args, kwargs):
        
        if peerid == self.ownid:
            function = self._functions[functionid]
            return defer.maybeDeferred(function, *args, **kwargs)
        
        def canceller(d):
            if (peerid, callid) in self._local_to_remote:
                
                def uncought(failure):
                    logger.error(str(failure))
                
                d = self._send(peerid, _CallCancel(callid))
                d.addErrback(uncought)
        
        callid = uuid.uuid1()
        call = _Call(callid, functionid, args, kwargs)
        
        # We want to have `_local_to_remote` set before
        # we call `_send`. Just in case we get an answer
        # before the deferred we get from `_send` reports
        # success. We will not pass this deferred
        # on if the send operation has failed.
        d = defer.Deferred(canceller)
        self._local_to_remote[(peerid, callid)] = d
        
        d_send = self._send(peerid, call)
        
        def send_success(_):
            return d
        
        def send_failed(failure):
            del self._local_to_remote[(peerid, callid)]
            return failure
        
        d_send.addCallbacks(send_success, send_failed)
        return d_send

    def _ping_loop_iteration(self):
        """
        Called every `ping_interval` seconds.
        Invokes `_ping()` remotely for every ongoing call.
        """
        
        deferredList = []
        
        for peerid, callid in list(self._local_to_remote):
            
            if (peerid, callid) not in self._local_to_remote:
                continue # call finished in the meantime
            
            logger.debug("sending ping")
            d = self._invoke_function(peerid, self._PING, (self._connectionpool.ownid, callid), {})
            #twistit.timeout_deferred(d, self._ping_timeout, "Lost communication to peer during call.")
            
            def failed(failure):
                if (peerid, callid) in self._local_to_remote:
                    d = self._local_to_remote.pop((peerid, callid))
                    d.errback(failure)
                    
            def success(value):
                logger.debug("received pong")
                return value
                    
            d.addCallbacks(success, failed)
            deferredList.append(d)
   
        d = defer.DeferredList(deferredList)
            
        def done(_):
            self._ping_current_iteration = None
        self._ping_current_iteration = d
        d.addBoth(done)
        return d
    
    def _ping(self, peerid, callid):
        """
        Called from remote to ask if a call made to here is still in progress.
        """
        if not (peerid, callid) in self._remote_to_local:
            logger.warn("No remote call %s from %s. Might just be unfoutunate timing." % (callid, peerid))

class _RPCFunctionStub(object):
    def __init__(self, peerid, functionid, rpcsystem):
        self.peerid = peerid
        self.functionid = functionid
        self.rpcsystem = rpcsystem
    
    def __call__(self, *args, **kwargs):
        d = self.rpcsystem._invoke_function(self.peerid, self.functionid, args, kwargs)
        return d
    
    def __repr__(self):
        return "RPCStub(%r, %r)" % (self.peerid, self.functionid)
    
    def __str__(self):
        return repr(self)
    
    def __eq__(self, other):
        return self.peerid == other.peerid and self.functionid == other.functionid
    
    def __ne__(self, other):
        return not self.__eq__(other)
    
    def __hash__(self):
        return hash(self.peerid) + hash(self.functionid)
    
    def __getstate__(self):
        return {
                "peerid":self.peerid,
                "functionid":self.functionid
        }
        
    def __setstate__(self, state):
        rpcsystem = RPCSystem.default
        if rpcsystem is None:
            raise ValueError("Cannot unpickle function stubs without RPCSystem.default set.")
        self.peerid = state["peerid"]
        self.functionid = state["functionid"]
        self.rpcsystem = rpcsystem

class _Call(object):
    def __init__(self, callid, functionid, args, kwargs):
        self.callid = callid
        self.functionid = functionid
        self.args = args
        self.kwargs = kwargs
    def __repr__(self):
        return "_Call(%s, %s)" %(repr(self.callid), repr(self.functionid))
        
class _CallReturn(object):
    def __init__(self, callid, retval):
        self.callid = callid
        self.retval = retval
    def __repr__(self):
        return "_CallReturn(%s)" %(repr(self.callid))
        
class UnpicklableFailure(Exception):
    def __init__(self, stringrep):
        Exception.__init__(self, stringrep)

    
class _CallFail(object):
    def __init__(self, callid, failure):
        self.callid = callid
        try:
            pickle.loads(pickle.dumps(failure, pickle.HIGHEST_PROTOCOL))
        except:
            # failure cannot be pickled.
            failure = UnpicklableFailure(failure.getTraceback())
        self.failure = failure
    def __repr__(self):
        return "_CallFail(%s, %s)" %(repr(self.callid), repr(self.failure))
    
class _CallCancel(object):
    def __init__(self, callid):
        self.callid = callid
    def __repr__(self):
        return "_CallCancel(%s)" %(repr(self.callid))
    
