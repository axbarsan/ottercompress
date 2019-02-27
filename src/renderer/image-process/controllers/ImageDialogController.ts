type DialogCallback = (path: string | null) => void;

export default class ImageDialogController {
  protected static isOpen: boolean = false;

  public static showParentFolderDialog(cb: DialogCallback): void {
    ImageDialogController.openDialogWithSettings({
      title: "Pick a folder with images in it",
      buttonLabel: "Select",
      properties: [
        "openDirectory"
      ]
    }, cb);
  }

  public static showTargetFolderDialog(cb: DialogCallback): void {
    ImageDialogController.openDialogWithSettings({
      title: "Pick a folder where to export the processed files",
      buttonLabel: "Select",
      properties: [
        "openDirectory",
        "createDirectory"
      ],
    }, cb);
  }

  protected static openDialogWithSettings(settings: Electron.OpenDialogOptions, cb: DialogCallback): void {
    if (ImageDialogController.isOpen)
      return;

    const { dialog, getCurrentWindow } = require("electron").remote;

    ImageDialogController.isOpen = true;

    dialog.showOpenDialog(getCurrentWindow(), settings, (folderPath: string[] | undefined): void => {
      const pathToSend: string | null =
        (folderPath !== undefined
          ? folderPath[0]
          : null);

      cb(pathToSend);
      ImageDialogController.isOpen = false;
    });
  }
}
