import { ImageTypes } from "../controllers/ImageFilesController";
import { IImageFormatSettings, IImageProcessorSettings } from "../ImageProcessor";
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
  protected transitionDuration: number = 500;

  protected parentSelector: string = ".image-process__settings";
  protected parentElement: HTMLElement | null = null;

  protected drawerSelector: string = ".image-process__settings__options";
  protected drawerElement: HTMLElement | null = null;

  protected toggleSelector: string = ".image-process__settings__toggle";
  protected toggleElement: HTMLElement | null = null;

  protected overlaySelector: string = ".image-process__settings__overlay";
  protected overlayElement: HTMLElement | null = null;

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
      this.drawerElement = document.querySelector(this.drawerSelector);
      this.toggleElement = document.querySelector(this.toggleSelector);
      this.overlayElement = document.querySelector(this.overlaySelector);
      this.saveElement = document.querySelector(this.saveSelector);

      if (this.drawerElement !== null)
        this.drawerElement.style.transition = `${this.transitionDuration}ms cubic-bezier(0.645, 0.045, 0.355, 1)`;

      if (this.overlayElement !== null) {
        this.overlayElement.style.transition = `${this.transitionDuration}ms ease-out`;
        this.overlayElement.addEventListener("click", this.cancelBehaviour.bind(this));
      }

      if (this.toggleElement !== null)
        this.toggleElement.addEventListener("click", this.toggleSettingsPanel.bind(this, true));

      this.onSave(this.saveBehaviour.bind(this));

      this.jpegQualitySlider = new SliderInput("#jpeg-quality");
      this.pngQualitySlider = new SliderInput("#png-quality");
      this.widthInput = new ResolutionInput("#width");
      this.heightInput = new ResolutionInput("#height");
    });
  }

  protected toggleSettingsPanel = (isOn: boolean): Promise<void> => {
    return new Promise((resolve: () => void): void => {
      if (this.parentElement === null)
        return;

      if (isOn)
        this.parentElement.classList.add(this.activeClass);
      else
        this.parentElement.classList.remove(this.activeClass);

      setTimeout(resolve, this.transitionDuration * 1.2);
    });
  }

  public onSave(callback: SaveListener): void {
    if (this.saveElement !== null)
      this.saveElement.addEventListener("click", (e: Event): void => {
        const paramsToPass: Array<number | null> = [
          this.jpegQualitySlider !== null ? this.jpegQualitySlider.getValue() : 1,
          this.pngQualitySlider !== null ? this.pngQualitySlider.getValue() : 1,
          this.widthInput !== null ? this.widthInput.getValue() : 1,
          this.heightInput !== null ? this.heightInput.getValue() : 1
        ];

        // @ts-ignore
        callback(e, ...paramsToPass);
      });
  }

  public setValues(
    jpegQuality?: number,
    pngQuality?: number,
    widthInput?: number | null,
    heightInput?: number | null,
  ): void {
    if (jpegQuality !== undefined && this.jpegQualitySlider !== null)
      this.jpegQualitySlider.setValue(jpegQuality);

    if (pngQuality !== undefined && this.pngQualitySlider !== null)
      this.pngQualitySlider.setValue(pngQuality);

    if (widthInput !== undefined && this.widthInput !== null)
      this.widthInput.setValue(widthInput);

    if (heightInput !== undefined && this.heightInput !== null)
      this.heightInput.setValue(heightInput);
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

  protected async cancelBehaviour(): Promise<void> {
    await this.toggleSettingsPanel(false);
    this.reset();
  }
}
