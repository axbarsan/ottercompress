"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session_1 = require("../datatypes/Session");
var FilesController_1 = require("./FilesController");
var electron_1 = require("electron");
var ImageProcessorController_1 = require("./ImageProcessorController");
var SessionController = /** @class */ (function () {
    function SessionController() {
        SessionController.setUpFileSelectEvents();
    }
    Object.defineProperty(SessionController.prototype, "session", {
        get: function () {
            return SessionController.currentSession;
        },
        enumerable: true,
        configurable: true
    });
    SessionController.setUpFileSelectEvents = function () {
        var ipcMain = require("electron").ipcMain;
        ipcMain.on("imgproc:select-parent-folder", function (evt, path) {
            if (path !== null)
                SessionController.addImagesInFolder(path);
            SessionController.currentSession.parentPath = path;
        });
        ipcMain.on("imgproc:select-target-folder", function (evt, path) {
            SessionController.currentSession.targetPath = path;
            ImageProcessorController_1.default.targetPath = path;
        });
        ipcMain.on("imgproc:queue:start", function (evt) {
            evt.sender.send("imgproc:queue:in-progress");
            SessionController.startQueue();
        });
    };
    SessionController.startQueue = function () {
        SessionController.currentSession.queue.process(function (err, imgControllers) {
            console.log(err, imgControllers);
        });
    };
    SessionController.addImagesInFolder = function (path) {
        var activeWindow = electron_1.BrowserWindow.getFocusedWindow();
        var files = FilesController_1.default.getImagesInFolder(path);
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            var controllerToAdd = SessionController.currentSession.queue.add(file);
            if (activeWindow !== null) {
                activeWindow.webContents.send("imgproc:queue:image-added", controllerToAdd.originalImage.imageData);
            }
        }
    };
    SessionController.clearQueue = function () {
        var activeWindow = electron_1.BrowserWindow.getFocusedWindow();
        if (activeWindow !== null) {
            activeWindow.webContents.send("imgproc:queue:clear");
        }
    };
    SessionController.currentSession = new Session_1.default();
    return SessionController;
}());
exports.default = SessionController;
//# sourceMappingURL=SessionController.js.map