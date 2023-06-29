"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
const deviceFactor_1 = __importDefault(require("./helper/deviceFactor"));
async function initMeteringDevice(device, zclNode) {
    if (device.hasCapability('meter_power')) {
        device.log('Initialising meter_power capability');
        await (0, deviceFactor_1.default)(device, zclNode, 'meteringFactor', 'meter_power', zigbee_clusters_1.CLUSTER.METERING)
            .then(() => device.log('Initialised meter_power capability'))
            .catch(e => device.error('Failed to initialise meter_power capability', e));
    }
    device.log('Metering device initialised!');
}
exports.default = initMeteringDevice;
//# sourceMappingURL=meteringDevice.js.map