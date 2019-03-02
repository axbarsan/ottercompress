export default class GenericInput<ValueType> {
  protected element: HTMLInputElement | null = null;
  protected realValue: string = "";

  constructor(protected selector: string) {
    this.element = document.querySelector(selector);

    if (this.element !== null)
      this.setRealValue(this.element.value);

    this.onInput((e: Event): void => {
      this.setRealValue((e.target as HTMLInputElement).value);
    });

    this.onChange(this.changeBehaviour.bind(this));
    this.onInput(this.inputBehaviour.bind(this));
    this.onFocus(this.focusBehaviour.bind(this));
  }

  public onFocus(callback: EventListener): void {
    if (this.element !== null)
      this.element.addEventListener("focus", callback);
  }

  public onInput(callback: EventListener): void {
    if (this.element !== null)
      this.element.addEventListener("input", callback);
  }

  public onChange(callback: EventListener): void {
    if (this.element !== null)
      this.element.addEventListener("change", callback);
  }

  public setValue(value: ValueType): void {
    this.setInputValue(String(value));
  }

  public setInputValue(value: string): void {
    if (this.element !== null) {
      this.element.value = value;
      this.setRealValue(value);
    }
  }

  public getValue(): ValueType {
    return (this.realValue as any) as ValueType;
  }

  public resetValue(): void {
    this.setValue(("" as any) as ValueType);
  }

  public setRealValue(value: string): void {
    this.realValue = value;
  }

  protected changeBehaviour(e: Event): void {
    // Override this to add default behaviour
  }

  protected inputBehaviour(e: Event): void {
    // Override this to add default behaviour
  }

  protected focusBehaviour(e: Event): void {
    // Override this to add default behaviour
  }
}
