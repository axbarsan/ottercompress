import { ImageTypes } from "../controllers/ImageFilesController";
import { IImageProcessorSettings } from "../ImageProcessor";

export interface IConfigStructure {
  parentPath: string | null;
  targetPath: string | null;
  processSettings: IImageProcessorSettings[];
}

export default class ConfigController {
  protected static readonly configKey: string = "config";

  protected static readonly defaultConfig: IConfigStructure = {
    parentPath: null,
    targetPath: null,
    processSettings: [
      {
        format: ImageTypes.JPEG,
        settings: {
          progressive: true,
          chromaSubsampling: "4:4:4",
          quality: 80
        }
      },
      {
        format: ImageTypes.PNG,
        settings: {
          progressive: true,
          quality: 80
        }
      }
    ]
  };
  protected static config: IConfigStructure = ConfigController.defaultConfig;

  protected static addConfigOptions(options: Partial<IConfigStructure>): void {
    ConfigController.config = {
      ...ConfigController.config,
      ...options
    };
  }

  public static load(): IConfigStructure {
    const configContents: string | null = localStorage.getItem(ConfigController.configKey);

    if (configContents !== null)
      ConfigController.config = JSON.parse(configContents) as IConfigStructure;
    else
      ConfigController.config = ConfigController.defaultConfig;

    return ConfigController.config;
  }

  protected static save(): void {
    localStorage.setItem(ConfigController.configKey, JSON.stringify(ConfigController.config));
  }

  public static persist(options: Partial<IConfigStructure>): void {
    ConfigController.addConfigOptions(options);
    ConfigController.save();
  }
}
