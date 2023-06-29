"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
const NikoButtonLevelControlBoundCluster_1 = __importDefault(require("./cluster/NikoButtonLevelControlBoundCluster"));
const NikoButtonOnOffBoundCluster_1 = __importDefault(require("./cluster/NikoButtonOnOffBoundCluster"));
const flow_1 = require("./helper/flow");
async function initButtonDevice(device, zclNode, endpointId) {
    const endpoint = zclNode.endpoints[endpointId];
    // Bind cluster definition
    endpoint.bind(zigbee_clusters_1.CLUSTER.ON_OFF.NAME, new NikoButtonOnOffBoundCluster_1.default(() => (0, flow_1.triggerFlowWithLog)(device, 'button_on'), () => (0, flow_1.triggerFlowWithLog)(device, 'button_off'), () => (0, flow_1.triggerFlowWithLog)(device, 'button_toggle')));
    endpoint.bind(zigbee_clusters_1.CLUSTER.LEVEL_CONTROL.NAME, new NikoButtonLevelControlBoundCluster_1.default((direction) => (0, flow_1.triggerFlowWithLog)(device, 'button_move', { direction }, { direction }), () => (0, flow_1.triggerFlowWithLog)(device, 'button_move_stopped')));
    device.log('Button initialized!', endpointId);
}
exports.default = initButtonDevice;
//# sourceMappingURL=buttonDevice.js.map