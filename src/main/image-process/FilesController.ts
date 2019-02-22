export default class FilesController {
  public static readonly extensions = ["jpg", "jpeg", "png", "gif", "bmp"];

  public static getImagesInFolder(folderPath: string): string[] {
    const fs = require("fs");
    const path = require("path");
    const files: string[] = [];

    fs.readdirSync(folderPath).forEach((file: any) => {
      const filename = path.join(folderPath, file);
      const stat = fs.lstatSync(filename);

      if (stat.isDirectory()) {
        this.getImagesInFolder(filename);
      }
      else if (FilesController.fileHasValidExtension(filename)) {
        files.push(filename);
      };
    });

    return files;
  }

  public static fileHasValidExtension(filePath: string): boolean {
    const fileExtension: string = FilesController.getFileExtension(filePath);

    return (FilesController.extensions.indexOf(fileExtension) !== -1);
  }

  public static getFileName(filePath: string): string {
    const fileName: string | undefined = filePath.split(".").shift();

    if (fileName !== undefined)
      return fileName;

    return "";
  }

  public static getFileExtension(filePath: string): string {
    const fileName: string | undefined = filePath.split(".").pop();

    if (fileName !== undefined)
      return fileName;

    return "";
  }
}
