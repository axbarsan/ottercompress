import AppNavigationController from "../../core/AppNavigationController";
import Image from "../Image";
import Session from "../Session";
import ConfigController from "./ConfigController";
import ImageFilesController from "./ImageFilesController";
import ImageDialogController from "./ImageDialogController";

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

  public static async startQueue(): Promise<void> {
    const { targetPath, parentPath, imageQueue, processSettings } = SessionController.currentSession;

    if (parentPath === null || targetPath === null || imageQueue.isFinished || processSettings === null)
      return;

    try {
      await SessionController.currentSession.imageQueue.process(
        targetPath,
        processSettings
      );
      SessionController.currentSession.imageGallery.setSuccessful(true);
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

    if (folderPath !== null) {
      await AppNavigationController.next();
      try {
        await SessionController.addImagesInFolder(folderPath);
        SessionController.currentSession.imageGallery.setTargetBrowserVisibleState(true);
      } catch (err) {
        ImageDialogController.showWarning(err.message, async () => {
          await AppNavigationController.prev();
        });
      }
    }
  }

  public static setTargetFolder = async (folderPath: string | null): Promise<void> => {
    SessionController.currentSession.targetPath = folderPath;

    if (folderPath !== null) {
      await AppNavigationController.next();
      SessionController.startQueue();
    }
  }

  public static loadConfigFile(): void {
    SessionController.currentSession.processSettings = ConfigController.loadFile().processSettings;
  }
}
