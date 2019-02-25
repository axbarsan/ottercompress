import IImageData from "../../interfaces/IImageData";
import AppNavigationController from "../core/AppNavigationController";
import ImageProcessRendererModule from "./";

export default class ImageProcessEventHandler {
  constructor(protected controller: ImageProcessRendererModule) {
    this.handleEvents();
  }

  public handleEvents() {
    const { ipcRenderer } = require("electron");

    ipcRenderer.on("imgproc:queue:image-added", (evt: Electron.IpcMessageEvent, imageData: IImageData) => {
      this.controller.imagePicker.images.push(imageData);
      this.controller.imagePicker.generateImageHTML(imageData);
    });

    ipcRenderer.on("imgproc:queue:clear", () => {
      this.controller.imagePicker.images.length = 0;
      this.controller.imagePicker.clearHTML();
    });

    ipcRenderer.on("imgproc:queue:in-progress", AppNavigationController.next);

    ipcRenderer.on("imgproc:queue:done", AppNavigationController.next);

    ipcRenderer.on("imgproc:queue:error", AppNavigationController.next);
  }

  public handleQueue(): void {
    const { ipcRenderer } = require("electron");

    ipcRenderer.send("imgproc:queue:start");
  }

  public sendEntryFolderEvent = (folderPath: string | null): void => {
    const { ipcRenderer } = require("electron");

    if (folderPath !== null)
      AppNavigationController.next();

    ipcRenderer.send("imgproc:select-parent-folder", folderPath);
  }

  public sendTargetFolderEvent = (folderPath: string | null): void => {
    const { ipcRenderer } = require("electron");

    ipcRenderer.send("imgproc:select-target-folder", folderPath);

    if (folderPath !== null)
      this.handleQueue();
  }
}
