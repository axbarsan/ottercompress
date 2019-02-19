"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var Application = /** @class */ (function () {
    function Application() {
        electron_1.app.on("window-all-closed", Application.onWindowAllClosed);
        electron_1.app.on("ready", Application.onReady);
    }
    Application.onWindowAllClosed = function () {
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    };
    Application.onClose = function () {
        // Dereference the window object.
        Application.mainWindow = null;
    };
    Application.onReady = function () {
        Application.mainWindow = new electron_1.BrowserWindow({
            width: 800,
            height: 600
        });
        Application.mainWindow
            .loadURL("file://" + path.join(__dirname, "../../index.html"));
        Application.mainWindow.on("closed", Application.onClose);
    };
    return Application;
}());
exports.default = Application;
//# sourceMappingURL=main.js.map