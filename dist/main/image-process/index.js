"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionController_1 = require("./controllers/SessionController");
var ImageProcessModule = /** @class */ (function () {
    function ImageProcessModule() {
        this.sessionController = null;
        this.sessionController = new SessionController_1.default();
    }
    return ImageProcessModule;
}());
exports.default = ImageProcessModule;
//# sourceMappingURL=index.js.map