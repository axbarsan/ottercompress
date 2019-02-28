import AppNavigationController from "../../core/AppNavigationController";
import Image from "../Image";
import Session from "../Session";
import ConfigController, { IConfigStructure } from "./ConfigController";
import DialogController from "../../core/DialogController";
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
    const { targetPath, parentPath, imageQueue, processSettings } = SessionController.currentSession;

    if (parentPath === null || targetPath === null || imageQueue.isFinished || processSettings === null)
      return;

    try {
      await SessionController.currentSession.imageQueue.process(
        targetPath,
        processSettings
      );
      SessionController.currentSession.imageGallery.setSuccessful(true);

      ConfigController.addConfigOptions({
        targetPath,
        parentPath,
        processSettings
      });

      ConfigController.saveFile();

    } catch (err) {
      SessionController.currentSession.imageGallery.setSuccessful(false);
      console.warn(err);
    }

    SessionController.currentSession.dateFinished = new Date();
    await AppNavigationController.next();
  }

  public static clearQueue(): void {
    SessionController.currentSession.reset();
    AppNavigationController.reset();
  }

  public static setParentFolder = async (folderPath: string | null): Promise<void> => {
    SessionController.currentSession.parentPath = folderPath;
    SessionController.currentSession.defaultParentPath = folderPath;

    if (folderPath !== null) {
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
    SessionController.currentSession.defaultTargetPath = folderPath;

    if (folderPath !== null) {
      await AppNavigationController.next();
      SessionController.handleQueue();
    }
  }

  public static loadConfig(): void {
    const config: IConfigStructure = ConfigController.loadFile();
    SessionController.currentSession.processSettings = config.processSettings;
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
    const defaultPath: string | null = SessionController.currentSession.defaultParentPath;

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
}
