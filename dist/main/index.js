"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var SessionController_1 = require("./image-process/SessionController");
var Application = /** @class */ (function () {
    function Application() {
        this.mainWindow = null;
        this.sessionController = null;
        electron_1.app.on("window-all-closed", this.onWindowAllClosed.bind(this));
        electron_1.app.on("ready", this.onReady.bind(this));
        this.sessionController = new SessionController_1.default();
    }
    Application.prototype.onWindowAllClosed = function () {
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    };
    Application.prototype.onClose = function () {
        // Dereference the window object.
        this.mainWindow = null;
    };
    Application.prototype.onReady = function () {
        var _this = this;
        this.mainWindow = new electron_1.BrowserWindow({
            height: 600,
            width: 800,
            show: false,
        });
        this.mainWindow
            .loadURL("file://" + path.join(__dirname, "../../index.html"));
        this.mainWindow.once('ready-to-show', function () {
            if (_this.mainWindow !== null)
                _this.mainWindow.show();
        });
        this.mainWindow.on("closed", this.onClose);
    };
    return Application;
}());
exports.default = Application;
//# sourceMappingURL=index.js.map