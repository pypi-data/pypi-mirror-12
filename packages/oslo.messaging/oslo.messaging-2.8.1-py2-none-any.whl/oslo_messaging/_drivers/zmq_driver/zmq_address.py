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


def combine_address(host, port):
    return "%s:%s" % (host, port)


def get_tcp_direct_address(host):
    return "tcp://%s" % str(host)


def get_tcp_random_address(conf):
    return "tcp://*"


def get_broker_address(conf):
    return "ipc://%s/zmq-broker" % conf.rpc_zmq_ipc_dir


def target_to_key(target):
    if target.topic and target.server:
        attributes = ['topic', 'server']
        key = ".".join(getattr(target, attr) for attr in attributes)
        return key
    if target.topic:
        return target.topic
    if target.server:
        return target.server
