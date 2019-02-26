"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageDialogController_1 = require("./controllers/ImageDialogController");
var ImagePicker_1 = require("./ImagePicker");
var FileDraggingController_1 = require("./controllers/FileDraggingController");
var ImageProcessEventHandler_1 = require("./ImageProcessEventHandler");
var ImageProcessRendererModule = /** @class */ (function () {
    function ImageProcessRendererModule() {
        var _this = this;
        this.imagePicker = new ImagePicker_1.default(this);
        this.imageProcessEventHandler = new ImageProcessEventHandler_1.default(this);
        window.addEventListener("DOMContentLoaded", function () {
            var parentFolderSelectBtn = document.querySelector(".image-process__drop-zone");
            if (parentFolderSelectBtn !== null) {
                parentFolderSelectBtn.addEventListener("click", function () {
                    ImageDialogController_1.default.showParentFolderDialog(_this.imageProcessEventHandler.sendEntryFolderEvent);
                });
                new FileDraggingController_1.default({
                    element: parentFolderSelectBtn,
                    activeClass: "active",
                    isFolderOnly: true,
                    dropCallback: function (folders) {
                        _this.imageProcessEventHandler.sendEntryFolderEvent(folders[0].path);
                    }
                });
            }
            var targetFolderSelectBtn = document.querySelector(".image-process__select--target button");
            if (targetFolderSelectBtn !== null) {
                targetFolderSelectBtn.addEventListener("click", function () {
                    ImageDialogController_1.default.showTargetFolderDialog(_this.imageProcessEventHandler.sendTargetFolderEvent);
                });
            }
            var resetBtn = document.querySelector(".image-process__reset");
            if (resetBtn !== null)
                resetBtn.addEventListener("click", _this.imageProcessEventHandler.clearQueue);
        });
    }
    return ImageProcessRendererModule;
}());
exports.default = ImageProcessRendererModule;
//# sourceMappingURL=index.js.map