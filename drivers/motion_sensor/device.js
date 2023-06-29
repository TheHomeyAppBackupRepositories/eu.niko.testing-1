"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const zigbee_clusters_1 = require("zigbee-clusters");
const deviceInfo_1 = __importDefault(require("../../lib/zigbee/deviceInfo"));
const iasZoneDevice_1 = __importDefault(require("../../lib/zigbee/iasZoneDevice"));
const powerConfigurationDevice_1 = __importDefault(require("../../lib/zigbee/powerConfigurationDevice"));
const NikoIASZoneCluster_1 = __importDefault(require("../../lib/zigbee/custom/NikoIASZoneCluster"));
zigbee_clusters_1.Cluster.addCluster(NikoIASZoneCluster_1.default);
class NikoMotionSensor extends homey_zigbeedriver_1.ZigBeeDevice {
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
        }
        await super.onNodeInit({ zclNode, node });
        await (0, iasZoneDevice_1.default)(this, zclNode)
            .catch(e => this.error('IAS zone init failed', e));
        await (0, deviceInfo_1.default)(this, zclNode)
            .catch(e => this.error('Device information retrieval failed', e));
        await (0, powerConfigurationDevice_1.default)(this, zclNode)
            .catch(e => this.error('Power configuration init failed', e));
    }
    async onSettings(info) {
        if (!info.changedKeys.includes('sensitivity')) {
            return;
        }
        let sensitivity = 0;
        switch (info.newSettings.sensitivity) {
            case 'medium':
                sensitivity = 1;
                break;
            case 'low':
                sensitivity = 2;
                break;
        }
        await this.zclNode
            .endpoints[this.getClusterEndpoint(zigbee_clusters_1.IASZoneCluster) ?? 1]
            .clusters[zigbee_clusters_1.IASZoneCluster.NAME]
            .writeAttributes({
            currentZoneSensitivityLevel: sensitivity,
        });
    }
}
module.exports = NikoMotionSensor;
//# sourceMappingURL=device.js.map