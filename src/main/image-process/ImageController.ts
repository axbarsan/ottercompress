import Image from "./Image";

export default class ImageController {
  protected _originalImage: Image;
  protected processedImage: Buffer | null = null;
  protected _isProcessed: boolean = false;

  constructor(public readonly originalImagePath: string) {
    this._originalImage = new Image(originalImagePath);
  }

  public get originalImage() {
    return this._originalImage;
  }

  public get isProcessed(): boolean {
    return this._isProcessed;
  }

  public async process(): Promise<ImageController> {
    return new Promise ((resolve: Function): void => {
      resolve(this);
      this._isProcessed = true;
    });
  }
}
