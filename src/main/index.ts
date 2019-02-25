import { app, BrowserWindow, screen } from "electron";
import * as path from "path";
import ImageProcessModule from "./image-process/";

export default class Application {
  protected mainWindow: BrowserWindow | null = null;
  protected imageProcessModule: ImageProcessModule | null = null;

  constructor() {
    app.on("window-all-closed", this.onWindowAllClosed.bind(this));
    app.on("ready", this.onReady.bind(this));
    this.imageProcessModule = new ImageProcessModule();
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
      backgroundColor: "#6d3580"
    });

    this.mainWindow
      .loadURL("file://" + path.join(__dirname, "../../index.html"));

    this.mainWindow.once('ready-to-show', () => {
      if (this.mainWindow !== null) {
        const { x, y } = screen.getCursorScreenPoint();
        const currentDisplay = screen.getDisplayNearestPoint({ x, y });

        this.mainWindow.setPosition(currentDisplay.workArea.x, currentDisplay.workArea.y);
        this.mainWindow.center();
        this.mainWindow.show();
      }
    })

    this.mainWindow.on("closed", this.onClose);
  }
}
