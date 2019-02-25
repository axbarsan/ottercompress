"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageDialogController_1 = require("./controllers/ImageDialogController");
var ImagePickerController_1 = require("./controllers/ImagePickerController");
var FileDraggingController_1 = require("./controllers/FileDraggingController");
var ImageProcessRendererModule = /** @class */ (function () {
    function ImageProcessRendererModule() {
        this.imagePickerController = new ImagePickerController_1.default();
        window.addEventListener("DOMContentLoaded", function () {
            var parentFolderSelectBtn = document.querySelector(".image-process__drop-zone");
            if (parentFolderSelectBtn !== null) {
                parentFolderSelectBtn.addEventListener("click", function () {
                    ImageDialogController_1.default.showParentFolderDialog();
                });
                new FileDraggingController_1.default({
                    element: parentFolderSelectBtn,
                    activeClass: "active",
                    isFolderOnly: true,
                    dropCallback: function (folders) {
                        ImageDialogController_1.default.sendEntryFolderEvent(folders[0].path);
                    }
                });
            }
            var targetFolderSelectBtn = document.querySelector(".image-process__select--target button");
            if (targetFolderSelectBtn !== null) {
                targetFolderSelectBtn.addEventListener("click", function () {
                    ImageDialogController_1.default.showTargetFolderDialog();
                });
            }
        });
    }
    return ImageProcessRendererModule;
}());
exports.default = ImageProcessRendererModule;
//# sourceMappingURL=index.js.map