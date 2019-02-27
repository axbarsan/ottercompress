import Image from "./Image";

export default class ImageProcessor {
  public static async process(targetPath: string, image: Image): Promise<Image> {
    if (image.isProcessed)
      return image;

    const remote = require("electron").remote;
    const path = remote.require("path");
    const sharp = remote.require("sharp");

    const newFileName: string = `${image.filename}${image.extension}`;
    const targetFilePath: string = path.join(targetPath, newFileName);

    const sharpImage = await sharp(image.data);
    // ImageProcessor.addProcessSettings(sharpImage, image.extension);
    await sharpImage.toFile(targetFilePath);

    return image;
  }

  public static addProcessSettings(imgProcess: any, extension: string): void {
    switch (extension) {
      case ".jpg":
      case ".jpeg":
        imgProcess.jpeg({
          quality: 50,
          chromaSubsampling: "4:4:4"
        });
        break;
      case ".png":
        imgProcess.png({
          quality: 50
        });
        break;
    }
  }
}
