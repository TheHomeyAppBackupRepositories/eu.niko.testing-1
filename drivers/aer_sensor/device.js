"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const measureHumidity_1 = __importDefault(require("@drenso/homey-zigbee-library/capabilities/measureHumidity"));
const measureTemperature_1 = __importDefault(require("@drenso/homey-zigbee-library/capabilities/measureTemperature"));
const attributeDevice_1 = require("@drenso/homey-zigbee-library/lib/attributeDevice");
const homey_1 = __importDefault(require("homey"));
const homey_zigbeedriver_1 = require("homey-zigbeedriver");
const zigbee_clusters_1 = require("zigbee-clusters");
const CarbonDioxideMeasurementCluster_1 = __importDefault(require("../../lib/zigbee/cluster/CarbonDioxideMeasurementCluster"));
const NikoSpecificTemperatureMeasurementCluster_1 = __importDefault(require("../../lib/zigbee/cluster/NikoSpecificTemperatureMeasurementCluster"));
const NikoTotalVocMeasurementCluster_1 = __importDefault(require("../../lib/zigbee/cluster/NikoTotalVocMeasurementCluster"));
const deviceInfo_1 = __importDefault(require("../../lib/zigbee/deviceInfo"));
zigbee_clusters_1.Cluster.addCluster(CarbonDioxideMeasurementCluster_1.default);
zigbee_clusters_1.Cluster.addCluster(NikoTotalVocMeasurementCluster_1.default);
zigbee_clusters_1.Cluster.addCluster(NikoSpecificTemperatureMeasurementCluster_1.default);
class NikoAerSensor extends homey_zigbeedriver_1.ZigBeeDevice {
    async onNodeInit({ zclNode, node }) {
        if (homey_1.default.env.DEBUG === '1') {
            this.enableDebug();
        }
        await super.onNodeInit({ zclNode, node });
        await (0, deviceInfo_1.default)(this, zclNode)
            .catch(e => this.error('Device information retrieval failed', e));
        await (0, measureTemperature_1.default)(this, zclNode);
        await (0, attributeDevice_1.initReadOnlyCapability)(this, zclNode, 'measure_pressure', zigbee_clusters_1.CLUSTER.PRESSURE_MEASUREMENT, 'measuredValue', (value) => {
            if (value == 0x8000) {
                return null;
            }
            return value;
        });
        await (0, measureHumidity_1.default)(this, zclNode);
        await (0, attributeDevice_1.initReadOnlyCapability)(this, zclNode, 'measure_co2', CarbonDioxideMeasurementCluster_1.default, 'measuredValue');
        await (0, attributeDevice_1.initReadOnlyCapability)(this, zclNode, 'measure_tvoc', NikoTotalVocMeasurementCluster_1.default, 'measuredValue');
    }
    async onSettings(info) {
        if (!info.changedKeys.includes('temperature_offset')) {
            return;
        }
        await this.zclNode
            .endpoints[this.getClusterEndpoint(NikoSpecificTemperatureMeasurementCluster_1.default) ?? 1]
            .clusters[NikoSpecificTemperatureMeasurementCluster_1.default.NAME]
            .writeAttributes({
            measurementOffset: Math.round(info.newSettings.temperature_offset * 100),
        });
    }
}
module.exports = NikoAerSensor;
//# sourceMappingURL=device.js.map