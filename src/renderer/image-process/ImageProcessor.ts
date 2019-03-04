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

/**
 * Controller used for handling image processing
 * Currently using the `sharp` native module
 */
export default class ImageProcessor {
  /**
   * Process image
   * @param targetPath folder path to save file
   * @param image
   * @param resizeResolution
   * @param settings
   */
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
    ImageProcessor.addProcessSettings(image.type, settings, sharpImage);
    ImageProcessor.setResizeResolution(resizeResolution, sharpImage);

    await sharpImage.toFile(targetFilePath);
    image.isProcessed = true;

    return image;
  }

  /**
   * Add image processing settings for the current type
   * @param type
   * @param settings
   * @param imgProcess sharp current image processing object
   */
  public static addProcessSettings(type: ImageTypes, settings: IImageProcessorSettings[], imgProcess: any): void {
    switch (type) {
      case ImageTypes.JPEG:
        imgProcess.jpeg(ImageProcessor.getSettingsByType(settings, type));
        break;
      case ImageTypes.PNG:
        imgProcess.png(ImageProcessor.getSettingsByType(settings, type));
        break;
    }
  }

  /**
   * Set resize resolution
   * @param resolution resolution object
   * @param imgProcess sharp current image processing object
   */
  public static setResizeResolution(resolution: ImageResolution, imgProcess: any): void {
    const { width, height } = resolution;

    if (width === null && height === null)
      return;

    imgProcess.resize(width, height, {
      fit: "inside",
      withoutEnlargement: true
    });
  }

  /**
   * Get settings for image type
   * @param settings all settings
   * @param type image type
   * @param additionalOptions any additional options to add
   */
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

      return selectedSettings[0].settings;
    }

    return {};
  }
}
