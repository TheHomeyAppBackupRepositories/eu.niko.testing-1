"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
const deviceFactor_1 = __importDefault(require("./helper/deviceFactor"));
async function initElectricalMeasurementDevice(device, zclNode) {
    if (device.hasCapability('measure_voltage')) {
        device.log('Initialising measure_voltage capability');
        await (0, deviceFactor_1.default)(device, zclNode, 'acVoltageFactor', 'measure_voltage', zigbee_clusters_1.CLUSTER.ELECTRICAL_MEASUREMENT)
            .then(() => device.log('Initialised measure_voltage capability'))
            .catch(e => device.error('Failed to initialise measure_voltage capability', e));
    }
    if (device.hasCapability('measure_current')) {
        device.log('Initialising measure_current capability');
        await (0, deviceFactor_1.default)(device, zclNode, 'acCurrentFactor', 'measure_current', zigbee_clusters_1.CLUSTER.ELECTRICAL_MEASUREMENT)
            .then(() => device.log('Initialised measure_current capability'))
            .catch(e => device.error('Failed to initialise measure_current capability', e));
    }
    if (device.hasCapability('measure_power')) {
        device.log('Initialising measure_power capability');
        await (0, deviceFactor_1.default)(device, zclNode, 'activePowerFactor', 'measure_power', zigbee_clusters_1.CLUSTER.ELECTRICAL_MEASUREMENT)
            .then(() => device.log('Initialised measure_power capability'))
            .catch(e => device.error('Failed to initialise measure_power capability', e));
    }
    device.log('Electrical measurement device initialized!');
}
exports.default = initElectricalMeasurementDevice;
//# sourceMappingURL=electricalMeasurementDevice.js.map