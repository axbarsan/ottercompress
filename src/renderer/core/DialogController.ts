type DialogCallback = (path: string | null) => void;
type MessageBoxCallback = () => void;

export default class DialogController {
  protected static isOpen: boolean = false;

  public static showWarning(message: string, cb?: MessageBoxCallback): void {
    DialogController.showMessageBoxWithSettings({
      type: "warning",
      message: "This is embarrassing...",
      detail: message
    }, cb);
  }

  public static showOpenDialogWithSettings(settings: Electron.OpenDialogOptions, cb: DialogCallback): void {
    if (DialogController.isOpen)
      return;

    const { dialog, getCurrentWindow } = require("electron").remote;

    DialogController.isOpen = true;

    dialog.showOpenDialog(getCurrentWindow(), settings, (folderPath: string[] | undefined): void => {
      const pathToSend: string | null =
        (folderPath !== undefined
          ? folderPath[0]
          : null);

      cb(pathToSend);
      DialogController.isOpen = false;
    });
  }

  public static showMessageBoxWithSettings(settings: Electron.MessageBoxOptions, cb?: MessageBoxCallback): void {
    if (DialogController.isOpen)
      return;

    const { dialog, getCurrentWindow } = require("electron").remote;

    DialogController.isOpen = true;

    dialog.showMessageBox(getCurrentWindow(), settings, (): void => {
      if (cb !== undefined)
        cb();

      DialogController.isOpen = false;
    });
  }

  public static normalizeDefaultPath(path: string | null): string | undefined {
    const defaultPath: string | undefined =
      (path !== null)
        ? path
        : undefined;

    return defaultPath;
  }
}
