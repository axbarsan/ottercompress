import * as path from "path";
import { ImageTypes } from "../controllers/ImageFilesController";
import { IImageProcessorSettings } from "../ImageProcessor";

export interface IConfigStructure {
  parentPath: string | null;
  targetPath: string | null;
  processSettings: IImageProcessorSettings[];
}

export default class ConfigController {
  protected static readonly location: string = path.resolve(__dirname, "../../../", "config", "config.json");

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

  public static addConfigOptions(options: Partial<IConfigStructure>): void {
    ConfigController.config = {
      ...ConfigController.config,
      ...options
    };
  }

  public static loadFile(): IConfigStructure {
    const remote = require("electron").remote;
    const fs = remote.require("fs");

    try {
      const configContents: Buffer = fs.readFileSync(ConfigController.location);
      ConfigController.config = JSON.parse(configContents.toString()) as IConfigStructure;
      console.log(ConfigController.config);
    } catch (err) {
      ConfigController.config = ConfigController.defaultConfig;
    }

    return ConfigController.config;
  }

  public static async saveFile(): Promise<void> {
    const remote = require("electron").remote;
    const fs = remote.require("fs").promises;

    try {
      const configAsData: Buffer = Buffer.from(JSON.stringify(ConfigController.config, null, 2));
      await fs.writeFile(ConfigController.location, configAsData);
    } catch (err) {
      // Error writing the file
    }
  }
}
