"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
const CAPABILITY = 'alarm_motion';
const TAMPER_CAPABILITY = 'alarm_tamper';
async function initIasZoneDevice(device, zclNode) {
    device.log(`Initialising ${CAPABILITY} capability`);
    const endpoint = device.getClusterEndpoint(zigbee_clusters_1.IASZoneCluster) ?? 1;
    const cluster = zclNode.endpoints[endpoint]
        .clusters[zigbee_clusters_1.IASZoneCluster.NAME];
    // Register enroll request listener for automatic enrollment
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Dynamic event handler
    cluster.onZoneEnrollRequest = (payload) => {
        device.debug('Zone enroll request received', payload);
        cluster
            .zoneEnrollResponse({
            enrollResponseCode: 'success',
            zoneId: Math.floor(Math.random() * 255),
        }, { waitForResponse: false })
            .catch(e => device.error('Failed to write response', e));
    };
    // Register zone state change notification
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Dynamic event handler
    cluster.onZoneStatusChangeNotification = (payload) => {
        const flags = payload.zoneStatus.getBits();
        device.debug('Zone status change notification received', payload);
        device.setCapabilityValue(CAPABILITY, flags.includes('alarm1'))
            .catch(e => device.error(`Failed to set ${CAPABILITY} capability`, e));
        if (device.hasCapability(TAMPER_CAPABILITY)) {
            device.setCapabilityValue(TAMPER_CAPABILITY, flags.includes('tamper'))
                .catch(e => device.error(`Failed to set ${TAMPER_CAPABILITY} capability`, e));
        }
    };
    device.log(`Initialised ${CAPABILITY} capability, waiting for zone enroll request`);
}
exports.default = initIasZoneDevice;
//# sourceMappingURL=iasZoneDevice.js.map