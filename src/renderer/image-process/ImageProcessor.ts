import { ImageTypes } from "./controllers/ImageFilesController";
import Image from "./Image";

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
  protected static commonSettings: IImageFormatSettings = {
    progressive: true
  };

  public static async process(targetPath: string, image: Image, settings: IImageProcessorSettings[]): Promise<Image> {
    if (image.isProcessed)
      return image;

    const remote = require("electron").remote;
    const path = remote.require("path");
    const sharp = remote.require("sharp");

    const newFileName: string = `${image.filename}${image.extension}`;
    const targetFilePath: string = path.join(targetPath, newFileName);

    const sharpImage = await sharp(image.data);
    ImageProcessor.addProcessSettings(image, settings, sharpImage);

    await sharpImage.toFile(targetFilePath);
    image.isProcessed = true;

    return image;
  }

  public static addProcessSettings(image: Image, settings: IImageProcessorSettings[], imgProcess: any): void {
    settings.map((options: IImageProcessorSettings): void => {
      options.settings = {
        ...ImageProcessor.commonSettings,
        ...options.settings
      };
    });

    switch (image.type) {
      case ImageTypes.JPEG:
        imgProcess.jpeg(ImageProcessor.getSettingsByType(settings, image.type, {
          chromaSubsampling: "4:4:4"
        }));
        break;
      case ImageTypes.PNG:
        imgProcess.png(ImageProcessor.getSettingsByType(settings, image.type));
        break;
    }
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
        ...ImageProcessor.commonSettings,
        ...selectedSettings[0].settings
      };

      return selectedSettings[0].settings;
    }

    return ImageProcessor.commonSettings;
  }
}
