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

from neutron.common import log
from neutron.common import rpc as n_rpc
from neutron.common import topics
from neutron.openstack.common import log as logging

LOG = logging.getLogger(__name__)

TOPIC_OPFLEX = 'opflex'


class AgentNotifierApi(n_rpc.RpcProxy):

    BASE_RPC_API_VERSION = '1.1'

    def __init__(self, topic):
        super(AgentNotifierApi, self).__init__(
            topic=topic, default_version=self.BASE_RPC_API_VERSION)
        self.topic_port_update = topics.get_topic_name(topic, topics.PORT,
                                                       topics.UPDATE)
        self.topic_subnet_update = topics.get_topic_name(topic, topics.SUBNET,
                                                         topics.UPDATE)

    def port_update(self, context, port):
        self.fanout_cast(context,
                         self.make_msg('port_update',
                                       port=port),
                         topic=self.topic_port_update)

    def subnet_update(self, context, subnet):
        self.fanout_cast(context,
                         self.make_msg('subnet_update',
                                       subnet=subnet),
                         topic=self.topic_subnet_update)


class GBPServerRpcApiMixin(n_rpc.RpcProxy):
    """Agent-side RPC (stub) for agent-to-plugin interaction."""

    GBP_RPC_VERSION = "1.0"

    def __init__(self, topic):
        super(GBPServerRpcApiMixin, self).__init__(
            topic=topic, default_version=self.GBP_RPC_VERSION)

    @log.log
    def get_gbp_details(self, context, agent_id, device=None, host=None):
        return self.call(context,
                         self.make_msg('get_gbp_details',
                                       agent_id=agent_id,
                                       device=device,
                                       host=host),
                         version=self.GBP_RPC_VERSION)

    @log.log
    def get_gbp_details_list(self, context, agent_id, devices=None, host=None):
        return self.call(context,
                         self.make_msg('get_gbp_details_list',
                                       agent_id=agent_id,
                                       devices=devices,
                                       host=host),
                         version=self.GBP_RPC_VERSION)

    @log.log
    def get_vrf_details(self, context, agent_id, vrf_id=None, host=None):
        return self.call(context,
                         self.make_msg('get_vrf_details',
                                       agent_id=agent_id,
                                       vrf_id=vrf_id,
                                       host=host),
                         version=self.GBP_RPC_VERSION)

    @log.log
    def get_vrf_details_list(self, context, agent_id, vrf_ids=None, host=None):
        return self.call(context,
                         self.make_msg('get_vrf_details_list',
                                       agent_id=agent_id,
                                       vrf_ids=vrf_ids,
                                       host=host),
                         version=self.GBP_RPC_VERSION)

    @log.log
    def ip_address_owner_update(self, context, agent_id, ip_owner_info,
                                host=None):
        self.fanout_cast(context,
                         self.make_msg('ip_address_owner_update',
                                       agent_id=agent_id,
                                       ip_owner_info=ip_owner_info,
                                       host=host),
                         version=self.GBP_RPC_VERSION)


class GBPServerRpcCallback(n_rpc.RpcCallback):
    """Plugin-side RPC (implementation) for agent-to-plugin interaction."""

    # History
    #   1.0 Initial version

    RPC_API_VERSION = "1.0"

    def __init__(self, gbp_driver):
        super(GBPServerRpcCallback, self).__init__()
        self.gbp_driver = gbp_driver

    def get_gbp_details(self, context, **kwargs):
        return self.gbp_driver.get_gbp_details(context, **kwargs)

    def get_gbp_details_list(self, context, **kwargs):
        return [
            self.get_gbp_details(
                context,
                device=device,
                **kwargs
            )
            for device in kwargs.pop('devices', [])
        ]

    def get_vrf_details(self, context, **kwargs):
        return self.gbp_driver.get_vrf_details(context, **kwargs)

    def get_vrf_details_list(self, context, **kwargs):
        return [
            self.get_vrf_details(
                context,
                vrf_id=vrf_id,
                **kwargs
            )
            for vrf_id in kwargs.pop('vrf_ids', [])
        ]

    def ip_address_owner_update(self, context, **kwargs):
        self.gbp_driver.ip_address_owner_update(context, **kwargs)
