"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageDialogController = (function () {
    function ImageDialogController() {
    }
    ImageDialogController.showParentFolderDialog = function (cb) {
        if (ImageDialogController.isOpen)
            return;
        var dialog = require("electron").remote.dialog;
        ImageDialogController.isOpen = true;
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
            cb(pathToSend);
            ImageDialogController.isOpen = false;
        });
    };
    ImageDialogController.showTargetFolderDialog = function (cb) {
        if (ImageDialogController.isOpen)
            return;
        var dialog = require("electron").remote.dialog;
        ImageDialogController.isOpen = true;
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
            cb(pathToSend);
            ImageDialogController.isOpen = false;
        });
    };
    ImageDialogController.isOpen = false;
    return ImageDialogController;
}());
exports.default = ImageDialogController;
//# sourceMappingURL=ImageDialogController.js.map