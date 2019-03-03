import { Stats } from "fs";
import { ParsedPath } from "path";
import FilesController from "../../core/FilesController";
import Image from "../Image";

export enum ImageTypes {
  JPEG = "jpeg",
  PNG = "png"
}

export const ImageFormats = {
  [ImageTypes.JPEG]: [".jpg", ".jpeg"],
  [ImageTypes.PNG]: [".png"]
};

export default class ImageFilesController extends FilesController {
  public static async getImagesInFolder(folderPath: string): Promise<Image[]> {
    const remote = require("electron").remote;
    const fs = remote.require("fs").promises;
    const path = remote.require("path");

    const images: Image[] = [];
    const imagesPaths: string[] = await fs.readdir(folderPath);

    for (const file of imagesPaths) {
      const filePath: string = path.join(folderPath, file);
      const parsedPath: ParsedPath = path.parse(filePath);

      if (ImageFilesController.isExtensionValid(parsedPath.ext)) {
        const imageData: Buffer = await fs.readFile(filePath);
        const stats: Stats = await fs.lstat(filePath);

        images.push(new Image(
          filePath,
          ImageFilesController.getImageTypeByExtension(parsedPath.ext),
          parsedPath.name,
          parsedPath.dir,
          parsedPath.ext,
          stats.size,
          imageData
        ));
      }
    }

    return images;
  }

  public static isExtensionValid(extension: string): boolean {
    let isValid: boolean = false;

    for (const ext of Object.values(ImageFormats)) {
      if (ext.indexOf(extension) !== -1)
        isValid = true;
    }

    return isValid;
  }

  public static getImageTypeByExtension(extension: string): ImageTypes {
    for (const format of Object.entries(ImageFormats)) {
      if (format[1].indexOf(extension) !== -1)
        return format[0] as ImageTypes;
    }

    return ImageTypes.JPEG;
  }
}
