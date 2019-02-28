type DialogCallback = (path: string | null) => void;
type MessageBoxCallback = () => void;

export default class ImageDialogController {
  protected static isOpen: boolean = false;

  public static showParentFolderDialog(cb: DialogCallback): void {
    ImageDialogController.showOpenDialogWithSettings({
      title: "Pick a folder with images in it",
      buttonLabel: "Select",
      properties: [
        "openDirectory"
      ]
    }, cb);
  }

  public static showTargetFolderDialog(cb: DialogCallback): void {
    ImageDialogController.showOpenDialogWithSettings({
      title: "Pick a folder where to export the processed files",
      buttonLabel: "Select",
      properties: [
        "openDirectory",
        "createDirectory"
      ],
    }, cb);
  }

  public static showWarning(message: string, cb?: MessageBoxCallback): void {
    ImageDialogController.showMessageBoxWithSettings({
      type: "warning",
      message: "This is embarrassing...",
      detail: message
    }, cb);
  }

  protected static showOpenDialogWithSettings(settings: Electron.OpenDialogOptions, cb: DialogCallback): void {
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

  protected static showMessageBoxWithSettings(settings: Electron.MessageBoxOptions, cb?: MessageBoxCallback): void {
    if (ImageDialogController.isOpen)
      return;

    const { dialog, getCurrentWindow } = require("electron").remote;

    ImageDialogController.isOpen = true;

    dialog.showMessageBox(getCurrentWindow(), settings, (): void => {
      if (cb !== undefined)
        cb();

      ImageDialogController.isOpen = false;
    });
  }
}
