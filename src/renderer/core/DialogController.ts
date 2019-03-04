type DialogCallback = (path: string | null) => void;

type MessageBoxCallback = () => void;

/**
 * Controller used for handling shell dialogs
 */
export default class DialogController {
  protected static isOpen: boolean = false;

  /**
   * Show shell warning message
   * @param message message content
   * @param cb callback for after the dialog is closed
   */
  public static showWarning(message: string, cb?: MessageBoxCallback): void {
    DialogController.showMessageBoxWithSettings({
      type: "warning",
      message: "This is embarrassing...",
      detail: message
    }, cb);
  }

  /**
   * Shop shell open dialog
   * @param settings dialog options
   * @param cb callback for after the dialog is closed
   */
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

  /**
   * Show message box
   * @param settings dialog options
   * @param cb callback for after the dialog is closed
   */
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

  /**
   * Normalize path to be easily used as an option in the electron dialog module
   */
  public static normalizeDefaultPath(path: string | null): string | undefined {
    const defaultPath: string | undefined =
      (path !== null)
        ? path
        : undefined;

    return defaultPath;
  }
}
