"use strict";
;
;
;
;
;
(function (TaskStatus) {
    TaskStatus[TaskStatus["NEW"] = 0] = "NEW";
    TaskStatus[TaskStatus["ASSIGNED"] = 1] = "ASSIGNED";
    TaskStatus[TaskStatus["IN_PROGRESS"] = 2] = "IN_PROGRESS";
    TaskStatus[TaskStatus["COMPLETE"] = 3] = "COMPLETE";
    TaskStatus[TaskStatus["CLOSED"] = 4] = "CLOSED";
})(exports.TaskStatus || (exports.TaskStatus = {}));
var TaskStatus = exports.TaskStatus;
;
;
;
;
//# sourceMappingURL=app_state.js.map