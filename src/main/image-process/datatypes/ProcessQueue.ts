import ImageController from "../controllers/ImageController";
import ImageProcessor from "../controllers/ImageProcessorController";

export default class ProcessQueue {
  protected queue: Set<ImageController> = new Set();
  protected _isFinished: boolean = false;

  public get isFinished(): boolean {
    return this._isFinished;
  }

  public add(path: string): ImageController {
    const imageController: ImageController = new ImageController(path);
    this.queue.add(imageController);
    this._isFinished = false;

    return imageController;
  }

  public remove(path: string): void {
    this.queue.forEach((controller: ImageController): void => {
      if (controller.originalImagePath === path) {
        this.queue.delete(controller);
      }
    });
  }

  public clear(): void {
    this.queue.clear();
    this._isFinished = false;
  }

  public process(cb?: (error: Error | null, imagesControllers: ImageController[] | null) => void): void {
    if (this._isFinished)
      return;

    const queueItems: Promise<ImageController>[] = [];
    let err: Error = new Error();

    this.queue.forEach((controller: ImageController): void => {
      if (!controller.isProcessed) {
        queueItems.push(ImageProcessor.process(controller));
      }
    });

    Promise.all(queueItems)
      .then((imageControllers: ImageController[]): void => {
        this._isFinished = true;

        if (cb !== undefined)
          cb(null, imageControllers);
      })
      .catch(() => {
        err.message = "There was an error processing your query!";

        if (cb !== undefined)
          cb(err, null);
      });
  }
}
