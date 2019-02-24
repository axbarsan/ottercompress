import { app, BrowserWindow } from "electron";
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
      height: 600,
      width: 800,
      show: false,
    });

    this.mainWindow
      .loadURL("file://" + path.join(__dirname, "../../index.html"));

    this.mainWindow.once('ready-to-show', () => {
      if (this.mainWindow !== null)
        this.mainWindow.show()
    })

    this.mainWindow.on("closed", this.onClose);
  }
}
