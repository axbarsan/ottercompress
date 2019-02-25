"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppNavigationController_1 = require("../core/AppNavigationController");
var ImageProcessEventHandler = /** @class */ (function () {
    function ImageProcessEventHandler(controller) {
        var _this = this;
        this.controller = controller;
        this.sendEntryFolderEvent = function (folderPath) {
            var ipcRenderer = require("electron").ipcRenderer;
            if (folderPath !== null)
                AppNavigationController_1.default.next();
            ipcRenderer.send("imgproc:select-parent-folder", folderPath);
        };
        this.sendTargetFolderEvent = function (folderPath) {
            var ipcRenderer = require("electron").ipcRenderer;
            ipcRenderer.send("imgproc:select-target-folder", folderPath);
            if (folderPath !== null)
                _this.handleQueue();
        };
        this.handleEvents();
    }
    ImageProcessEventHandler.prototype.handleEvents = function () {
        var _this = this;
        var ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.on("imgproc:queue:image-added", function (evt, imageData) {
            _this.controller.imagePicker.images.push(imageData);
            _this.controller.imagePicker.generateImageHTML(imageData);
        });
        ipcRenderer.on("imgproc:queue:clear", function () {
            _this.controller.imagePicker.images.length = 0;
            _this.controller.imagePicker.clearHTML();
        });
        ipcRenderer.on("imgproc:queue:in-progress", AppNavigationController_1.default.next);
        ipcRenderer.on("imgproc:queue:done", AppNavigationController_1.default.next);
        ipcRenderer.on("imgproc:queue:error", AppNavigationController_1.default.next);
    };
    ImageProcessEventHandler.prototype.handleQueue = function () {
        var ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.send("imgproc:queue:start");
    };
    return ImageProcessEventHandler;
}());
exports.default = ImageProcessEventHandler;
//# sourceMappingURL=ImageProcessEventHandler.js.map