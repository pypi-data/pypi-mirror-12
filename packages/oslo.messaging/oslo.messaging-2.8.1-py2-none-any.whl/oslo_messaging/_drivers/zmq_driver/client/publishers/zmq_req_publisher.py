#    Copyright 2015 Mirantis, Inc.
#
#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.

import contextlib
import logging
import uuid

import six

import oslo_messaging
from oslo_messaging._drivers import common as rpc_common
from oslo_messaging._drivers.zmq_driver.client.publishers\
    import zmq_publisher_base
from oslo_messaging._drivers.zmq_driver import zmq_address
from oslo_messaging._drivers.zmq_driver import zmq_async
from oslo_messaging._drivers.zmq_driver import zmq_names
from oslo_messaging._i18n import _LE, _LI

LOG = logging.getLogger(__name__)

zmq = zmq_async.import_zmq()


class ReqPublisher(zmq_publisher_base.PublisherBase):

    def __init__(self, conf, matchmaker):
        super(ReqPublisher, self).__init__(conf)
        self.matchmaker = matchmaker

    def send_request(self, request):

        if request.msg_type != zmq_names.CALL_TYPE:
            raise zmq_publisher_base.UnsupportedSendPattern(request.msg_type)

        socket, connect_address = self._connect_to_host(request.target,
                                                        request.timeout)
        request.host = connect_address
        self._send_request(socket, request)
        return self._receive_reply(socket, request)

    def _resolve_host_address(self, target, timeout=0):
        host = self.matchmaker.get_single_host(target, timeout)
        return zmq_address.get_tcp_direct_address(host)

    def _connect_to_host(self, target, timeout=0):

        try:
            self.zmq_context = zmq.Context()
            socket = self.zmq_context.socket(zmq.REQ)

            if six.PY3:
                socket.setsockopt_string(zmq.IDENTITY, str(uuid.uuid1()))
            else:
                socket.identity = str(uuid.uuid1())

            connect_address = self._resolve_host_address(target, timeout)

            LOG.info(_LI("Connecting REQ to %s") % connect_address)

            socket.connect(connect_address)
            self.outbound_sockets[str(target)] = socket
            return socket, connect_address

        except zmq.ZMQError as e:
            errmsg = _LE("Error connecting to socket: %s") % str(e)
            LOG.error(_LE("Error connecting to socket: %s") % str(e))
            raise rpc_common.RPCException(errmsg)

    @staticmethod
    def _receive_reply(socket, request):

        def _receive_method(socket):
            return socket.recv_pyobj()

        # NOTE(ozamiatin): Check for retry here (no retries now)
        with contextlib.closing(zmq_async.get_reply_poller()) as poller:
            poller.register(socket, recv_method=_receive_method)
            reply, socket = poller.poll(timeout=request.timeout)
            if reply is None:
                raise oslo_messaging.MessagingTimeout(
                    "Timeout %s seconds was reached" % request.timeout)
            LOG.info(_LI("Received reply %s") % reply)
            if reply[zmq_names.FIELD_FAILURE]:
                raise rpc_common.deserialize_remote_exception(
                    reply[zmq_names.FIELD_FAILURE],
                    request.allowed_remote_exmods)
            else:
                return reply[zmq_names.FIELD_REPLY]

    def close(self):
        # For contextlib compatibility
        self.cleanup()


class ReqPublisherLight(ReqPublisher):

    def __init__(self, conf, matchmaker):
        super(ReqPublisherLight, self).__init__(conf, matchmaker)

    def _resolve_host_address(self, target, timeout=0):
        return zmq_address.get_broker_address(self.conf)

    def _send_request(self, socket, request):

        LOG.info(_LI("Sending %(type)s message_id %(message)s"
                     " to a target %(target)s, host:%(host)s")
                 % {"type": request.msg_type,
                    "message": request.message_id,
                    "target": request.target,
                    "host": request.host})

        envelope = request.create_envelope()

        socket.send_pyobj(envelope, zmq.SNDMORE)
        socket.send_pyobj(request)
