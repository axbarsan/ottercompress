import { app, BrowserWindow } from "electron";
import * as path from "path";
import SessionController from "./image-process/SessionController";

export default class Application {
  public mainWindow: BrowserWindow | null = null;
  protected sessionController: SessionController | null = null;

  constructor() {
    app.on("window-all-closed", this.onWindowAllClosed.bind(this));
    app.on("ready", this.onReady.bind(this));
    this.sessionController = new SessionController();
  }

  private onWindowAllClosed() {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  private onClose() {
    // Dereference the window object.
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
