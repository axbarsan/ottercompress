import Image from "./Image";
import ImageProcessor from "./ImageProcessor";

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

  public async process(targetPath: string): Promise<Image[]> {
    const queueItemsToProcess: Image[] =
      this.queue.filter((image: Image) => !image.isProcessed);

    await Promise.all(
      queueItemsToProcess.map(async (image: Image): Promise<Image> => {
        return ImageProcessor.process(targetPath, image);
      })
    );

    return queueItemsToProcess;
  }
}