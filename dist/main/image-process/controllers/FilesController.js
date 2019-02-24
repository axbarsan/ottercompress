"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilesController = /** @class */ (function () {
    function FilesController() {
    }
    FilesController.getImagesInFolder = function (folderPath) {
        var _this = this;
        var fs = require("fs");
        var path = require("path");
        var files = [];
        fs.readdirSync(folderPath).forEach(function (file) {
            var filename = path.join(folderPath, file);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                _this.getImagesInFolder(filename);
            }
            else if (FilesController.fileHasValidExtension(filename)) {
                files.push(filename);
            }
            ;
        });
        return files;
    };
    FilesController.getFileExtension = function (filePath) {
        var path = require("path");
        return path.parse(filePath).ext;
    };
    FilesController.fileHasValidExtension = function (filePath) {
        var fileExtension = FilesController.getFileExtension(filePath);
        return (FilesController.extensions.indexOf(fileExtension) !== -1);
    };
    FilesController.getFileName = function (filePath) {
        var path = require("path");
        return path.parse(filePath).name;
    };
    FilesController.getFileLocation = function (filePath) {
        var path = require("path");
        return path.parse(filePath).dir;
    };
    FilesController.extensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
    return FilesController;
}());
exports.default = FilesController;
//# sourceMappingURL=FilesController.js.map