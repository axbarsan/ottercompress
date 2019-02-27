import * as path from "path";
import { ImageTypes } from "../controllers/ImageFilesController";
import { IImageProcessorSettings } from "../ImageProcessor";

export interface IConfigStructure {
  parentPath: string | null;
  targetPath: string | null;
  processSettings: IImageProcessorSettings[];
}

export default class ConfigController {
  public static readonly location: string = path.resolve(__dirname, "../", "config", "config.json");

  protected static defaultConfig: IConfigStructure = {
    parentPath: null,
    targetPath: null,
    processSettings: [
      {
        format: ImageTypes.JPEG,
        settings: {
          quality: 80
        }
      },
      {
        format: ImageTypes.PNG,
        settings: {
          quality: 80
        }
      }
    ]
  };
  protected static config: IConfigStructure = ConfigController.defaultConfig;

  public static set configOptions(config: IConfigStructure) {
    ConfigController.config = config;
  }

  public static loadFile(): IConfigStructure {
    const remote = require("electron").remote;
    const fs = remote.require("fs");

    try {
      const configContents: Buffer = fs.readFileSync(ConfigController.location);
      ConfigController.config = JSON.parse(configContents.toString()) as IConfigStructure;
    } catch (err) {
      ConfigController.config = ConfigController.defaultConfig;
    }

    return ConfigController.config;
  }

  public static async saveFile(): Promise<void> {
    const remote = require("electron").remote;
    const fs = remote.require("fs").promises;

    try {
      const configAsData: Buffer = Buffer.from(JSON.stringify(ConfigController.config));
      await fs.writeFile(ConfigController.location, configAsData);
    } catch (err) {
      // Error writing the file
    }
  }
}
