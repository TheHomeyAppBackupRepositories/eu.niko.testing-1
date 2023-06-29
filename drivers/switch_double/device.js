"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const deviceInfo_1 = __importDefault(require("../../lib/zigbee/deviceInfo"));
const onOffDevice_1 = __importDefault(require("../../lib/zigbee/onOffDevice"));
class NikoSwitchDouble extends homey_zigbeedriver_1.ZigBeeDevice {
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
        }
        await super.onNodeInit({ zclNode, node });
        if (this.getData().subDeviceId !== 'secondSwitch') {
            await (0, deviceInfo_1.default)(this, zclNode)
                .catch(e => this.error('Device information retrieval failed', e));
            await (0, onOffDevice_1.default)(this, zclNode, 'onoff', 1)
                .catch(e => this.error('Main switch on off init failed', e));
        }
        else {
            await (0, onOffDevice_1.default)(this, zclNode, 'onoff', 2)
                .catch(e => this.error('Second switch on off init failed', e));
        }
    }
}
module.exports = NikoSwitchDouble;
//# sourceMappingURL=device.js.map