import ImageController from "./ImageController";
import IImageData from "../../../interfaces/IImageData";
import * as Jimp from "jimp";

export default class ImageProcessorController {
  public static targetPath: string | null = null;

  public static async process(imageController: ImageController): Promise<ImageController> {
    if (imageController.isProcessed)
      return imageController;

    const path = require("path");
    const imageData: IImageData | null = imageController.originalImage.imageData;

    if (imageData === null || ImageProcessorController.targetPath === null)
      throw new Error("Image not read correctly");

    const newFileName: string = `${imageData.filename}${imageData.extension}`;
    const targetPath: string = path.join(ImageProcessorController.targetPath, newFileName);

    const image: Jimp = await Jimp.read(imageData.data);
    ImageProcessorController.addProcessSettings(image);

    const imgData: Buffer = await image.getBufferAsync(image.getMIME());
    imageController.processedImage = imgData;

    return image.writeAsync(targetPath)
      .then(() => {
        return imageController;
      });
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
        console.log("is png");
        break;
    }
  }
}
