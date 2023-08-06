# Copyright 2015 Brocade Communications System, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

import logging

from django.utils.translation import ugettext_lazy as _

from horizon import exceptions
from horizon import forms
from horizon import messages

from tacker_horizon.openstack_dashboard import api

LOG = logging.getLogger(__name__)

class AddService(forms.SelfHandlingForm):
    vnf_name = forms.CharField(max_length=80, label=_("VNF Name"))
    vnfd_id = forms.ChoiceField(label=_("VNF Catalog Name"))

    def __init__(self, request, *args, **kwargs):
        super(AddService, self).__init__(request, *args, **kwargs)

        try:
            vnfd_list = api.tacker.vnfd_list(request)
            available_choices = [(vnf['id'],vnf['name'])
                                 for vnf in vnfd_list]
        except Exception as e:
            msg = _('Failed to retrieve available VNF Catalog names: %s') % e
            LOG.error(msg)

        self.fields['vnfd_id'].choices = [('', _('Select a VNF Catalog Name'))
                                          ]+available_choices

    def handle(self, request, data):
        try:
            vnf_name = data['vnf_name']
            vnfd_id = data['vnfd_id']
            vnf_arg = {'vnf': {'vnfd_id': vnfd_id, 'name':  vnf_name}}
            api.tacker.create_vnf(request, vnf_arg)
            messages.success(request,
                             _('VNF %s has been created.') % vnf_name)
            return True
        except Exception:
            exceptions.handle(request,
                              _('Unable to create VNF.'))
