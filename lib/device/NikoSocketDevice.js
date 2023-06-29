"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const deviceInfo_1 = __importDefault(require("../zigbee/deviceInfo"));
const electricalMeasurementDevice_1 = __importDefault(require("../zigbee/electricalMeasurementDevice"));
const meteringDevice_1 = __importDefault(require("../zigbee/meteringDevice"));
const onOffDevice_1 = __importDefault(require("../zigbee/onOffDevice"));
class NikoSocketDevice extends homey_zigbeedriver_1.ZigBeeDevice {
    constructor() {
        super(...arguments);
        this.acVoltageFactor = 1;
        this.acCurrentFactor = 1;
        this.activePowerFactor = 1;
        this.meteringFactor = 1;
    }
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
        }
        await super.onNodeInit({ zclNode, node });
        await (0, deviceInfo_1.default)(this, zclNode)
            .catch(e => this.error('Device information retrieval failed', e));
        await (0, onOffDevice_1.default)(this, zclNode)
            .catch(e => this.error('On off init failed', e));
        await (0, electricalMeasurementDevice_1.default)(this, zclNode)
            .catch(e => this.error('Electrical measurement init failed', e));
        await (0, meteringDevice_1.default)(this, zclNode)
            .catch(e => this.error('Metering init failed', e));
    }
}
exports.default = NikoSocketDevice;
//# sourceMappingURL=NikoSocketDevice.js.map