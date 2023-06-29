"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerFlowWithLog = void 0;
function triggerFlowWithLog(device, flowId, tokens, state) {
    device.log('Triggering flow', flowId);
    return device
        .triggerFlow({
        id: flowId,
        tokens,
        state,
    })
        .catch(device.error);
}
exports.triggerFlowWithLog = triggerFlowWithLog;
//# sourceMappingURL=flow.js.map