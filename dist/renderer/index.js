"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageDialogController_1 = require("./image-process/ImageDialogController");
var ImagePickerController_1 = require("./image-process/ImagePickerController");
var ImageProcessController_1 = require("./image-process/ImageProcessController");
exports.imagePickerController = new ImagePickerController_1.default();
window.addEventListener("DOMContentLoaded", function () {
    var parentFolderSelectBtn = document.querySelector(".image-process__select--parent button");
    if (parentFolderSelectBtn !== null) {
        parentFolderSelectBtn.addEventListener("click", function () {
            ImageDialogController_1.default.showOpenDialog();
        });
    }
    var targetFolderSelectBtn = document.querySelector(".image-process__select--target button");
    if (targetFolderSelectBtn !== null) {
        targetFolderSelectBtn.addEventListener("click", function () {
            ImageDialogController_1.default.showOpenDialog(false);
        });
    }
    var imageProcessButton = document.querySelector(".image-process__action button");
    if (imageProcessButton !== null) {
        imageProcessButton.addEventListener("click", function () {
            ImageProcessController_1.default.handleQueue();
        });
    }
});
//# sourceMappingURL=index.js.map