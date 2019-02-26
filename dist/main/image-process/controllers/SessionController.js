"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session_1 = require("../Session");
var FilesController_1 = require("./FilesController");
var ImageProcessorController_1 = require("./ImageProcessorController");
var SessionController = (function () {
    function SessionController() {
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
            if (SessionController.currentSession.parentPath !== null && SessionController.currentSession.targetPath !== null) {
                evt.sender.send("imgproc:queue:in-progress");
                SessionController.startQueue();
            }
        });
        ipcMain.on("imgproc:queue:clear", function () {
            SessionController.clearQueue();
        });
    };
    SessionController.startQueue = function () {
        var _this = this;
        var activeWindow = SessionController.getPrimaryWindow();
        if (activeWindow === null)
            return;
        SessionController.currentSession.queue.process(function (err, imgControllers) {
            if (err !== null)
                activeWindow.webContents.send("imgproc:queue:error", err);
            if (imgControllers !== null)
                activeWindow.webContents.send("imgproc:queue:done", imgControllers);
            _this.currentSession.isFinished = true;
        });
    };
    SessionController.addImagesInFolder = function (path) {
        var activeWindow = SessionController.getPrimaryWindow();
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
        this.currentSession.queue.clear();
        SessionController.currentSession.parentPath = null;
        SessionController.currentSession.targetPath = null;
        ImageProcessorController_1.default.targetPath = null;
        this.currentSession.isFinished = false;
    };
    SessionController.getPrimaryWindow = function () {
        var BrowserWindow = require("electron").BrowserWindow;
        var allWindows = BrowserWindow.getAllWindows();
        if (allWindows.length > 0)
            return allWindows[0];
        return null;
    };
    SessionController.currentSession = new Session_1.default();
    return SessionController;
}());
exports.default = SessionController;
//# sourceMappingURL=SessionController.js.map