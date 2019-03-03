import GenericInput from "../../core/GenericInput";

export default class SliderInput extends GenericInput<number> {
  protected labelElement: HTMLElement | null = null;
  protected parentElement: HTMLElement | null = null;

  constructor(protected selector: string) {
    super(`${selector} input`);

    this.labelElement = document.querySelector(`${selector} span`);
    this.parentElement = document.querySelector(`${selector}`);
  }

  protected inputBehaviour(e: Event): void {
    this.setLabel(this.getValue());
  }

  public getValue(): number {
    return parseInt(this.realValue, 10);
  }

  public setValue(value: number): void {
    if (this.element === null)
      return;

    let valueToSet: number = parseInt(this.element.min, 10);
    const maxValue: number = parseInt(this.element.max, 10);

    if (value > valueToSet && value <= maxValue)
      valueToSet = value;

    this.setLabel(valueToSet);
    this.setInputValue(String(valueToSet));
  }

  protected setLabel(value: number): void {
    if (this.labelElement !== null)
      this.labelElement.textContent = `${value}%`;
  }
}
