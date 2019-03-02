import GenericInput from "../../core/GenericInput";

export default class ResolutionInput extends GenericInput<number | null> {
  protected nullValue: string = "auto";

  protected changeBehaviour(e: Event): void {
    let valueToSet: number = NaN;

    if (this.realValue !== "")
      valueToSet = parseInt(this.realValue, 10);

    if (isNaN(valueToSet))
      this.setValue(0);
    else
      this.setValue(valueToSet);
  }

  public setValue(value: number | null): void {
    if (this.element === null)
      return;

    let valueToSet: string = this.nullValue;

    if (value !== null && value > 0)
      valueToSet = String(value);

    this.setInputValue(valueToSet);
  }

  public getValue(): number | null {
    const valueAsNumber: number = parseInt(this.realValue, 10);

    if (!isNaN(valueAsNumber))
      return valueAsNumber;

    return null;
  }

  public resetValue(): void {
    this.setValue(0);
  }
}
