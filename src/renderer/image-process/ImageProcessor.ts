import { ImageTypes } from "./controllers/ImageFilesController";
import Image from "./Image";
import ImageResolution from "./ImageResolution";

export interface IImageFormatSettings {
  progressive?: boolean;
  quality?: number;
  chromaSubsampling?: string;
}

export interface IImageProcessorSettings {
  format: ImageTypes;
  settings: IImageFormatSettings;
}

export default class ImageProcessor {
  public static async process(
    targetPath: string, image: Image, resizeResolution: ImageResolution, settings: IImageProcessorSettings[]
  ): Promise<Image> {
    if (image.isProcessed)
      return image;

    const remote = require("electron").remote;
    const path = remote.require("path");
    const sharp = remote.require("sharp");

    const newFileName: string = `${image.filename}${image.extension}`;
    const targetFilePath: string = path.join(targetPath, newFileName);

    const sharpImage = await sharp(image.data);
    ImageProcessor.addProcessSettings(image, settings, sharpImage);
    ImageProcessor.setResizeResolution(resizeResolution, sharpImage);

    console.log(resizeResolution);

    await sharpImage.toFile(targetFilePath);
    image.isProcessed = true;

    return image;
  }

  public static addProcessSettings(image: Image, settings: IImageProcessorSettings[], imgProcess: any): void {
    switch (image.type) {
      case ImageTypes.JPEG:
        imgProcess.jpeg(ImageProcessor.getSettingsByType(settings, image.type));
        break;
      case ImageTypes.PNG:
        imgProcess.png(ImageProcessor.getSettingsByType(settings, image.type));
        break;
    }
  }

  public static setResizeResolution(resolution: ImageResolution, imgProcess: any): void {
    const { width, height } = resolution;

    if (width === null && height === null)
      return;

    imgProcess.resize(width, height, {
      fit: "inside",
      withoutEnlargement: true
    });
  }

  public static getSettingsByType(
    settings: IImageProcessorSettings[], type: ImageTypes, additionalOptions?: IImageFormatSettings
  ): IImageFormatSettings {
    const selectedSettings: IImageProcessorSettings[] = settings.filter((options: IImageProcessorSettings): boolean => {
      return (options.format === type);
    });

    if (selectedSettings.length > 0) {
      selectedSettings[0].settings = {
        ...additionalOptions,
        ...selectedSettings[0].settings
      };

      console.log(selectedSettings[0].settings);

      return selectedSettings[0].settings;
    }

    return {};
  }
}
