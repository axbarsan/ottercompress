import { Stats } from "fs";
import { ParsedPath } from "path";
import FilesController from "../../core/FilesController";
import Image from "../Image";

/**
 * Supported image types
 */
export enum ImageTypes {
  JPEG = "jpeg",
  PNG = "png"
}

/**
 * Supported image formats
 */
export const ImageFormats = {
  [ImageTypes.JPEG]: [".jpg", ".jpeg"],
  [ImageTypes.PNG]: [".png"]
};

/**
 * Controller used for handling image files
 */
export default class ImageFilesController extends FilesController {
  /**
   * Get all images with the supported formats in a folder
   * @param folderPath
   */
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

  /**
   * Is extension supported
   * @param extension
   */
  public static isExtensionValid(extension: string): boolean {
    let isValid: boolean = false;

    for (const ext of Object.values(ImageFormats)) {
      if (ext.indexOf(extension) !== -1)
        isValid = true;
    }

    return isValid;
  }

  /**
   * Get image object type by extension
   * @param extension
   */
  public static getImageTypeByExtension(extension: string): ImageTypes {
    for (const format of Object.entries(ImageFormats)) {
      if (format[1].indexOf(extension) !== -1)
        return format[0] as ImageTypes;
    }

    return ImageTypes.JPEG;
  }
}
