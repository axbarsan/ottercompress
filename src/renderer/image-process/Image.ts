import { ImageTypes } from "./controllers/ImageFilesController";

export default class Image {
  public isProcessed: boolean = false;

  constructor(
    public readonly path: string,
    public readonly type: ImageTypes,
    public readonly filename: string,
    public readonly location: string,
    public readonly extension: string,
    public readonly size: number,
    public readonly data: Buffer
  ) { }
}
