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

import abc
import collections
import logging
import random
import retrying

import six

import oslo_messaging
from oslo_messaging._drivers.zmq_driver import zmq_address
from oslo_messaging._i18n import _LI, _LW


LOG = logging.getLogger(__name__)


@six.add_metaclass(abc.ABCMeta)
class MatchMakerBase(object):

    def __init__(self, conf, *args, **kwargs):
        super(MatchMakerBase, self).__init__(*args, **kwargs)

        self.conf = conf

    @abc.abstractmethod
    def register(self, target, hostname, listener_type):
        """Register target on nameserver.

       :param target: the target for host
       :type target: Target
       :param hostname: host for the topic in "host:port" format
       :type hostname: String
       :param listener_type: Listener socket type ROUTER, SUB etc.
       :type listener_type: String
       """

    @abc.abstractmethod
    def unregister(self, target, hostname, listener_type):
        """Unregister target from nameserver.

       :param target: the target for host
       :type target: Target
       :param hostname: host for the topic in "host:port" format
       :type hostname: String
       :param listener_type: Listener socket type ROUTER, SUB etc.
       :type listener_type: String
       """

    @abc.abstractmethod
    def get_hosts(self, target, listener_type):
        """Get all hosts from nameserver by target.

       :param target: the default target for invocations
       :type target: Target
       :returns: a list of "hostname:port" hosts
       """

    def get_single_host(self, target, listener_type, timeout=None, retry=0):
        """Get a single host by target.

       :param target: the target for messages
       :type target: Target
       :param timeout: matchmaker query timeout
       :type timeout: integer
       :param retry: the number of retries to do
            None or -1 means retry forever
            0 means do not retry
            N means retry N times
       :type retry: integer
       :returns: a "hostname:port" host
       """

        if not isinstance(timeout, int) and timeout is not None:
            raise ValueError(
                "timeout must be integer, not {0}".format(type(timeout)))
        if not isinstance(retry, int) and retry is not None:
            raise ValueError(
                "retry must be integer, not {0}".format(type(retry)))

        if timeout is None or timeout < 0:
            full_timeout = 0
            retry_timeout = 0
        else:
            retry_timeout = timeout * 1000

            if retry is None or retry < 0:
                full_timeout = None
            else:
                full_timeout = retry * retry_timeout

        _retry = retrying.retry(stop_max_delay=full_timeout,
                                wait_fixed=retry_timeout)

        @_retry
        def _get_single_host():
            hosts = self.get_hosts(target, listener_type)
            try:
                if not hosts:
                    err_msg = "No hosts were found for target %s." % target
                    LOG.error(err_msg)
                    raise oslo_messaging.InvalidTarget(err_msg, target)

                if len(hosts) == 1:
                    host = hosts[0]
                    LOG.info(_LI(
                        "A single host %(host)s found for target %(target)s.")
                        % {"host": host, "target": target})
                else:
                    host = random.choice(hosts)
                    LOG.warning(_LW(
                        "Multiple hosts %(hosts)s were found for target "
                        " %(target)s. Using the random one - %(host)s.")
                        % {"hosts": hosts, "target": target, "host": host})
                return host
            except oslo_messaging.InvalidTarget as ex:
                if timeout:
                    raise oslo_messaging.MessagingTimeout()
                else:
                    raise ex

        return _get_single_host()


class DummyMatchMaker(MatchMakerBase):

    def __init__(self, conf, *args, **kwargs):
        super(DummyMatchMaker, self).__init__(conf, *args, **kwargs)

        self._cache = collections.defaultdict(list)

    def register(self, target, hostname, listener_type):
        key = zmq_address.target_to_key(target, listener_type)
        if hostname not in self._cache[key]:
            self._cache[key].append(hostname)

    def unregister(self, target, hostname, listener_type):
        key = zmq_address.target_to_key(target, listener_type)
        if hostname in self._cache[key]:
            self._cache[key].remove(hostname)

    def get_hosts(self, target, listener_type):
        key = zmq_address.target_to_key(target, listener_type)
        return self._cache[key]
