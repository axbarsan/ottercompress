"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageDialog = /** @class */ (function () {
    function ImageDialog() {
    }
    ImageDialog.showOpenDialog = function () {
        var dialog = require("electron").remote.dialog;
        dialog.showOpenDialog({
            title: "Pick an image or a folder",
            buttonLabel: "Pick",
            filters: [
                {
                    extensions: ["jpg", "png", "gif", "jpeg", "bmp"],
                    name: "Supported image files"
                }
            ],
            properties: [
                "openFile",
                "openDirectory",
                "multiSelections"
            ],
        }, function (filePaths) {
            var filesToSend = (filePaths !== undefined
                ? filePaths
                : null);
            ImageDialog.sendFilesPickedEvent(filesToSend);
        });
    };
    ImageDialog.sendFilesPickedEvent = function (files) {
        var ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.send("imgproc:select-folder", files);
    };
    return ImageDialog;
}());
exports.ImageDialog = ImageDialog;
//# sourceMappingURL=ImageDialog.js.map