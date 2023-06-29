"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class NikoIASZoneCluster extends zigbee_clusters_1.IASZoneCluster {
    static get ATTRIBUTES() {
        return {
            ...super.ATTRIBUTES,
            currentZoneSensitivityLevel: {
                id: 0x13,
                type: zigbee_clusters_1.ZCLDataTypes.uint8
            }
        };
    }
}
exports.default = NikoIASZoneCluster;
//# sourceMappingURL=NikoIASZoneCluster.js.map