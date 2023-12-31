"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapValueRange(originalRangeStart, originalRangeEnd, newRangeStart, newRangeEnd, value) {
    if (typeof originalRangeStart !== 'number')
        throw new TypeError('expected_original_range_start_number');
    if (typeof originalRangeEnd !== 'number')
        throw new TypeError('expected_original_range_end_number');
    if (typeof newRangeStart !== 'number')
        throw new TypeError('expected_new_range_start_number');
    if (typeof newRangeEnd !== 'number')
        throw new TypeError('expected_new_range_end_number');
    if (typeof value !== 'number')
        throw new TypeError('expected_value_number');
    return newRangeStart + ((newRangeEnd - newRangeStart) / (originalRangeEnd - originalRangeStart))
        * (Math.min(Math.max(originalRangeStart, value), originalRangeEnd) - originalRangeStart);
}
exports.default = mapValueRange;
//# sourceMappingURL=valueRange.js.map