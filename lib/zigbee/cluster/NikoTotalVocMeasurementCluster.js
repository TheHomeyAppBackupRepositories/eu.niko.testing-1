"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class NikoTotalVocMeasurementCluster extends zigbee_clusters_1.Cluster {
    static get ID() {
        return 0xFC02;
    }
    static get NAME() {
        return 'totalVocMeasurement';
    }
    static get ATTRIBUTES() {
        return {
            measuredValue: {
                id: 0,
                type: zigbee_clusters_1.ZCLDataTypes.uint16,
                manufacturerId: 0x125F,
            }
        };
    }
    static get COMMANDS() {
        return {};
    }
}
exports.default = NikoTotalVocMeasurementCluster;
//# sourceMappingURL=NikoTotalVocMeasurementCluster.js.map