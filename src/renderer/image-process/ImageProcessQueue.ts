import Image from "./Image";
import ImageProcessor from "./ImageProcessor";

type ProcessCallback = (error: Error | null, image: Image[] | null) => void;

export default class ProcessQueue {
  protected queue: Image[] = [];
  protected _isFinished: boolean = false;

  public get isFinished(): boolean {
    return this._isFinished;
  }

  public get length(): number {
    return this.queue.length;
  }

  public add(image: Image): void {
    this.queue.push(image);
    this._isFinished = false;
  }

  public remove(image: Image): void {
    const itemIndexInQueue: number = this.queue.indexOf(image);

    if (itemIndexInQueue !== -1)
      this.queue.splice(itemIndexInQueue, 1);
  }

  public clear(): void {
    this.queue = [];
    this._isFinished = false;
  }

  public process(targetPath: string, cb?: ProcessCallback): void {
    if (this._isFinished)
      return;

    const queueItemsToProcess: Image[] =
      this.queue.filter((image: Image) => !image.isProcessed);

    Promise.all(
      queueItemsToProcess.map(async (image: Image): Promise<Image> => {
        return ImageProcessor.process(targetPath, image);
      })
    )
      .then((images: Image[]): void => {
        this._isFinished = true;

        if (cb !== undefined)
          cb(null, images);
      })
      .catch((err) => {
        if (cb !== undefined)
          cb(new Error(err.message), null);
      });

    // setTimeout(() => {
    //   if (cb !== undefined)
    //     cb(null, this.queue);
    // }, 2000);
  }
}
