"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilesController_1 = require("./FilesController");
var Image = /** @class */ (function () {
    function Image(path) {
        this.path = path;
        this._isRead = false;
        this.fileData = null;
        var fs = require("fs");
        var data = fs.readFileSync(this.path);
        if (data !== null) {
            var stat = fs.lstatSync(this.path);
            this.fileData = {
                filename: FilesController_1.default.getFileName(this.path),
                extension: FilesController_1.default.getFileExtension(this.path),
                size: stat.size,
                data: data
            };
            this._isRead = true;
        }
    }
    Object.defineProperty(Image.prototype, "isRead", {
        get: function () {
            return this._isRead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "getPath", {
        get: function () {
            return this.path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "imageData", {
        get: function () {
            return this.fileData;
        },
        enumerable: true,
        configurable: true
    });
    return Image;
}());
exports.default = Image;
//# sourceMappingURL=Image.js.map