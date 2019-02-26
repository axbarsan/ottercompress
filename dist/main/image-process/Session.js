"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessQueue_1 = require("./ProcessQueue");
var Session = (function () {
    function Session() {
        this.dateStarted = new Date();
        this.dateFinished = null;
        this.isFinished = false;
        this.parentPath = null;
        this.targetPath = null;
        this.queue = new ProcessQueue_1.default();
    }
    return Session;
}());
exports.default = Session;
//# sourceMappingURL=Session.js.map