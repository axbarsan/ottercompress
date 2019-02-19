import { app, BrowserWindow } from "electron";
import * as path from "path";

export default class Application {
  public static mainWindow: BrowserWindow | null;

  constructor() {
    app.on("window-all-closed", this.onWindowAllClosed);
    app.on("ready", this.onReady);
  }

  private onWindowAllClosed() {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  private onClose() {
    // Dereference the window object.
    Application.mainWindow = null;
  }

  private onReady() {
    Application.mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
    });
    Application.mainWindow
      .loadURL("file://" + path.join(__dirname, "../../index.html"));
    Application.mainWindow.on("closed", this.onClose);
  }
}
