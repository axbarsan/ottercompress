"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Image_1 = require("../Image");
var ImageController = (function () {
    function ImageController(originalImagePath) {
        this.originalImagePath = originalImagePath;
        this._processedImage = null;
        this._isProcessed = false;
        this._originalImage = new Image_1.default(originalImagePath);
    }
    Object.defineProperty(ImageController.prototype, "originalImage", {
        get: function () {
            return this._originalImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageController.prototype, "isProcessed", {
        get: function () {
            return this._isProcessed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageController.prototype, "processedImage", {
        get: function () {
            return this._processedImage;
        },
        set: function (value) {
            this._processedImage = value;
            this._isProcessed = true;
        },
        enumerable: true,
        configurable: true
    });
    return ImageController;
}());
exports.default = ImageController;
//# sourceMappingURL=ImageController.js.map