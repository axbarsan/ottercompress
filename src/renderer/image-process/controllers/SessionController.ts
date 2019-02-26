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

  public static startQueue(): void {
    const { targetPath, parentPath } = SessionController.currentSession;

    if (parentPath === null || targetPath === null)
      return;

    SessionController.currentSession.imageQueue.process(targetPath,
      (err: Error | null, images: Image[] | null): void => {
        SessionController.currentSession.dateFinished = new Date();
        AppNavigationController.next();
      });
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
