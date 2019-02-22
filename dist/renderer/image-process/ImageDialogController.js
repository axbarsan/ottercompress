"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageDialog = /** @class */ (function () {
    function ImageDialog() {
    }
    ImageDialog.showOpenDialog = function (entryFolder) {
        if (entryFolder === void 0) { entryFolder = true; }
        var dialog = require("electron").remote.dialog;
        dialog.showOpenDialog({
            title: "Pick a folder with images in it",
            buttonLabel: "Select",
            properties: [
                "openDirectory"
            ],
        }, function (folderPath) {
            var pathToSend = (folderPath !== undefined
                ? folderPath[0]
                : null);
            if (entryFolder)
                ImageDialog.sendEntryFolderEvent(pathToSend);
            else
                ImageDialog.sendTargetFolderEvent(pathToSend);
        });
    };
    ImageDialog.sendEntryFolderEvent = function (folderPath) {
        var ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.send("imgproc:select-parent-folder", folderPath);
    };
    ImageDialog.sendTargetFolderEvent = function (folderPath) {
        var ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.send("imgproc:select-target-folder", folderPath);
    };
    return ImageDialog;
}());
exports.default = ImageDialog;
//# sourceMappingURL=ImageDialogController.js.map