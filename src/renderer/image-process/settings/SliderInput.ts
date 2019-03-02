import Input from "../../core/Input";

export default class SliderInput extends Input {
  protected labelElement: HTMLElement | null = null;
  protected parentElement: HTMLElement | null = null;

  constructor(
    protected selector: string,
    protected defaultValue?: string | null
  ) {
    super(`${selector} input`);

    this.labelElement = document.querySelector(`${selector} span`);
    this.parentElement = document.querySelector(`${selector}`);

    if (defaultValue !== undefined)
      this.setValue(defaultValue);
    else
      this.setValue(null);
  }

  protected inputBehaviour(e: Event): void {
    this.setLabel((e.target as HTMLInputElement).value);
  }

  protected setLabel(value: string): void {
    if (this.labelElement !== null)
      this.labelElement.textContent = `${value}%`;
  }

  public setValue(value: string | null): void {
    if (this.element === null)
      return;

    let valueToSet: string = this.element.min;

    if (value !== null)
      valueToSet = value;

    this.element.value = valueToSet;
    this.setLabel(valueToSet);
  }
}
