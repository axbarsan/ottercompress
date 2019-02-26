import IImageData from "../../interfaces/IImageData";
import FilesController from "./controllers/FilesController";

export default class Image {
  protected _isRead: boolean = false;
  protected fileData: IImageData | null = null;

  constructor(protected path: string) {
    const fs = require("fs");

    const data: Buffer | null = fs.readFileSync(this.path);

    if (data !== null) {
      const stat = fs.lstatSync(this.path);

      this.fileData = {
        location: FilesController.getFileLocation(this.path),
        filename: FilesController.getFileName(this.path),
        extension: FilesController.getFileExtension(this.path),
        size: stat.size,
        data
      };

      this._isRead = true;
    }
  }

  public get isRead(): boolean {
    return this._isRead;
  }

  public get getPath(): string {
    return this.path;
  }

  public get imageData(): IImageData | null {
    return this.fileData;
  }
}
