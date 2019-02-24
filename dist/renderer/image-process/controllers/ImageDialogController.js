"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageDialog = /** @class */ (function () {
    function ImageDialog() {
    }
    ImageDialog.showParentFolderDialog = function () {
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
            ImageDialog.sendEntryFolderEvent(pathToSend);
        });
    };
    ImageDialog.showTargetFolderDialog = function () {
        var dialog = require("electron").remote.dialog;
        dialog.showOpenDialog({
            title: "Pick a folder where to export the processed files",
            buttonLabel: "Select",
            properties: [
                "openDirectory",
                "createDirectory"
            ],
        }, function (folderPath) {
            var pathToSend = (folderPath !== undefined
                ? folderPath[0]
                : null);
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