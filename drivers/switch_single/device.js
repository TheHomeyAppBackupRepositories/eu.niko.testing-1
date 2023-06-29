"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const deviceInfo_1 = __importDefault(require("../../lib/zigbee/deviceInfo"));
const onOffDevice_1 = __importDefault(require("../../lib/zigbee/onOffDevice"));
class NikoSwitchSingle extends homey_zigbeedriver_1.ZigBeeDevice {
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
        }
        await super.onNodeInit({ zclNode, node });
        await (0, deviceInfo_1.default)(this, zclNode)
            .catch(e => this.error('Device information retrieval failed', e));
        await (0, onOffDevice_1.default)(this, zclNode)
            .catch(e => this.error('On off init failed', e));
    }
}
module.exports = NikoSwitchSingle;
//# sourceMappingURL=device.js.map