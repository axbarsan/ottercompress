type DialogCallback = (path: string | null) => void;

export default class ImageDialogController {
  protected static isOpen: boolean = false;

  public static showParentFolderDialog(cb: DialogCallback): void {
    if (ImageDialogController.isOpen)
      return;

    const { dialog } = require("electron").remote;

    ImageDialogController.isOpen = true;

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
      ImageDialogController.isOpen = false;
    });
  }

  public static showTargetFolderDialog(cb: DialogCallback): void {
    if (ImageDialogController.isOpen)
      return;

    const { dialog } = require("electron").remote;

    ImageDialogController.isOpen = true;

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
      ImageDialogController.isOpen = false;
    });
  }
}
