export default class Image {
  protected _processedData: Buffer | null = null;
  protected _isProcessed: boolean = false;

  constructor(
    public readonly path: string,
    public readonly filename: string,
    public readonly location: string,
    public readonly extension: string,
    public readonly size: number,
    public readonly data: Buffer
  ) { }

  public get isProcessed(): boolean {
    return this._isProcessed;
  }

  public set processedData(data: Buffer | null) {
    this._processedData = data;
    this._isProcessed = true;
  }
}
