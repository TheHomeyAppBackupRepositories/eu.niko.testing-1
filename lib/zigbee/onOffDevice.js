"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
async function initOnOffDevice(device, zclNode, capabilityId = 'onoff', endpointId) {
    const endpoint = endpointId ?? device.getClusterEndpoint(zigbee_clusters_1.CLUSTER.ON_OFF) ?? 1;
    // Retrieve the initial value
    await zclNode
        .endpoints[endpoint]
        .clusters[zigbee_clusters_1.CLUSTER.ON_OFF.NAME]
        .readAttributes('onOff')
        .then(async (result) => {
        await device
            .setCapabilityValue(capabilityId, result.onOff)
            .catch(e => device.error('Failed to set on off capability', e));
    })
        .catch(e => device.error('Failed to read on off attributes', e));
    // Configure the capability
    device.registerCapability(capabilityId, zigbee_clusters_1.CLUSTER.ON_OFF, {
        endpoint,
        get: 'onOff',
        getOpts: {
            getOnStart: false,
        },
        set: function (value) {
            return value ? 'setOn' : 'setOff';
        },
        setParser: function () {
            // Return empty object, the command specifies the action for this cluster ('setOn'/setOff').
            return {};
        },
        report: 'onOff',
        reportOpts: {
            configureAttributeReporting: {
                minInterval: 0,
                maxInterval: 3600,
                minChange: 1,
            },
        },
        reportParser: function (value) {
            return value;
        },
    });
    device.log('On off initialized!');
}
exports.default = initOnOffDevice;
//# sourceMappingURL=onOffDevice.js.map