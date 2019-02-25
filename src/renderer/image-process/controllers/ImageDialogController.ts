type DialogCallback = (path: string | null) => void;

export default class ImageDialogController {
  public static showParentFolderDialog(cb: DialogCallback): void {
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

      cb(pathToSend);
    });
  }

  public static showTargetFolderDialog(cb: DialogCallback): void {
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

      cb(pathToSend);
    });
  }
}
