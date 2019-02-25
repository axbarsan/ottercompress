"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImagePicker = /** @class */ (function () {
    function ImagePicker(controller) {
        var _this = this;
        this.controller = controller;
        this.images = [];
        this.fileListSelector = ".image-process__filelist";
        this.fileListParent = null;
        window.addEventListener("DOMContentLoaded", function () {
            _this.fileListParent = document.querySelector(_this.fileListSelector);
        });
    }
    ImagePicker.prototype.generateImageHTML = function (imageData) {
        if (this.fileListParent === null)
            return;
        var convertedImage = imageData.data.toString("base64");
        var wrapperElement = document.createElement("div");
        wrapperElement.className = "image-process__filelist__file";
        var imgElement = document.createElement("img");
        imgElement.src = "data:image/jpeg;base64," + convertedImage;
        wrapperElement.appendChild(imgElement);
        this.fileListParent.appendChild(wrapperElement);
    };
    ImagePicker.prototype.clearHTML = function () {
        if (this.fileListParent === null)
            return;
        while (this.fileListParent.firstChild) {
            this.fileListParent.removeChild(this.fileListParent.firstChild);
        }
    };
    return ImagePicker;
}());
exports.default = ImagePicker;
//# sourceMappingURL=ImagePicker.js.map