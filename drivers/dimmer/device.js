"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const deviceInfo_1 = __importDefault(require("../../lib/zigbee/deviceInfo"));
class NikoDimmer extends homey_zigbeedriver_1.ZigBeeLightDevice {
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
        }
        await super.onNodeInit({ zclNode, node });
        await (0, deviceInfo_1.default)(this, zclNode)
            .catch(e => this.error('Device information retrieval failed', e));
        const onOffHandler = (onOff, checkDim) => {
            this.setCapabilityValue('onoff', onOff)
                .catch(e => this.error('Failed to set onoff capability value', e));
            if (checkDim === false) {
                return;
            }
            const currentDimValue = this.getCapabilityValue('dim');
            if (onOff && currentDimValue === 0) {
                // Retrieve current dim level
                this.levelControlCluster
                    .readAttributes('currentLevel')
                    .then(result => currentLevelHandler(result.currentLevel, true))
                    .catch(e => this.error('Failed to read currentLevel attribute', e));
            }
            else if (!onOff && currentDimValue !== 0) {
                this.setCapabilityValue('dim', 0).catch(this.error); // Set dim to zero when turned off
            }
        };
        const currentLevelHandler = (dimLevel, checkOnOff) => {
            this.setCapabilityValue('dim', dimLevel / 254)
                .catch(e => this.error('Failed to set dim capability value', e));
            if (checkOnOff === false) {
                return;
            }
            const currentOnOffValue = this.getCapabilityValue('onoff');
            if (currentOnOffValue && dimLevel === 0) {
                this.setCapabilityValue('onoff', false).catch(this.error);
            }
            else if (!currentOnOffValue && dimLevel > 0) {
                this.setCapabilityValue('onoff', true).catch(this.error);
            }
        };
        // Read initial values
        this.onOffCluster
            .readAttributes('onOff')
            .then(result => onOffHandler(result.onOff, true))
            .catch(e => this.error('Failed to read onOff attribute', e));
        // And setup reporting
        this.onOffCluster
            .on('attr.onOff', onOffHandler);
        this.levelControlCluster
            .on('attr.currentLevel', currentLevelHandler);
    }
}
module.exports = NikoDimmer;
//# sourceMappingURL=device.js.map