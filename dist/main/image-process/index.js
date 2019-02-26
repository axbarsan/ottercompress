"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionController_1 = require("./controllers/SessionController");
var ImageProcessModule = (function () {
    function ImageProcessModule() {
        this.sessionController = new SessionController_1.default();
        SessionController_1.default.setUpFileSelectEvents();
        SessionController_1.default.clearQueue();
    }
    return ImageProcessModule;
}());
exports.default = ImageProcessModule;
//# sourceMappingURL=index.js.map