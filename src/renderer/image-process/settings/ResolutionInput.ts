import Input from "../../core/Input";

export default class ResolutionInput extends Input {
  protected nullValue: string = "auto";

  constructor(
    protected selector: string,
    protected defaultValue?: string | null
  ) {
    super(selector);

    if (defaultValue !== undefined)
      this.setValue(defaultValue);
    else
      this.setValue(null);
  }

  protected changeBehaviour(e: Event): void {
    let valueToSet: number = NaN;
    const currentValue: string | null = (e.target as HTMLInputElement).value;

    if (currentValue !== "")
      valueToSet = parseInt(currentValue, 10);

    if (isNaN(valueToSet))
      this.setValue(null);
    else
      this.setValue(String(valueToSet));
  }

  public setValue(value: string | null): void {
    if (this.element === null)
      return;

    let valueToSet: string = this.nullValue;

    if (value !== null)
      valueToSet = value;

    this.element.value = valueToSet;
  }

  public getValue(): string | null {
    if (this.element !== null && this.element.value !== this.nullValue)
      return this.element.value;

    return null;
  }
}
