"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImagePicker = /** @class */ (function () {
    function ImagePicker(controller) {
        var _this = this;
        this.controller = controller;
        this.images = [];
        this.fileListSelector = ".image-process__filelist";
        this.fileListParent = null;
        this.counterSelector = ".image-process__counter__label";
        this.counterElement = null;
        window.addEventListener("DOMContentLoaded", function () {
            _this.fileListParent = document.querySelector(_this.fileListSelector);
            _this.counterElement = document.querySelector(_this.counterSelector);
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
        imgElement.addEventListener("load", function () {
            imgElement.classList.add("loaded");
        });
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
    ImagePicker.prototype.updateCounter = function () {
        if (this.counterElement === null)
            return;
        this.counterElement.textContent = String(this.images.length);
    };
    return ImagePicker;
}());
exports.default = ImagePicker;
//# sourceMappingURL=ImagePicker.js.map