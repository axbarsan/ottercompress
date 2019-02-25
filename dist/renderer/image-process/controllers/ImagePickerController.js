"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImagePickerController = /** @class */ (function () {
    function ImagePickerController() {
        window.addEventListener("DOMContentLoaded", function () {
            ImagePickerController.fileListParent = document.querySelector(ImagePickerController.fileListSelector);
        });
    }
    ImagePickerController.generateImageHTML = function (imageData) {
        if (ImagePickerController.fileListParent === null)
            return;
        var convertedImage = imageData.data.toString("base64");
        var wrapperElement = document.createElement("div");
        wrapperElement.className = "image-process__filelist__file";
        var imgElement = document.createElement("img");
        imgElement.src = "data:image/jpeg;base64," + convertedImage;
        wrapperElement.appendChild(imgElement);
        ImagePickerController.fileListParent.appendChild(wrapperElement);
    };
    ImagePickerController.clearHTML = function () {
        if (ImagePickerController.fileListParent === null)
            return;
        while (ImagePickerController.fileListParent.firstChild) {
            ImagePickerController.fileListParent.removeChild(ImagePickerController.fileListParent.firstChild);
        }
    };
    ImagePickerController.images = [];
    ImagePickerController.fileListSelector = ".image-process__filelist";
    ImagePickerController.fileListParent = null;
    return ImagePickerController;
}());
exports.default = ImagePickerController;
//# sourceMappingURL=ImagePickerController.js.map