"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
async function retrieveDeviceInfo(device, zclNode) {
    // Retrieve the values
    await zclNode
        .endpoints[device.getClusterEndpoint(zigbee_clusters_1.CLUSTER.BASIC) ?? 1]
        .clusters[zigbee_clusters_1.CLUSTER.BASIC.NAME]
        .readAttributes('hwVersion', 'dateCode', 'swBuildId')
        .then(async (result) => {
        // Convert incoming values to string
        const values = {};
        Object.keys(result).forEach((key) => values[key] = String(result[key]));
        device.log('Retrieved device information', result, values);
        await device.setSettings(values)
            .catch(e => device.error('Failed to set device info settings', e));
    })
        .catch(e => device.error('Failed to read device info attributes', e));
}
exports.default = retrieveDeviceInfo;
//# sourceMappingURL=deviceInfo.js.map