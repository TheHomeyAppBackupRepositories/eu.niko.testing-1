"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_log_1 = require("homey-log");
const source_map_support_1 = __importDefault(require("source-map-support"));
const zigbee_clusters_1 = require("zigbee-clusters");
source_map_support_1.default.install();
class NikoApp extends homey_1.default.App {
    onInit() {
        if (homey_1.default.env.DEBUG === '1') {
            (0, zigbee_clusters_1.debug)(true);
        }
        this.homeyLog = new homey_log_1.Log({ homey: this.homey });
        this.homey.flow
            .getActionCard('stop_windowcoverings')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .registerRunListener(async (args) => {
            this.log('Flow triggered to stop the window coverings');
            await args.device.triggerCapabilityListener('windowcoverings_stop');
        });
        // Configure button_move device trigger card run listener
        this.homey.flow.getDeviceTriggerCard('button_move')
            .registerRunListener((args, state) => {
            switch (args.direction) {
                case 'up':
                case 'down':
                    return args.direction === state.direction;
                default:
                    return true;
            }
        });
        this.log('Niko has been initialized');
        return Promise.resolve();
    }
}
module.exports = NikoApp;
//# sourceMappingURL=app.js.map