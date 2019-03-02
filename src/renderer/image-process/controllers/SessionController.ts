import AppNavigationController from "../../core/AppNavigationController";
import DialogController from "../../core/DialogController";
import Image from "../Image";
import Session from "../Session";
import ConfigController, { IConfigStructure } from "./ConfigController";
import ImageFilesController from "./ImageFilesController";

export default class SessionController {
  protected static currentSession: Session = new Session();

  public static get session() {
    return SessionController.currentSession;
  }

  public static async addImagesInFolder(path: string): Promise<Image[]> {
    const images: Image[] = await ImageFilesController.getImagesInFolder(path);

    if (images.length === 0)
      throw new Error("I could not find any images with the right format in the folder you provided :(");

    for (const image of images)
      SessionController.currentSession.add(image);

    return images;
  }

  public static async handleQueue(): Promise<void> {
    const { targetPath, parentPath, imageQueue } = SessionController.currentSession;
    const { processSettings, resolutionForResizing } = SessionController.currentSession.imageSettings;

    if (parentPath === null || targetPath === null || imageQueue.isFinished || processSettings === null)
      return;

    try {
      await SessionController.currentSession.imageQueue.process(
        targetPath,
        resolutionForResizing,
        processSettings
      );
      SessionController.currentSession.imageGallery.setSuccessful(true);
    } catch (err) {
      SessionController.currentSession.imageGallery.setSuccessful(false);
      console.warn(err);
    }

    SessionController.currentSession.dateFinished = new Date();
    AppNavigationController.next();
  }

  public static clearQueue(): void {
    SessionController.currentSession.reset();
    AppNavigationController.reset();
  }

  public static setParentFolder = async (folderPath: string | null): Promise<void> => {
    SessionController.currentSession.parentPath = folderPath;

    if (folderPath !== null) {
      SessionController.currentSession.defaultParentPath = folderPath;
      ConfigController.persist({
        parentPath: folderPath
      });
      await AppNavigationController.next();
      try {
        await SessionController.addImagesInFolder(folderPath);
        SessionController.currentSession.imageGallery.setTargetBrowserVisibleState(true);
      } catch (err) {
        DialogController.showWarning(err.message, async () => {
          await AppNavigationController.prev();
        });
      }
    }
  }

  public static setTargetFolder = async (folderPath: string | null): Promise<void> => {
    SessionController.currentSession.targetPath = folderPath;

    if (folderPath !== null) {
      SessionController.currentSession.defaultTargetPath = folderPath;
      ConfigController.persist({
        targetPath: folderPath
      });
      await AppNavigationController.next();
      SessionController.handleQueue();
    }
  }

  public static setResizeResolution(width: number | null, height: number | null): void {
    SessionController.currentSession.imageSettings.resolutionForResizing.width = width;
    SessionController.currentSession.imageSettings.resolutionForResizing.height = height;
  }

  public static loadConfig(): void {
    const config: IConfigStructure = ConfigController.load();
    SessionController.currentSession.imageSettings.processSettings = config.processSettings;
    SessionController.currentSession.defaultParentPath = config.parentPath;
    SessionController.currentSession.defaultTargetPath = config.targetPath;
  }

  public static showParentPathDialog(): void {
    const defaultPath: string | null = SessionController.currentSession.defaultParentPath;

    DialogController.showOpenDialogWithSettings({
      title: "Pick a folder with images in it",
      buttonLabel: "Select",
      properties: [
        "openDirectory"
      ],
      defaultPath: DialogController.normalizeDefaultPath(defaultPath)
    }, SessionController.setParentFolder);
  }

  public static showTargetPathDialog(): void {
    const defaultPath: string | null = SessionController.currentSession.defaultTargetPath;

    DialogController.showOpenDialogWithSettings({
      title: "Pick a folder where to export the processed files",
      buttonLabel: "Select",
      properties: [
        "openDirectory",
        "createDirectory"
      ],
      defaultPath: DialogController.normalizeDefaultPath(defaultPath)
    }, SessionController.setTargetFolder);
  }

  public static setupSettings(): void {
    SessionController.currentSession.imageSettings.setValuesFromProcessingSettings();
    SessionController.currentSession.imageSettings.onSave((): void => {
      const { processSettings } = SessionController.currentSession.imageSettings;

      if (processSettings !== null) {
        ConfigController.persist({
          processSettings
        });
      }
    });
  }
}
