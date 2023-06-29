"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWindowCoveringsRuntimeSettings = void 0;
const zigbee_clusters_1 = require("zigbee-clusters");
const NikoSpecificWindowCoveringCluster_1 = __importDefault(require("../cluster/NikoSpecificWindowCoveringCluster"));
const CLUSTER_SPEC = zigbee_clusters_1.CLUSTER.WINDOW_COVERING;
zigbee_clusters_1.Cluster.addCluster(NikoSpecificWindowCoveringCluster_1.default);
async function initWindowCoveringsRuntimeSettings(device, zclNode) {
    device.log(`Initialising runtime settings`);
    const endpoint = device.getClusterEndpoint(CLUSTER_SPEC) ?? 1;
    const cluster = zclNode
        .endpoints[endpoint]
        .clusters[CLUSTER_SPEC.NAME];
    // Read current setting values
    await cluster
        .readAttributes('runtimeToOpen', 'runtimeToClose')
        .then(async (result) => {
        device.debug('Retrieved setting values', result);
        await device
            .setSettings(result)
            .catch(e => device.error(`Failed to set settings`, e));
    })
        .catch(e => device.error(`Failed to read runtime settings`, e));
    return async function (info) {
        if (!info.changedKeys.includes('runtimeToOpen') && !info.changedKeys.includes('runtimeToClose')) {
            return;
        }
        await cluster
            .writeAttributes({
            runtimeToOpen: info.newSettings.runtimeToOpen,
            runtimeToClose: info.newSettings.runtimeToClose,
        });
    };
}
exports.initWindowCoveringsRuntimeSettings = initWindowCoveringsRuntimeSettings;
//# sourceMappingURL=NikoWindowCoveringsDevice.js.map