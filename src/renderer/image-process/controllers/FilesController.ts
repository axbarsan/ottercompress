import { Stats } from "fs";
import { ParsedPath } from "path";
import Image from "../Image";

export default class FilesController {
  public static readonly allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];

  public static async getImagesInFolder(folderPath: string): Promise<Image[]> {
    const remote = require("electron").remote;
    const fs = remote.require("fs").promises;
    const path = remote.require("path");

    const images: Image[] = [];
    const imagesPaths: string[] = await fs.readdir(folderPath);

    for (const file of imagesPaths) {
      const filePath: string = path.join(folderPath, file);
      const parsedPath: ParsedPath = path.parse(filePath);

      if (FilesController.isExtensionValid(parsedPath.ext)) {
        const imageData: Buffer = await fs.readFile(filePath);
        const stats: Stats = await fs.lstat(filePath);

        images.push(new Image(
          filePath,
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
    return (FilesController.allowedExtensions.indexOf(extension) !== -1);
  }

  public static getFileExtension(filePath: string): string {
    const path = require("electron").remote.require("path");

    return path.parse(filePath).ext;
  }

  public static getFileName(filePath: string): string {
    const path = require("electron").remote.require("path");

    return path.parse(filePath).name;
  }

  public static getFileLocation(filePath: string): string {
    const path = require("electron").remote.require("path");

    return path.parse(filePath).dir;
  }
}
