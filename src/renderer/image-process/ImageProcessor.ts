import Image from "./Image";

class ImageProcessor {
  public static async process(targetPath: string, image: Image): Promise<Image> {
    if (image.isProcessed)
      return image;

    const path = require("electron").remote.require("path");
    const sharpModule = require("sharp");

    const newFileName: string = `${image.filename}${image.extension}`;
    const targetFilePath: string = path.join(targetPath, newFileName);

    const sharpImage = sharpModule(image.data);
    // ImageProcessor.addProcessSettings(jimpImage);
    image.processedData = await sharpImage.toBuffer();
    await sharpImage.toFile(targetFilePath);

    return image;
  }

  public static addProcessSettings(): void {
    // const mimeType: string = image.getMIME();

    // switch (mimeType) {
    //   case Jimp.MIME_JPEG:
    //     image.quality(60);
    //     break;
    //   case Jimp.MIME_PNG:
    //     image.deflateLevel(9);
    //     image.filterType(Jimp.PNG_FILTER_PATH);
    //     image.deflateStrategy(3);
    //     break;
    // }
  }
}

module.exports = {
  process: ImageProcessor.process
};
