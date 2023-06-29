"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class CarbonDioxideMeasurementCluster extends zigbee_clusters_1.Cluster {
    static get ID() {
        return 0x040D;
    }
    static get NAME() {
        return 'carbonDioxideMeasurement';
    }
    static get ATTRIBUTES() {
        return {
            measuredValue: { id: 0, type: zigbee_clusters_1.ZCLDataTypes.single },
            minMeasuredValue: { id: 1, type: zigbee_clusters_1.ZCLDataTypes.single },
            maxMeasuredValue: { id: 2, type: zigbee_clusters_1.ZCLDataTypes.single },
            tolerance: { id: 3, type: zigbee_clusters_1.ZCLDataTypes.single },
        };
    }
    static get COMMANDS() {
        return {};
    }
}
exports.default = CarbonDioxideMeasurementCluster;
//# sourceMappingURL=CarbonDioxideMeasurementCluster.js.map