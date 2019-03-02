export default class Input {
  protected element: HTMLInputElement | null = null;

  constructor(
    protected selector: string,
    protected defaultValue?: string | null
  ) {
    this.element = document.querySelector(selector);
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

  public setValue(value: string | null): void {
    if (this.element !== null) {
      let valueToSet: string = "";

      if (value !== null)
        valueToSet = value;

      this.element.value = valueToSet;
    }
  }

  public getValue(): string | null {
    let valueToReturn: string | null = null;

    if (this.element !== null && this.element.value !== "")
      valueToReturn = this.element.value;

    return valueToReturn;
  }

  public resetValue(): void {
    this.setValue(null);
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
