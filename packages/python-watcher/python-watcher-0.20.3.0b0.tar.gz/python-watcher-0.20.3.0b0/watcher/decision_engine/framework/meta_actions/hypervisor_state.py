# -*- encoding: utf-8 -*-
# Copyright (c) 2015 b<>com
#
# Authors: Jean-Emile DARTOIS <jean-emile.dartois@b-com.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
# implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from watcher.decision_engine.api.strategy.meta_action import MetaAction
from watcher.decision_engine.framework.model.hypervisor_state import \
    HypervisorState


class ChangeHypervisorState(MetaAction):
    def __init__(self, target):
        MetaAction.__init__(self)
        '''The target host to change the power

        :param target:
        :return:
        '''
        self.target = target
        self.state = HypervisorState.ONLINE

    def set_state(self, state):
        self.state = state

    def get_state(self):
        return self.state

    def __str__(self):
        return MetaAction.__str__(self) + " ChangeHypervisorState" + str(
            self.target) + " =>" + str(self.state)
