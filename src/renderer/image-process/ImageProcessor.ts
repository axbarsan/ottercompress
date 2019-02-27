import * as Jimp from "jimp";
import Image from "./Image";

export default class ImageProcessor {
  public static async process(targetPath: string, image: Image): Promise<Image> {
    if (image.isProcessed)
      return image;

    const path = require("electron").remote.require("path");
    const jimpModule = require("electron").remote.require("jimp");

    const newFileName: string = `${image.filename}${image.extension}`;
    const targetFilePath: string = path.join(targetPath, newFileName);

    const jimpImage: Jimp = await jimpModule.read(image.data);
    ImageProcessor.addProcessSettings(jimpImage);
    image.processedData = await jimpImage.getBufferAsync(jimpImage.getMIME());
    await jimpImage.writeAsync(targetFilePath);

    return image;
  }

  public static addProcessSettings(image: Jimp): void {
    const mimeType: string = image.getMIME();

    switch (mimeType) {
      case Jimp.MIME_JPEG:
        image.quality(60);
        break;
      case Jimp.MIME_PNG:
        image.deflateLevel(9);
        image.filterType(Jimp.PNG_FILTER_PATH);
        image.deflateStrategy(3);
        break;
    }
  }
}
