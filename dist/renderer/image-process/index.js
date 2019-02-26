"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileDraggingController_1 = require("./controllers/FileDraggingController");
var ImageDialogController_1 = require("./controllers/ImageDialogController");
var SessionController_1 = require("./controllers/SessionController");
var ImageProcessRendererModule = (function () {
    function ImageProcessRendererModule() {
        SessionController_1.default.clearQueue();
        window.addEventListener("DOMContentLoaded", function () {
            var parentFolderSelectBtn = document.querySelector(".image-process__drop-zone");
            if (parentFolderSelectBtn !== null) {
                parentFolderSelectBtn.addEventListener("click", function () {
                    ImageDialogController_1.default.showParentFolderDialog(SessionController_1.default.setParentFolder);
                });
                var parentFolderDragging = new FileDraggingController_1.default({
                    element: parentFolderSelectBtn,
                    activeClass: "active",
                    isFolderOnly: true,
                    dropCallback: function (folders) {
                        SessionController_1.default.setParentFolder(folders[0].path);
                    }
                });
            }
            var targetFolderSelectBtn = document.querySelector(".image-process__select--target button");
            if (targetFolderSelectBtn !== null) {
                targetFolderSelectBtn.addEventListener("click", function () {
                    ImageDialogController_1.default.showTargetFolderDialog(SessionController_1.default.setTargetFolder);
                });
            }
            var resetBtn = document.querySelector(".image-process__reset");
            if (resetBtn !== null)
                resetBtn.addEventListener("click", SessionController_1.default.clearQueue);
        });
    }
    return ImageProcessRendererModule;
}());
exports.default = ImageProcessRendererModule;
//# sourceMappingURL=index.js.map