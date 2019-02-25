"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_process_1 = require("./image-process/");
var AppNavigationController_1 = require("./core/AppNavigationController");
var Renderer = /** @class */ (function () {
    function Renderer() {
        this.appNavController = new AppNavigationController_1.default();
        this.imageProcessRenderer = new image_process_1.default();
    }
    return Renderer;
}());
exports.default = Renderer;
exports.currentRenderer = new Renderer();
//# sourceMappingURL=index.js.map