"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class NikoButtonOnOffBoundCluster extends zigbee_clusters_1.BoundCluster {
    constructor(onSetOn, onSetOff, onToggle) {
        super();
        this._onSetOn = onSetOn;
        this._onSetOff = onSetOff;
        this._onToggle = onToggle;
    }
    setOn() {
        if (this._onSetOn) {
            this._onSetOn();
        }
        if (this._onToggle) {
            this._onToggle();
        }
    }
    setOff() {
        if (this._onSetOff) {
            this._onSetOff();
        }
        if (this._onToggle) {
            this._onToggle();
        }
    }
}
exports.default = NikoButtonOnOffBoundCluster;
//# sourceMappingURL=NikoButtonOnOffBoundCluster.js.map