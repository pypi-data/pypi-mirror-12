# All Rights Reserved.
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

import sqlalchemy as sa
from sqlalchemy import orm

from neutron import context as nctx
from neutron.db import api as db_api
from neutron.db import model_base
from neutron.db import models_v2
from neutron import manager
from neutron.openstack.common import log
from oslo.db import exception as db_exc

LOG = log.getLogger(__name__)


class HAIPAddressToPortAssocation(model_base.BASEV2):

    """Port Owner for HA IP Address.

    This table is used to store the mapping between the HA IP Address
    and the Port ID of the Neutron Port which currently owns this
    IP Address.
    """

    __tablename__ = 'apic_ml2_ha_ipaddress_to_port_owner'

    ha_ip_address = sa.Column(sa.String(64), nullable=False,
                              primary_key=True)
    port_id = sa.Column(sa.String(64), sa.ForeignKey('ports.id',
                                                     ondelete='CASCADE'),
                        nullable=False, primary_key=True)


class PortForHAIPAddress(object):

    def __init__(self):
        self.session = db_api.get_session()

    def get_port_for_ha_ipaddress(self, ipaddress, network_id):
        """Returns the Neutron Port ID for the HA IP Addresss."""
        port_ha_ip = self.session.query(HAIPAddressToPortAssocation).filter_by(
            ha_ip_address=ipaddress).join(models_v2.Port).filter_by(
                network_id=network_id).first()
        return port_ha_ip

    def get_ha_ipaddresses_for_port(self, port_id):
        """Returns the HA IP Addressses associated with a Port."""
        objs = self.session.query(HAIPAddressToPortAssocation).filter_by(
            port_id=port_id).all()
        return sorted([x['ha_ip_address'] for x in objs])

    def set_port_id_for_ha_ipaddress(self, port_id, ipaddress):
        """Stores a Neutron Port Id as owner of HA IP Addr (idempotent API)."""
        with self.session.begin(subtransactions=True):
            obj = self.session.query(HAIPAddressToPortAssocation).filter_by(
                port_id=port_id, ha_ip_address=ipaddress).first()
            if obj:
                return obj
            else:
                obj = HAIPAddressToPortAssocation(port_id=port_id,
                                                  ha_ip_address=ipaddress)
                self.session.add(obj)
                return obj

    def delete_port_id_for_ha_ipaddress(self, port_id, ipaddress):
        with self.session.begin(subtransactions=True):
            try:
                return self.session.query(
                    HAIPAddressToPortAssocation).filter_by(
                        port_id=port_id,
                        ha_ip_address=ipaddress).delete()
            except orm.exc.NoResultFound:
                return


class HAIPOwnerDbMixin(object):

    def __init__(self):
        self.ha_ip_handler = PortForHAIPAddress()

    def _get_plugin(self):
        return manager.NeutronManager.get_plugin()

    def update_ip_owner(self, ip_owner_info):
        ports_to_update = set()
        port_id = ip_owner_info.get('port')
        ipv4 = ip_owner_info.get('ip_address_v4')
        ipv6 = ip_owner_info.get('ip_address_v6')
        if not port_id or (not ipv4 and not ipv6):
            return ports_to_update
        LOG.debug("Got IP owner update: %s", ip_owner_info)
        core_plugin = self._get_plugin()
        port = core_plugin.get_port(nctx.get_admin_context(), port_id)
        if not port:
            LOG.debug("Ignoring update for non-existent port: %s", port_id)
            return ports_to_update
        ports_to_update.add(port_id)
        for ipa in [ipv4, ipv6]:
            if not ipa:
                continue
            try:
                old_owner = self.ha_ip_handler.get_port_for_ha_ipaddress(
                    ipa, port['network_id'])
                self.ha_ip_handler.set_port_id_for_ha_ipaddress(port_id, ipa)
                if old_owner and old_owner['port_id'] != port_id:
                    self.ha_ip_handler.delete_port_id_for_ha_ipaddress(
                        old_owner['port_id'], ipa)
                    ports_to_update.add(old_owner['port_id'])
            except db_exc.DBReferenceError as dbe:
                LOG.debug("Ignoring FK error for port %s: %s", port_id, dbe)
        return ports_to_update
