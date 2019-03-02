import { BrowserWindow, Menu, screen } from "electron";
import * as path from "path";
import * as process from "process";

export default class Application {
  protected static mainWindow: BrowserWindow | null = null;
  protected static app: Electron.App;
  protected static browserWindow: typeof BrowserWindow;

  public static bootstrap(app: Electron.App, browserWindow: typeof BrowserWindow): void {
    Application.app = app;
    Application.browserWindow = browserWindow;

    if (process.platform === "darwin") {
      Application.app.setAboutPanelOptions({
        copyright: "Made by axbarsan."
      });
    }

    Application.app.on("ready", Application.onReady);
    Application.app.on("window-all-closed", (): void => {
      if (process.platform !== "darwin")
        Application.app.quit();
    });
    Application.app.on("activate", () => {
      if (Application.mainWindow === null)
        Application.onReady();
    });
  }

  protected static onClose(): void {
    Application.mainWindow = null;
  }

  protected static onReady(): void {
    Application.mainWindow = new Application.browserWindow({
      height: 500,
      width: 400,
      show: false,
      resizable: false,
      fullscreenable: false,
      title: Application.app.getName(),
      titleBarStyle: "hidden",
      maximizable: false,
      backgroundColor: "#6d3580",
      webPreferences: {
        nodeIntegration: true
      }
    });

    Application.mainWindow
      .loadURL("file://" + path.join(__dirname, "../static/index.html"));

    Application.mainWindow.once("ready-to-show", () => {
      if (Application.mainWindow !== null) {
        const { x, y } = screen.getCursorScreenPoint();
        const currentDisplay = screen.getDisplayNearestPoint({ x, y });

        Application.mainWindow.setPosition(currentDisplay.workArea.x, currentDisplay.workArea.y);
        Application.mainWindow.center();
        Application.mainWindow.show();
      }
    });

    Application.mainWindow.on("closed", Application.onClose);

    // Application.createMenu();
    // Application.mainWindow.webContents.openDevTools();
  }

  protected static createMenu(): void {
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
        label: Application.app.getName(),
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
