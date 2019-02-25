"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../../");
var ImageProcessController = /** @class */ (function () {
    function ImageProcessController() {
        this.handleEvents();
    }
    ImageProcessController.prototype.handleEvents = function () {
        var ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.on("imgproc:queue:image-added", function (evt, imageData) {
            __1.default.imageProcessRenderer.imagePicker.images.push(imageData);
            __1.default.imageProcessRenderer.imagePicker.generateImageHTML(imageData);
        });
        ipcRenderer.on("imgproc:queue:clear", function () {
            __1.default.imageProcessRenderer.imagePicker.images.length = 0;
            __1.default.imageProcessRenderer.imagePicker.clearHTML();
        });
        ipcRenderer.on("imgproc:queue:in-progress", __1.default.appNavController.next);
        ipcRenderer.on("imgproc:queue:done", __1.default.appNavController.next);
        ipcRenderer.on("imgproc:queue:error", __1.default.appNavController.next);
    };
    ImageProcessController.prototype.handleQueue = function () {
        var ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.send("imgproc:queue:start");
    };
    return ImageProcessController;
}());
exports.default = ImageProcessController;
//# sourceMappingURL=ImageProcessController.js.map