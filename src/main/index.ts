import { app, BrowserWindow, screen } from "electron";
import * as path from "path";
import * as process from "process";

export default class Application {
  protected mainWindow: BrowserWindow | null = null;

  constructor() {
    process.on("uncaughtException", () => {
      // App crashed
    });

    app.on("window-all-closed", this.onWindowAllClosed.bind(this));
    app.on("ready", this.onReady.bind(this));
    app.on("activate", this.onReady.bind(this));
  }

  private onWindowAllClosed() {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  private onClose() {
    this.mainWindow = null;
  }

  private onReady() {
    this.mainWindow = new BrowserWindow({
      height: 500,
      width: 400,
      show: false,
      resizable: false,
      fullscreenable: false,
      title: "Ottercompress",
      titleBarStyle: "hidden",
      maximizable: false,
      backgroundColor: "#6d3580",
      webPreferences: {
        nodeIntegration: true
      }
    });

    this.mainWindow
      .loadURL("file://" + path.join(__dirname, "../../index.html"));

    this.mainWindow.once("ready-to-show", () => {
      if (this.mainWindow !== null) {
        const { x, y } = screen.getCursorScreenPoint();
        const currentDisplay = screen.getDisplayNearestPoint({ x, y });

        this.mainWindow.setPosition(currentDisplay.workArea.x, currentDisplay.workArea.y);
        this.mainWindow.center();
        this.mainWindow.show();
      }
    });

    this.mainWindow.on("closed", this.onClose);

    this.mainWindow.on("unresponsive", (): void => {
      // App is unresponsive
    });

    this.mainWindow.webContents.on("crashed", (): void => {
      // App crashed
    });
  }
}
