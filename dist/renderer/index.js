"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_process_1 = require("./image-process/");
var Renderer = (function () {
    function Renderer() {
        this.imageProcessModule = new image_process_1.default();
    }
    return Renderer;
}());
var renderer = new Renderer();
exports.default = renderer;
//# sourceMappingURL=index.js.map