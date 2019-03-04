import Image from "./Image";
import ImageGallery from "./ImageGallery";
import ImageProcessQueue from "./ImageProcessQueue";
import ImageSettings from "./settings/ImageSettings";

export default class Session {
  public dateStarted: Date = new Date();
  public dateFinished: Date | null = null;

  public parentPath: string | null = null;
  public targetPath: string | null = null;

  public defaultParentPath: string | null = null;
  public defaultTargetPath: string | null = null;

  public readonly imageQueue: ImageProcessQueue = new ImageProcessQueue();
  public readonly imageGallery: ImageGallery = new ImageGallery();
  public readonly imageSettings: ImageSettings = new ImageSettings();

  public reset(): void {
    this.imageSettings.reset();
    this.imageQueue.clear();
    this.parentPath = null;
    this.targetPath = null;
    this.imageGallery.clear();
  }

  public add(image: Image): void {
    this.imageQueue.add(image);
    this.imageGallery.addImage(image);
    this.imageGallery.updateCounter(this.imageQueue.length);
  }
}
