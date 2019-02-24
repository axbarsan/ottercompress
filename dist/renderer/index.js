"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_process_1 = require("./image-process/");
var Renderer = /** @class */ (function () {
    function Renderer() {
        this.imageProcessRenderer = null;
        this.imageProcessRenderer = new image_process_1.default();
    }
    return Renderer;
}());
exports.default = Renderer;
exports.currentRenderer = new Renderer();
//# sourceMappingURL=index.js.map