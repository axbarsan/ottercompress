export default class FilesController {
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
