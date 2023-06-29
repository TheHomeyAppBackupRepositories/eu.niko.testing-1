"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class NikoSpecificTemperatureMeasurementCluster extends zigbee_clusters_1.TemperatureMeasurementCluster {
    static get ATTRIBUTES() {
        return {
            ...super.ATTRIBUTES,
            measurementOffset: {
                id: 0x0004,
                type: zigbee_clusters_1.ZCLDataTypes.int16,
                manufacturerId: 0x125F,
            }
        };
    }
}
exports.default = NikoSpecificTemperatureMeasurementCluster;
//# sourceMappingURL=NikoSpecificTemperatureMeasurementCluster.js.map