"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
const BATTERY_PERCENTAGE = 'batteryPercentageRemaining';
const CAPABILITY = 'measure_battery';
const CLUSTER_SPEC = zigbee_clusters_1.CLUSTER.POWER_CONFIGURATION;
async function initPowerConfigurationDevice(device, zclNode) {
    device.log(`Initialising ${CAPABILITY} capability`);
    const endpoint = device.getClusterEndpoint(CLUSTER_SPEC) ?? 1;
    const cluster = zclNode
        .endpoints[endpoint]
        .clusters[CLUSTER_SPEC.NAME];
    const reportParser = function (value) {
        device.debug('New battery percentage', value);
        // Max value 200, 255 indicates invalid or unknown reading
        if (value <= 200 && value !== 255) {
            return Math.round(value / 2);
        }
        return null;
    };
    // Read current value
    await cluster
        .readAttributes(BATTERY_PERCENTAGE)
        .then(async (result) => {
        await device
            .setCapabilityValue(CAPABILITY, reportParser(result[BATTERY_PERCENTAGE]))
            .catch(e => device.error(`Failed to set ${CAPABILITY} capability value`, e));
    })
        .catch(e => device.error(`Failed to read ${CLUSTER_SPEC.NAME} ${BATTERY_PERCENTAGE} attribute`, e));
    // Configure the capability
    device.registerCapability(CAPABILITY, CLUSTER_SPEC, {
        getOpts: {
            getOnStart: false,
        },
        get: 'batteryPercentageRemaining',
        report: 'batteryPercentageRemaining',
        reportParser,
        reportOpts: {
            configureAttributeReporting: {
                minChange: 1,
                minInterval: 0,
                maxInterval: 3600,
            },
        },
    });
    device.log(`Initialised ${CAPABILITY} capability`);
}
exports.default = initPowerConfigurationDevice;
//# sourceMappingURL=powerConfigurationDevice.js.map