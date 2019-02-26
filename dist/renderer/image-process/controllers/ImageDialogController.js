"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageDialogController = (function () {
    function ImageDialogController() {
    }
    ImageDialogController.showParentFolderDialog = function (cb) {
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
            cb(pathToSend);
        });
    };
    ImageDialogController.showTargetFolderDialog = function (cb) {
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
            cb(pathToSend);
        });
    };
    return ImageDialogController;
}());
exports.default = ImageDialogController;
//# sourceMappingURL=ImageDialogController.js.map