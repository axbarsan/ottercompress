import AppNavigationController from "../../core/AppNavigationController";
import Image from "../Image";
import Session from "../Session";
import ImageFilesController from "./ImageFilesController";

export default class SessionController {
  protected static currentSession: Session = new Session();

  public get session() {
    return SessionController.currentSession;
  }

  public static async addImagesInFolder(path: string): Promise<Image[]> {
    const images: Image[] = await ImageFilesController.getImagesInFolder(path);

    for (const image of images)
      SessionController.currentSession.add(image);

    return images;
  }

  public static async startQueue(): Promise<void> {
    const { targetPath, parentPath, imageQueue } = SessionController.currentSession;

    if (parentPath === null || targetPath === null || imageQueue.isFinished)
      return;

    try {
      await SessionController.currentSession.imageQueue.process(
        targetPath,
        SessionController.currentSession.processSettings
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
      await SessionController.addImagesInFolder(folderPath);
      SessionController.currentSession.imageGallery.setTargetBrowserVisibleState(true);
    }
  }

  public static setTargetFolder = async (folderPath: string | null): Promise<void> => {
    SessionController.currentSession.targetPath = folderPath;

    if (folderPath !== null) {
      await AppNavigationController.next();
      SessionController.startQueue();
    }
  }
}
