"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImagePickerController = /** @class */ (function () {
    function ImagePickerController() {
        ImagePickerController.handleEvents();
    }
    ImagePickerController.handleEvents = function () {
        var ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.on("imgproc:queue:image-added", function (evt, imageData) {
            ImagePickerController.images.push(imageData);
            ImagePickerController.appendToHTML(imageData);
        });
        ipcRenderer.on("imgproc:queue:clear", function (evt) {
            ImagePickerController.images.length = 0;
            ImagePickerController.clearHTML();
        });
    };
    ImagePickerController.appendToHTML = function (imageData) {
        var fileListParent = document.querySelector(".image-process__filelist");
        var parent;
        if (fileListParent === null)
            return;
        var lastElement = fileListParent.lastElementChild;
        if (lastElement === null) {
            parent = document.createElement("div");
            parent.className = "image-process__filelist__file";
            fileListParent.appendChild(parent);
        }
        else {
            var lastElemClone = lastElement.cloneNode(false);
            fileListParent.appendChild(lastElemClone);
            parent = fileListParent.lastElementChild;
        }
        var convertedImage = imageData.data.toString("base64");
        var imgElement = document.createElement("img");
        imgElement.src = "data:image/jpeg;base64," + convertedImage;
        parent.appendChild(imgElement);
    };
    ImagePickerController.clearHTML = function () {
        var fileListParent = document.querySelector(".image-process__filelist");
        if (fileListParent === null)
            return;
        while (fileListParent.firstChild) {
            fileListParent.removeChild(fileListParent.firstChild);
        }
    };
    ImagePickerController.images = [];
    return ImagePickerController;
}());
exports.default = ImagePickerController;
//# sourceMappingURL=ImagePickerController.js.map