import Session from "../Session";
import FilesController from "./FilesController";
import ImageController from "./ImageController";
import ImageProcessor from "./ImageProcessorController";

export default class SessionController {
  protected static currentSession: Session = new Session();

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
      if (SessionController.currentSession.parentPath !== null
        && SessionController.currentSession.targetPath !== null) {
        evt.sender.send("imgproc:queue:in-progress");
        SessionController.startQueue();
      }
    });

    ipcMain.on("imgproc:queue:clear", () => {
      SessionController.clearQueue();
    });
  }

  public static startQueue(): void {
    const activeWindow: Electron.BrowserWindow | null = SessionController.getPrimaryWindow();

    if (activeWindow === null)
      return;

    SessionController.currentSession.queue.process(
      (err: Error | null, imgControllers: ImageController[] | null): void => {
        if (err !== null)
          activeWindow.webContents.send("imgproc:queue:error", err);

        if (imgControllers !== null)
          activeWindow.webContents.send("imgproc:queue:done", imgControllers);

        this.currentSession.isFinished = true;
      });
  }

  public static addImagesInFolder(path: string): void {
    const activeWindow: Electron.BrowserWindow | null = SessionController.getPrimaryWindow();
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

  public static clearQueue(): void {
    this.currentSession.queue.clear();
    SessionController.currentSession.parentPath = null;
    SessionController.currentSession.targetPath = null;
    ImageProcessor.targetPath = null;
    this.currentSession.isFinished = false;
  }

  public static getPrimaryWindow(): Electron.BrowserWindow | null {
    const { BrowserWindow } = require("electron");

    const allWindows: Electron.BrowserWindow[] = BrowserWindow.getAllWindows();

    if (allWindows.length > 0)
      return allWindows[0];

    return null;
  }
}
