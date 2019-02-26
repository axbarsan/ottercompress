import ImageController from "../controllers/ImageController";
import ImageProcessorController from "../controllers/ImageProcessorController";

type ProcessCallback = (error: Error | null, imagesControllers: ImageController[] | null) => void;

export default class ProcessQueue {
  protected queue: ImageController[] = [];
  protected _isFinished: boolean = false;

  public get isFinished(): boolean {
    return this._isFinished;
  }

  public add(path: string): ImageController {
    const imageController: ImageController = new ImageController(path);
    this.queue.push(imageController);
    this._isFinished = false;

    return imageController;
  }

  public remove(path: string): void {
    const itemIndexInQueue: number = this.queue.findIndex((controller: ImageController): boolean => controller.originalImagePath === path);

    if (itemIndexInQueue !== -1)
      this.queue.splice(itemIndexInQueue, 1);
  }

  public clear(): void {
    this.queue = [];
    this._isFinished = false;
  }

  public process = (cb?: ProcessCallback): void => {
    if (this._isFinished)
      return;

    const queueItemsToProcess: ImageController[] = this.queue.filter((controller: ImageController) => !controller.isProcessed);

    Promise.all(
      queueItemsToProcess.map(async (controller: ImageController): Promise<ImageController> => {
        return ImageProcessorController.process(controller);
      })
    )
      .then((imageControllers: ImageController[]): void => {
        this._isFinished = true;

        if (cb !== undefined)
          cb(null, imageControllers);
      })
      .catch((err) => {
        if (cb !== undefined)
          cb(new Error(err.message), null);
      });

    // if (cb !== undefined)
    //   cb(null, queueItemsToProcess);
  }
}
