export default class ImageDialog {
  public static showOpenDialog(entryFolder: boolean = true): void {
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

      if (entryFolder)
        ImageDialog.sendEntryFolderEvent(pathToSend);
      else
        ImageDialog.sendTargetFolderEvent(pathToSend);
    });
  }

  public static sendEntryFolderEvent(folderPath: string | null): void {
    const { ipcRenderer } = require("electron");

    ipcRenderer.send("imgproc:select-parent-folder", folderPath);
  }

  public static sendTargetFolderEvent(folderPath: string | null): void {
    const { ipcRenderer } = require("electron");

    ipcRenderer.send("imgproc:select-target-folder", folderPath);
  }
}
