import AppNavigationController from "../../core/AppNavigationController";
import Image from "../Image";
import Session from "../Session";
import FilesController from "./FilesController";

export default class SessionController {
  protected static currentSession: Session = new Session();

  public get session() {
    return SessionController.currentSession;
  }

  public static async addImagesInFolder(path: string): Promise<Image[]> {
    const images: Image[] = await FilesController.getImagesInFolder(path);

    for (const image of images)
      SessionController.currentSession.add(image);

    return images;
  }

  public static async startQueue(): Promise<null> {
    const { targetPath, parentPath, imageQueue } = SessionController.currentSession;

    if (parentPath === null || targetPath === null || imageQueue.isFinished)
      return null;

    try {
      await SessionController.currentSession.imageQueue.process(targetPath);
      SessionController.currentSession.imageGallery.setSuccessful(true);
    } catch (err) {
      SessionController.currentSession.imageGallery.setSuccessful(false);
    }

    SessionController.currentSession.dateFinished = new Date();
    await AppNavigationController.next();

    return null;
  }

  public static clearQueue(): void {
    SessionController.currentSession.reset();
    AppNavigationController.reset();
  }

  public static setParentFolder = async (folderPath: string | null): Promise<null> => {
    SessionController.currentSession.parentPath = folderPath;

    if (folderPath !== null) {
      await AppNavigationController.next();
      await SessionController.addImagesInFolder(folderPath);
      SessionController.currentSession.imageGallery.setTargetBrowserVisibleState(true);
    }

    return null;
  }

  public static setTargetFolder = async (folderPath: string | null): Promise<null> => {
    SessionController.currentSession.targetPath = folderPath;

    if (folderPath !== null) {
      await AppNavigationController.next();
      SessionController.startQueue();
    }

    return null;
  }
}
