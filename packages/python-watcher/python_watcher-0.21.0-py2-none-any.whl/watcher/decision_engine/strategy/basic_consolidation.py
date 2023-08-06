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
from oslo_log import log

from watcher.common.exception import ClusterEmpty
from watcher.common.exception import ClusteStateNotDefined
from watcher.decision_engine.strategy.base import BaseStrategy
from watcher.decision_engine.strategy.level import StrategyLevel

from watcher.decision_engine.meta_action.hypervisor_state import \
    ChangeHypervisorState
from watcher.decision_engine.meta_action.migrate import Migrate
from watcher.decision_engine.meta_action.migrate import MigrationType
from watcher.decision_engine.meta_action.power_state import ChangePowerState
from watcher.decision_engine.meta_action.power_state import PowerState
from watcher.decision_engine.model.hypervisor_state import HypervisorState
from watcher.decision_engine.model.resource import ResourceType
from watcher.decision_engine.model.vm_state import VMState
from watcher.metrics_engine.cluster_history.ceilometer import \
    CeilometerClusterHistory

LOG = log.getLogger(__name__)


class BasicConsolidation(BaseStrategy):

    DEFAULT_NAME = "basic"
    DEFAULT_DESCRIPTION = "Basic offline consolidation"

    def __init__(self, name=DEFAULT_NAME, description=DEFAULT_DESCRIPTION):
        """Basic offline Consolidation using live migration

    The basic consolidation algorithm has several limitations.
    It has been developed only for tests.
    eg: The BasicConsolidation assumes that the virtual mahine and
    the compute node are on the same private network.

    Good Strategy :
    The workloads of the VMs are changing over the time
    and often tend to migrate from one physical machine to another.
    Hence, the traditional and offline heuristics such as bin packing
    are not applicable for the placement VM in cloud computing.
    So, the decision Engine optimizer provide placement strategy considering
    not only the performance effects but also the workload characteristics of
    VMs and others metrics like the power consumption and
    the tenants constraints (SLAs).

    The watcher optimizer use an online VM placement technique
    based on machine learning and meta-heuristics that must handle :
    - multi-objectives
    - Contradictory objectives
    - Adapt to changes dynamically
    - Fast convergence

        :param name: the name of the strategy
        :param description: a description of the strategy
        """
        super(BasicConsolidation, self).__init__(name, description)

        # set default value for the number of released nodes
        self.number_of_released_nodes = 0
        # set default value for the number of migrations
        self.number_of_migrations = 0
        # set default value for number of allowed migration attempts
        self.migration_attempts = 0

        # set default value for the efficiency
        self.efficiency = 100

        self._ceilometer = None

        # TODO(jed) improve threshold overbooking ?,...
        self.threshold_mem = 1
        self.threshold_disk = 1
        self.threshold_cores = 1

        # TODO(jed) target efficiency
        self.target_efficiency = 60

        # TODO(jed) weight
        self.weight_cpu = 1
        self.weight_mem = 1
        self.weight_disk = 1

        # TODO(jed) bound migration attempts (80 %)
        self.bound_migration = 0.80

    @property
    def ceilometer(self):
        if self._ceilometer is None:
            self._ceilometer = CeilometerClusterHistory()
        return self._ceilometer

    @ceilometer.setter
    def ceilometer(self, c):
        self._ceilometer = c

    def compute_attempts(self, size_cluster):
        """Upper bound of the number of migration

        :param size_cluster:
        """
        self.migration_attempts = size_cluster * self.bound_migration

    def check_migration(self, model,
                        src_hypervisor,
                        dest_hypervisor,
                        vm_to_mig):
        '''check if the migration is possible

        :param model: current state of the cluster
        :param src_hypervisor: the current of the virtual machine
        :param dest_hypervisor:the destination of the virtual machine
        :param vm_to_mig: the virtual machine
        :return: True if the there is enough place otherwise false
        '''
        if src_hypervisor == dest_hypervisor:
            return False

        LOG.debug('Migrate VM {0} from {1} to  {2} '.format(vm_to_mig,
                                                            src_hypervisor,
                                                            dest_hypervisor,
                                                            ))

        total_cores = 0
        total_disk = 0
        total_mem = 0
        cap_cores = model.get_resource_from_id(ResourceType.cpu_cores)
        cap_disk = model.get_resource_from_id(ResourceType.disk)
        cap_mem = model.get_resource_from_id(ResourceType.memory)

        for vm_id in model.get_mapping().get_node_vms(dest_hypervisor):
            vm = model.get_vm_from_id(vm_id)
            total_cores += cap_cores.get_capacity(vm)
            total_disk += cap_disk.get_capacity(vm)
            total_mem += cap_mem.get_capacity(vm)

        # capacity requested by hypervisor
        total_cores += cap_cores.get_capacity(vm_to_mig)
        total_disk += cap_disk.get_capacity(vm_to_mig)
        total_mem += cap_mem.get_capacity(vm_to_mig)

        return self.check_threshold(model,
                                    dest_hypervisor,
                                    total_cores,
                                    total_disk,
                                    total_mem)

    def check_threshold(self, model,
                        dest_hypervisor,
                        total_cores,
                        total_disk,
                        total_mem):
        """Check threshold

        check the threshold value defined by the ratio of
        aggregated CPU capacity of VMS on one node to CPU capacity
        of this node must not exceed the threshold value.
        :param dest_hypervisor:
        :param total_cores
        :param total_disk
        :param total_mem
        :return: True if the threshold is not exceed
        """
        cap_cores = model.get_resource_from_id(ResourceType.cpu_cores)
        cap_disk = model.get_resource_from_id(ResourceType.disk)
        cap_mem = model.get_resource_from_id(ResourceType.memory)
        # available
        cores_available = cap_cores.get_capacity(dest_hypervisor)
        disk_available = cap_disk.get_capacity(dest_hypervisor)
        mem_available = cap_mem.get_capacity(dest_hypervisor)

        if cores_available >= total_cores * self.threshold_cores \
                and disk_available >= total_disk * self.threshold_disk \
                and mem_available >= total_mem * self.threshold_mem:
            return True
        else:
            return False

    def get_allowed_migration_attempts(self):
        """Allowed migration

        Maximum allowed number of migrations this allows us to fix
        the upper bound of the number of migrations
        :return:
        """
        return self.migration_attempts

    def get_threshold_cores(self):
        return self.threshold_cores

    def set_threshold_cores(self, threshold):
        self.threshold_cores = threshold

    def get_number_of_released_nodes(self):
        return self.number_of_released_nodes

    def get_number_of_migrations(self):
        return self.number_of_migrations

    def calculate_weight(self, model, element, total_cores_used,
                         total_disk_used, total_memory_used):
        """Calculate weight of every

        :param model:
        :param element:
        :param total_cores_used:
        :param total_disk_used:
        :param total_memory_used:
        :return:
        """
        cpu_capacity = model.get_resource_from_id(
            ResourceType.cpu_cores).get_capacity(element)

        disk_capacity = model.get_resource_from_id(
            ResourceType.disk).get_capacity(element)

        memory_capacity = model.get_resource_from_id(
            ResourceType.memory).get_capacity(element)

        score_cores = (1 - (float(cpu_capacity) - float(total_cores_used)) /
                       float(cpu_capacity))

        # It's possible that disk_capacity is 0, e.g. m1.nano.disk = 0
        if disk_capacity == 0:
            score_disk = 0
        else:
            score_disk = (1 - (float(disk_capacity) - float(total_disk_used)) /
                          float(disk_capacity))

        score_memory = (
            1 - (float(memory_capacity) - float(total_memory_used)) /
            float(memory_capacity))
        # todo(jed) take in account weight
        return (score_cores + score_disk + score_memory) / 3

    def calculate_score_node(self, hypervisor, model):
        """calculate the score that reprensent the utilization level

            :param hypervisor:
            :param model:
            :return:
            """
        resource_id = "{0}_{1}".format(hypervisor.uuid,
                                       hypervisor.hostname)
        cpu_avg_vm = self.ceilometer. \
            statistic_aggregation(resource_id=resource_id,
                                  meter_name='compute.node.cpu.percent',
                                  period="7200",
                                  aggregate='avg'
                                  )
        if cpu_avg_vm is None:
            LOG.error(
                "No values returned for {0} compute.node.cpu.percent".format(
                    resource_id))
            cpu_avg_vm = 100

        cpu_capacity = model.get_resource_from_id(
            ResourceType.cpu_cores).get_capacity(hypervisor)

        total_cores_used = cpu_capacity * (cpu_avg_vm / 100)

        return self.calculate_weight(model, hypervisor, total_cores_used,
                                     0,
                                     0)

    def calculate_migration_efficiency(self):
        """Calculate migration efficiency

        :return: The efficiency tells us that every VM migration resulted
         in releasing on node
        """
        if self.number_of_migrations > 0:
            return (float(self.number_of_released_nodes) / float(
                self.number_of_migrations)) * 100
        else:
            return 0

    def calculate_score_vm(self, vm, model):
        """Calculate Score of virtual machine

        :param vm_id: the id of virtual machine
        :param model: the model
        :return: score
        """
        if model is None:
            raise ClusteStateNotDefined()

        vm = model.get_vm_from_id(vm.uuid)

        vm_cpu_utilization = self.ceilometer. \
            statistic_aggregation(resource_id=vm.uuid,
                                  meter_name='cpu_util',
                                  period="7200",
                                  aggregate='avg'
                                  )
        if vm_cpu_utilization is None:
            LOG.error(
                "No values returned for {0} cpu_util".format(vm.uuid))
            vm_cpu_utilization = 100

        cpu_capacity = model.get_resource_from_id(
            ResourceType.cpu_cores).get_capacity(vm)

        total_cores_used = cpu_capacity * (vm_cpu_utilization / 100)

        return self.calculate_weight(model, vm, total_cores_used,
                                     0,
                                     0)

        return self.calculate_weight(model, vm, total_cores_used,
                                     0,
                                     0)

    def print_utilization(self, model):
        if model is None:
            raise ClusteStateNotDefined()
        for node_id in model.get_all_hypervisors():
            LOG.debug("{0} utilization {1} % ".
                      format(node_id,
                             self.calculate_score_node(
                                 model.get_hypervisor_from_id(
                                     node_id),
                                 model)))

    def execute(self, orign_model):
        LOG.debug("initialize Sercon Consolidation")

        if orign_model is None:
            raise ClusteStateNotDefined()

        # todo(jed) clone model
        current_model = orign_model

        self.efficiency = 100
        unsuccessful_migration = 0

        first = True
        size_cluster = len(current_model.get_all_hypervisors())
        if size_cluster == 0:
            raise ClusterEmpty()

        self.compute_attempts(size_cluster)

        for hypervisor_id in current_model.get_all_hypervisors():
            hypervisor = current_model.get_hypervisor_from_id(hypervisor_id)
            count = current_model.get_mapping(). \
                get_node_vms_from_id(hypervisor_id)
            if len(count) == 0:
                change_power = ChangePowerState(hypervisor)
                change_power.powerstate = PowerState.g1_S1
                change_power.level = StrategyLevel.conservative
                self.solution.add_change_request(change_power)
                if hypervisor.state == HypervisorState.ONLINE:
                    h = ChangeHypervisorState(hypervisor)
                    h.level = StrategyLevel.aggressive
                    h.state = HypervisorState.OFFLINE
                    self.solution.add_change_request(h)

        while self.get_allowed_migration_attempts() >= unsuccessful_migration:
            if first is not True:
                self.efficiency = self.calculate_migration_efficiency()
                if self.efficiency < float(self.target_efficiency):
                    break
            first = False
            score = []

            ''' calculate score of nodes based on load by VMs '''
            for hypervisor_id in current_model.get_all_hypervisors():
                hypervisor = current_model.get_hypervisor_from_id(
                    hypervisor_id)
                count = current_model.get_mapping(). \
                    get_node_vms_from_id(hypervisor_id)
                if len(count) > 0:
                    result = self.calculate_score_node(hypervisor,
                                                       current_model)
                else:
                    ''' the hypervisor has not VMs '''
                    result = 0
                if len(count) > 0:
                    score.append((hypervisor_id, result))

            ''' sort compute nodes by Score decreasing '''''
            s = sorted(score, reverse=True, key=lambda x: (x[1]))
            LOG.debug("Hypervisor(s) BFD {0}".format(s))

            ''' get Node to be released '''
            if len(score) == 0:
                LOG.warning(
                    "The workloads of the compute nodes"
                    " of the cluster is zero.")
                break

            node_to_release = s[len(score) - 1][0]

            ''' get List of VMs from Node '''
            vms_to_mig = current_model.get_mapping().get_node_vms_from_id(
                node_to_release)

            vm_score = []
            for vm_id in vms_to_mig:
                vm = current_model.get_vm_from_id(vm_id)
                if vm.state == VMState.ACTIVE.value:
                    vm_score.append(
                        (vm_id, self.calculate_score_vm(vm, current_model)))

            ''' sort VM's by Score '''
            v = sorted(vm_score, reverse=True, key=lambda x: (x[1]))
            LOG.debug("VM(s) BFD {0}".format(v))

            m = 0
            tmp_vm_migration_schedule = []
            for vm in v:
                for j in range(0, len(s)):
                    mig_vm = current_model.get_vm_from_id(vm[0])
                    mig_src_hypervisor = current_model.get_hypervisor_from_id(
                        node_to_release)
                    mig_dst_hypervisor = current_model.get_hypervisor_from_id(
                        s[j][0])

                    result = self.check_migration(current_model,
                                                  mig_src_hypervisor,
                                                  mig_dst_hypervisor, mig_vm)
                    if result is True:

                        ''' create migration VM '''
                        if current_model.get_mapping(). \
                                migrate_vm(mig_vm, mig_src_hypervisor,
                                           mig_dst_hypervisor):
                            live_migrate = Migrate(mig_vm,
                                                   mig_src_hypervisor,
                                                   mig_dst_hypervisor)
                            # live migration
                            live_migrate.set_migration_type(
                                MigrationType.pre_copy)
                            live_migrate.level = StrategyLevel.conservative

                            tmp_vm_migration_schedule.append(live_migrate)

                        if len(current_model.get_mapping().get_node_vms(
                                mig_src_hypervisor)) == 0:
                            # TODO(jed) how to manage strategy level
                            # from conservative to aggressive
                            change_power = ChangePowerState(mig_src_hypervisor)
                            change_power.powerstate = PowerState.g1_S1
                            change_power.level = StrategyLevel.conservative
                            tmp_vm_migration_schedule.append(change_power)

                            h = ChangeHypervisorState(mig_src_hypervisor)
                            h.level = StrategyLevel.aggressive

                            h.state = HypervisorState.OFFLINE
                            tmp_vm_migration_schedule.append(h)

                            self.number_of_released_nodes += 1

                        m += 1
                        break
            if m > 0:
                self.number_of_migrations = self.number_of_migrations + m
                unsuccessful_migration = 0
                for a in tmp_vm_migration_schedule:
                    self.solution.add_change_request(a)
            else:
                unsuccessful_migration += 1
        # self.print_utilization(current_model)
        infos = {
            "number_of_migrations": self.number_of_migrations,
            "number_of_nodes_released": self.number_of_released_nodes,
            "efficiency": self.efficiency
        }
        LOG.debug(infos)
        self.solution.model = current_model
        self.solution.efficiency = self.efficiency
        return self.solution
