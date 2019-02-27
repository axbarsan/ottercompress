import { ImageTypes } from "./controllers/ImageFilesController";
import Image from "./Image";
import ImageGallery from "./ImageGallery";
import { IImageProcessorSettings } from "./ImageProcessor";
import ImageProcessQueue from "./ImageProcessQueue";

export default class Session {
  public dateStarted: Date = new Date();
  public dateFinished: Date | null = null;

  public parentPath: string | null = null;
  public targetPath: string | null = null;

  public readonly imageQueue: ImageProcessQueue = new ImageProcessQueue();
  public readonly imageGallery: ImageGallery = new ImageGallery();

  public processSettings: IImageProcessorSettings[] = [
    {
      format: ImageTypes.JPEG,
      settings: {
        quality: 50
      }
    },
    {
      format: ImageTypes.PNG,
      settings: {
        quality: 50
      }
    },
  ];

  public reset(): void {
    this.imageQueue.clear();
    this.parentPath = null;
    this.targetPath = null;
    this.imageGallery.clearHTML();
  }

  public add(image: Image): void {
    this.imageQueue.add(image);
    this.imageGallery.addImage(image);
    this.imageGallery.updateCounter(this.imageQueue.length);
  }
}
