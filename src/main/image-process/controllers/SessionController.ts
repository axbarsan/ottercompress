import Session from "../datatypes/Session";
import FilesController from "./FilesController";
import ImageController from "./ImageController";
import { BrowserWindow } from "electron";
import ImageProcessor from "./ImageProcessorController";

export default class SessionController {
  protected static currentSession: Session = new Session();

  constructor() {
    SessionController.setUpFileSelectEvents();
  }

  public get session() {
    return SessionController.currentSession;
  }

  public static setUpFileSelectEvents(): void {
    const { ipcMain } = require("electron");

    ipcMain.on("imgproc:select-parent-folder", (evt: Electron.IpcMessageEvent, path: string | null) => {
      if (path !== null)
        SessionController.addImagesInFolder(path);

      SessionController.currentSession.parentPath = path;
    });

    ipcMain.on("imgproc:select-target-folder", (evt: Electron.IpcMessageEvent, path: string | null) => {
      SessionController.currentSession.targetPath = path;
      ImageProcessor.targetPath = path;
    });

    ipcMain.on("imgproc:queue:start", (evt: Electron.IpcMessageEvent) => {
      if (SessionController.currentSession.parentPath !== null && SessionController.currentSession.targetPath !== null) {
        evt.sender.send("imgproc:queue:in-progress");
        SessionController.startQueue();
      }
    });
  }

  protected static startQueue(): void {
    const activeWindow: BrowserWindow | null = BrowserWindow.getFocusedWindow();
    SessionController.currentSession.queue.process(
      (err: Error | null, imgControllers: ImageController[] | null): void => {
        if (activeWindow === null)
          return;

        if (err !== null)
          activeWindow.webContents.send("imgproc:queue:error", err);

        if (imgControllers !== null)
          activeWindow.webContents.send("imgproc:queue:done", imgControllers);
      });
  }

  protected static addImagesInFolder(path: string): void {
    const activeWindow: BrowserWindow | null = BrowserWindow.getFocusedWindow();

    const files: string[] = FilesController.getImagesInFolder(path);

    for (const file of files) {
      const controllerToAdd: ImageController =
        SessionController.currentSession.queue.add(file);

      if (activeWindow !== null) {
        activeWindow.webContents.send("imgproc:queue:image-added",
          controllerToAdd.originalImage.imageData);
      }
    }
  }

  protected static clearQueue(): void {
    const activeWindow: BrowserWindow | null = BrowserWindow.getFocusedWindow();

    if (activeWindow !== null) {
      activeWindow.webContents.send("imgproc:queue:clear");
    }
  }
}
