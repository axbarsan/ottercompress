import { ImageTypes } from "../controllers/ImageFilesController";
import { IImageProcessorSettings } from "../ImageProcessor";

export interface IConfigStructure {
  parentPath: string | null;
  targetPath: string | null;
  processSettings: IImageProcessorSettings[];
}

/**
 * Controller used for persisting config files between sessions
 * At the moment using local storage for persisting
 */
export default class ConfigController {
  /**
   * The key used to save the config in localStorage
   */
  protected static readonly configKey: string = "config";

  /**
   * Config loaded if no config is found
   */
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

  /**
   * Add options to config
   * @param options
   */
  protected static addConfigOptions(options: Partial<IConfigStructure>): void {
    ConfigController.config = {
      ...ConfigController.config,
      ...options
    };
  }

  /**
   * Load config from storage or set the default one is none is found
   */
  public static load(): IConfigStructure {
    const configContents: string | null = localStorage.getItem(ConfigController.configKey);

    if (configContents !== null)
      ConfigController.config = JSON.parse(configContents) as IConfigStructure;
    else
      ConfigController.config = ConfigController.defaultConfig;

    return ConfigController.config;
  }

  /**
   * Save config in storage
   */
  protected static save(): void {
    localStorage.setItem(ConfigController.configKey, JSON.stringify(ConfigController.config));
  }

  /**
   * Add options to config and then save them
   * @param options
   */
  public static persist(options: Partial<IConfigStructure>): void {
    ConfigController.addConfigOptions(options);
    ConfigController.save();
  }
}
