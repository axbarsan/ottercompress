/**
 * Controller used for handling files
 */
export default class FilesController {
  /**
   * Get file extension
   * @param filePath
   */
  public static getFileExtension(filePath: string): string {
    const path = require("electron").remote.require("path");

    return path.parse(filePath).ext;
  }

  /**
   * Get file name
   * @param filePath
   */
  public static getFileName(filePath: string): string {
    const path = require("electron").remote.require("path");

    return path.parse(filePath).name;
  }

  /**
   * Get file location
   * @param filePath
   */
  public static getFileLocation(filePath: string): string {
    const path = require("electron").remote.require("path");

    return path.parse(filePath).dir;
  }
}
