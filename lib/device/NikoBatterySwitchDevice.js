"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const buttonDevice_1 = __importDefault(require("../zigbee/buttonDevice"));
const deviceInfo_1 = __importDefault(require("../zigbee/deviceInfo"));
const powerConfigurationDevice_1 = __importDefault(require("../zigbee/powerConfigurationDevice"));
class NikoBatterySwitchDevice extends homey_zigbeedriver_1.ZigBeeDevice {
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
        }
        await super.onNodeInit({ zclNode, node });
        await (0, deviceInfo_1.default)(this, zclNode)
            .catch(e => this.error('Device information retrieval failed', e));
        await (0, powerConfigurationDevice_1.default)(this, zclNode)
            .catch(e => this.error('Power configuration init failed', e));
        await (0, buttonDevice_1.default)(this, zclNode, 1)
            .catch(e => this.error('Main switch on off init failed', e));
    }
}
exports.default = NikoBatterySwitchDevice;
//# sourceMappingURL=NikoBatterySwitchDevice.js.map