"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var image_process_1 = require("./image-process/");
var Application = (function () {
    function Application() {
        this.mainWindow = null;
        this.imageProcessModule = new image_process_1.default();
        electron_1.app.on("window-all-closed", this.onWindowAllClosed.bind(this));
        electron_1.app.on("ready", this.onReady.bind(this));
        electron_1.app.on("activate", this.onReady.bind(this));
    }
    Application.prototype.onWindowAllClosed = function () {
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    };
    Application.prototype.onClose = function () {
        this.mainWindow = null;
    };
    Application.prototype.onReady = function () {
        var _this = this;
        this.mainWindow = new electron_1.BrowserWindow({
            height: 500,
            width: 400,
            show: false,
            resizable: false,
            fullscreenable: false,
            title: "Ottercompress",
            titleBarStyle: "hidden",
            maximizable: false,
            backgroundColor: "#6d3580"
        });
        this.mainWindow
            .loadURL("file://" + path.join(__dirname, "../../index.html"));
        this.mainWindow.once("ready-to-show", function () {
            if (_this.mainWindow !== null) {
                var _a = electron_1.screen.getCursorScreenPoint(), x = _a.x, y = _a.y;
                var currentDisplay = electron_1.screen.getDisplayNearestPoint({ x: x, y: y });
                _this.mainWindow.setPosition(currentDisplay.workArea.x, currentDisplay.workArea.y);
                _this.mainWindow.center();
                _this.mainWindow.show();
            }
        });
        this.mainWindow.on("closed", this.onClose);
    };
    return Application;
}());
exports.default = Application;
//# sourceMappingURL=index.js.map