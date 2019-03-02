import { ImageTypes } from "../controllers/ImageFilesController";
import { IImageProcessorSettings, IImageFormatSettings } from "../ImageProcessor";
import ImageResolution from "../ImageResolution";
import ResolutionInput from "./ResolutionInput";
import SliderInput from "./SliderInput";

type SaveListener = (
  e: Event,
  jpegQuality: number,
  pngQuality: number,
  width: number | null,
  height: number | null
) => void;

export default class ImageSettings {
  protected activeClass: string = "active";

  protected parentSelector: string = ".image-process__settings";
  protected parentElement: HTMLElement | null = null;

  protected toggleSelector: string = ".image-process__settings__toggle";
  protected toggleElement: HTMLElement | null = null;

  protected saveSelector: string = "#save";
  protected saveElement: HTMLElement | null = null;

  protected jpegQualitySlider: SliderInput | null = null;
  protected pngQualitySlider: SliderInput | null = null;
  protected widthInput: ResolutionInput | null = null;
  protected heightInput: ResolutionInput | null = null;

  public processSettings: IImageProcessorSettings[] | null = null;
  public resolutionForResizing: ImageResolution = new ImageResolution(null, null);

  constructor() {
    window.addEventListener("DOMContentLoaded", () => {
      this.parentElement = document.querySelector(this.parentSelector);
      this.toggleElement = document.querySelector(this.toggleSelector);
      this.saveElement = document.querySelector(this.saveSelector);

      if (this.toggleElement !== null)
        this.toggleElement.addEventListener("click", this.toggleSettingsPanel.bind(this, true));

      this.onSave(this.saveBehaviour.bind(this));

      this.jpegQualitySlider = new SliderInput("#jpeg-quality");
      this.pngQualitySlider = new SliderInput("#png-quality");
      this.widthInput = new ResolutionInput("#width");
      this.heightInput = new ResolutionInput("#height");
    });
  }

  protected toggleSettingsPanel = (isOn: boolean): void => {
    if (this.parentElement === null)
      return;

    if (isOn)
      this.parentElement.classList.add(this.activeClass);
    else
      this.parentElement.classList.remove(this.activeClass);
  }

  public onSave(callback: SaveListener): void {
    if (this.saveElement !== null)
      this.saveElement.addEventListener("click", (e: Event): void => {
        const paramsToPass: Array<string | null> = [
          this.jpegQualitySlider !== null ? this.jpegQualitySlider.getValue() : "1",
          this.pngQualitySlider !== null ? this.pngQualitySlider.getValue() : "1",
          this.widthInput !== null ? this.widthInput.getValue() : null,
          this.heightInput !== null ? this.heightInput.getValue() : null
        ];

        const normalizedParams: Array<number | null> = paramsToPass.map((value: string | null): number | null => {
          return (value !== null) ? parseInt(value, 10) : null;
        });

        // @ts-ignore
        callback(e, ...normalizedParams);
      });
  }

  public setValues(
    jpegQuality?: number | null,
    pngQuality?: number | null,
    widthInput?: number | null,
    heightInput?: number | null,
  ): void {
    if (jpegQuality !== undefined && this.jpegQualitySlider !== null)
      this.jpegQualitySlider.setValue(jpegQuality as string | null);

    if (pngQuality !== undefined && this.pngQualitySlider !== null)
      this.pngQualitySlider.setValue(pngQuality as string | null);

    if (widthInput !== undefined && this.widthInput !== null)
      this.widthInput.setValue(widthInput as string | null);

    if (heightInput !== undefined && this.heightInput !== null)
      this.heightInput.setValue(heightInput as string | null);
  }

  public reset(): void {
    this.resolutionForResizing.reset();
    this.setValues(undefined, undefined, null, null);
    this.setValuesFromProcessingSettings();
  }

  public getSettingsForType(type: ImageTypes): IImageFormatSettings {
    const settingsWithTypeIndex: number | null = this.getSettingsIndexForType(type);

    if (this.processSettings !== null && settingsWithTypeIndex !== null)
      return this.processSettings[settingsWithTypeIndex].settings;

    return {};
  }

  public getSettingsIndexForType(type: ImageTypes): number | null {
    if (this.processSettings !== null) {
      const chosenSettings: IImageProcessorSettings[] =
        this.processSettings.filter((settings: IImageProcessorSettings) => settings.format === type);

      if (chosenSettings.length > 0)
        return this.processSettings.indexOf(chosenSettings[0]);
    }

    return null;
  }

  public setValuesFromProcessingSettings(): void {
    const settingsForJPEG: IImageFormatSettings = this.getSettingsForType(ImageTypes.JPEG);
    const settingsForPNG: IImageFormatSettings = this.getSettingsForType(ImageTypes.PNG);

    this.setValues(settingsForJPEG.quality, settingsForPNG.quality);
  }

  protected saveBehaviour(
    e: Event,
    jpegQuality: number,
    pngQuality: number,
    width: number | null,
    height: number | null
  ): void {
    if (this.processSettings !== null) {
      const jpegSettingsIndex: number | null = this.getSettingsIndexForType(ImageTypes.JPEG);
      const pngSettingsIndex: number | null = this.getSettingsIndexForType(ImageTypes.PNG);

      if (jpegSettingsIndex !== null)
        this.processSettings[jpegSettingsIndex].settings.quality = jpegQuality;

      if (pngSettingsIndex !== null)
        this.processSettings[pngSettingsIndex].settings.quality = pngQuality;
    }
    this.resolutionForResizing.width = width;
    this.resolutionForResizing.height = height;
    this.toggleSettingsPanel(false);
  }
}
