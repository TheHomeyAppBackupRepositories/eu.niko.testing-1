"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zigbee_clusters_1 = require("zigbee-clusters");
class NikoButtonLevelControlBoundCluster extends zigbee_clusters_1.BoundCluster {
    constructor(_onMove, _onStop) {
        super();
        this._onMove = _onMove;
        this._onStop = _onStop;
    }
    move() {
        if (this._onMove) {
            this._onMove('down');
        }
    }
    stop() {
        if (this._onStop) {
            this._onStop();
        }
    }
    moveWithOnOff() {
        if (this._onMove) {
            this._onMove('up');
        }
    }
}
exports.default = NikoButtonLevelControlBoundCluster;
//# sourceMappingURL=NikoButtonLevelControlBoundCluster.js.map