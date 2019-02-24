"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageProcessController = /** @class */ (function () {
    function ImageProcessController() {
    }
    ImageProcessController.handleQueue = function () {
        var ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.send("imgproc:queue:start");
    };
    return ImageProcessController;
}());
exports.default = ImageProcessController;
//# sourceMappingURL=ImageProcessController.js.map