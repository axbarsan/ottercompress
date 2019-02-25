import { currentRenderer } from "../../";
import ImageProcessController from "./ImageProcessController";

export default class ImageDialog {
  public static showParentFolderDialog(): void {
    const { dialog } = require("electron").remote;

    dialog.showOpenDialog({
      title: "Pick a folder with images in it",
      buttonLabel: "Select",
      properties: [
        "openDirectory"
      ],
    }, (folderPath: string[] | undefined): void => {
      const pathToSend: string | null =
        (folderPath !== undefined
          ? folderPath[0]
          : null);

      ImageDialog.sendEntryFolderEvent(pathToSend);
    });
  }

  public static showTargetFolderDialog(): void {
    const { dialog } = require("electron").remote;

    dialog.showOpenDialog({
      title: "Pick a folder where to export the processed files",
      buttonLabel: "Select",
      properties: [
        "openDirectory",
        "createDirectory"
      ],
    }, (folderPath: string[] | undefined): void => {
      const pathToSend: string | null =
        (folderPath !== undefined
          ? folderPath[0]
          : null);

      ImageDialog.sendTargetFolderEvent(pathToSend);
      ImageProcessController.handleQueue();
    });
  }

  public static sendEntryFolderEvent(folderPath: string | null): void {
    const { ipcRenderer } = require("electron");

    ipcRenderer.send("imgproc:select-parent-folder", folderPath);
    currentRenderer.appNavController.next();
  }

  public static sendTargetFolderEvent(folderPath: string | null): void {
    const { ipcRenderer } = require("electron");

    ipcRenderer.send("imgproc:select-target-folder", folderPath);
    currentRenderer.appNavController.next();
  }
}
