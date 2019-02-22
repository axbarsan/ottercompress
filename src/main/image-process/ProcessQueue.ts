import ImageController from "./ImageController";

export default class ProcessQueue {
  protected queue: Set<ImageController> = new Set();
  protected _isFinished: boolean = false;

  public get isFinished(): boolean {
    return this._isFinished;
  }

  public add(path: string): ImageController {
    const imageController: ImageController = new ImageController(path);
    this.queue.add(imageController);

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
  }

  public process(cb?: (error: Error | null, imagesControllers: ImageController[] | null) => void): void {
    const queueItems: Promise<ImageController>[] = [];
    let err: Error = new Error();

    this.queue.forEach((controller: ImageController): void => {
      queueItems.push(controller.process());
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
