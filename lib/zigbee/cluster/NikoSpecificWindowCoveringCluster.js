"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class NikoSpecificWindowCoveringCluster extends zigbee_clusters_1.WindowCoveringCluster {
    static get ATTRIBUTES() {
        return {
            ...super.ATTRIBUTES,
            runtimeToOpen: {
                id: 0xFCC1,
                type: zigbee_clusters_1.ZCLDataTypes.uint16,
                manufacturerId: 0x125F,
            },
            runtimeToClose: {
                id: 0xFCC2,
                type: zigbee_clusters_1.ZCLDataTypes.uint16,
                manufacturerId: 0x125F,
            },
        };
    }
}
exports.default = NikoSpecificWindowCoveringCluster;
//# sourceMappingURL=NikoSpecificWindowCoveringCluster.js.map