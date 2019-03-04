/**
 * Generic form input
 */
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

  /**
   * Add focus event listener
   * @param callback
   */
  public onFocus(callback: EventListener): void {
    if (this.element !== null)
      this.element.addEventListener("focus", callback);
  }

  /**
   * Add input event listener
   * @param callback
   */
  public onInput(callback: EventListener): void {
    if (this.element !== null)
      this.element.addEventListener("input", callback);
  }

  /**
   * Add change event listener
   * @param callback
   */
  public onChange(callback: EventListener): void {
    if (this.element !== null)
      this.element.addEventListener("change", callback);
  }

  /**
   * Set object value
   * @param value
   */
  public setValue(value: ValueType): void {
    this.setInputValue(String(value));
  }

  /**
   * Set inner input value
   * @param value
   */
  public setInputValue(value: string): void {
    if (this.element !== null) {
      this.element.value = value;
      this.setRealValue(value);
    }
  }

  /**
   * Get inner input value
   */
  public getValue(): ValueType {
    return (this.realValue as any) as ValueType;
  }

  /**
   * Reset to default value
   */
  public resetValue(): void {
    this.setValue(("" as any) as ValueType);
  }

  /**
   * Set inner state input value
   * @param value
   */
  public setRealValue(value: string): void {
    this.realValue = value;
  }

  /**
   * Default change event listener callback
   * @param e
   */
  protected changeBehaviour(e: Event): void {
    // Override this to add default behaviour
  }

  /**
   * Default input event listener callback
   * @param e
   */
  protected inputBehaviour(e: Event): void {
    // Override this to add default behaviour
  }

  /**
   * Default focus event listener callback
   * @param e
   */
  protected focusBehaviour(e: Event): void {
    // Override this to add default behaviour
  }
}
