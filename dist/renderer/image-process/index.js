"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageDialogController_1 = require("./controllers/ImageDialogController");
var ImagePickerController_1 = require("./controllers/ImagePickerController");
var ImageProcessController_1 = require("./controllers/ImageProcessController");
var ImageProcessRendererModule = /** @class */ (function () {
    function ImageProcessRendererModule() {
        this.imagePickerController = new ImagePickerController_1.default();
        window.addEventListener("DOMContentLoaded", function () {
            var parentFolderSelectBtn = document.querySelector(".image-process__select--parent button");
            if (parentFolderSelectBtn !== null) {
                parentFolderSelectBtn.addEventListener("click", function () {
                    ImageDialogController_1.default.showParentFolderDialog();
                });
            }
            var targetFolderSelectBtn = document.querySelector(".image-process__select--target button");
            if (targetFolderSelectBtn !== null) {
                targetFolderSelectBtn.addEventListener("click", function () {
                    ImageDialogController_1.default.showTargetFolderDialog();
                });
            }
            var imageProcessButton = document.querySelector(".image-process__action button");
            if (imageProcessButton !== null) {
                imageProcessButton.addEventListener("click", function () {
                    ImageProcessController_1.default.handleQueue();
                });
            }
        });
    }
    return ImageProcessRendererModule;
}());
exports.default = ImageProcessRendererModule;
//# sourceMappingURL=index.js.map