import Image from "../datatypes/Image";

export default class ImageController {
  protected _originalImage: Image;
  protected _processedImage: Buffer | null = null;
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

  public get processedImage(): Buffer | null {
    return this._processedImage;
  }

  public set processedImage(value: Buffer | null) {
    this._processedImage = value;
    this._isProcessed = true;
  }
}
