import { app, BrowserWindow, Menu, screen } from "electron";
import * as path from "path";
import * as process from "process";

export default class Application {
  protected mainWindow: BrowserWindow | null = null;

  constructor() {
    process.on("uncaughtException", (): void => {
      // App crashed
    });

    app.setAboutPanelOptions({
      copyright: "Copyright (C) 2019 axbarsan. All rights reserved."
    });

    app.on("window-all-closed", this.onWindowAllClosed.bind(this));
    app.on("ready", this.onReady.bind(this));
    app.on("activate", this.onReady.bind(this));
  }

  protected onWindowAllClosed(): void {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  protected onClose(): void {
    this.mainWindow = null;
  }

  protected onReady(): void {
    if (this.mainWindow !== null)
      return;

    this.mainWindow = new BrowserWindow({
      height: 500,
      width: 400,
      show: false,
      resizable: false,
      fullscreenable: false,
      title: app.getName(),
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

    this.createMenu();

    this.mainWindow.webContents.openDevTools();
  }

  protected createMenu(): void {
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        role: "window",
        submenu: [
          { role: "minimize" },
          { role: "close" }
        ]
      },
      {
        role: "help",
        submenu: [
          {
            label: "View repository",
            click() { require("electron").shell.openExternal("https://github.com/axbarsan"); }
          }
        ]
      }
    ];

    if (process.platform === "darwin") {
      template.unshift({
        label: app.getName(),
        submenu: [
          { role: "about" },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          { role: "hide" },
          { role: "hideothers" },
          { role: "unhide" },
          { type: "separator" },
          { role: "quit" }
        ]
      });

      // Window menu
      template[1].submenu = [
        { role: "close" },
        { role: "minimize" },
        { role: "zoom" },
        { type: "separator" },
        { role: "front" }
      ];
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
}
