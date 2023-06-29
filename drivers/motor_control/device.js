"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const NikoWindowCoveringsDevice_1 = require("../../lib/zigbee/custom/NikoWindowCoveringsDevice");
const deviceInfo_1 = __importDefault(require("../../lib/zigbee/deviceInfo"));
const windowCoveringsDevice_1 = __importDefault(require("../../lib/zigbee/windowCoveringsDevice"));
class NikoMotorControl extends homey_zigbeedriver_1.ZigBeeDevice {
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
        }
        await super.onNodeInit({ zclNode, node });
        await (0, deviceInfo_1.default)(this, zclNode)
            .catch(e => this.error('Device information retrieval failed', e));
        await (0, windowCoveringsDevice_1.default)(this, zclNode)
            .catch(e => this.error('Window coverings init failed', e));
        await (0, NikoWindowCoveringsDevice_1.initWindowCoveringsRuntimeSettings)(this, zclNode)
            .then(handler => this.runtimeSettingsHandler = handler)
            .catch(e => this.error('Window coverings runtime settings init failed', e));
    }
    async onSettings(info) {
        if (this.runtimeSettingsHandler) {
            await this.runtimeSettingsHandler(info);
        }
    }
}
module.exports = NikoMotorControl;
//# sourceMappingURL=device.js.map