/**
 * App navigation controller used for navigating between screens
 */
class AppNavigationController {
  protected elements: HTMLElement[] = [];
  protected activeIndex: number = 0;
  protected activeClass: string = "active";
  protected htmlLoadedClass: string = "loaded";
  protected screenSelector: string = ".app__screen";
  protected readonly animationDuration: number = 500; // In ms

  constructor() {
    window.addEventListener("DOMContentLoaded", () => {
      const elements: NodeListOf<Element> = document.querySelectorAll(this.screenSelector);

      for (const elem of Array.from(elements)) {
        this.elements.push(elem as HTMLElement);

        (elem as HTMLElement).style.transitionDuration = `${this.animationDuration}ms`;
        (elem as HTMLElement).style.transitionTimingFunction = `cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
      }

      this.reset();
    });

    window.addEventListener("load", () => {
      document.documentElement.classList.add(this.htmlLoadedClass);
    });
  }

  /**
   * Set desired active screen index
   */
  public setActiveIndex = (index: number): Promise<void> => {
    return new Promise((resolve: () => void) => {
      this.activeIndex = index;

      this.elements.forEach((elem: HTMLElement, elemIndex: number): void => {
        if (elemIndex === index) {
          this.setTransitionDelay(elem, this.animationDuration);
          elem.classList.add(this.activeClass);
        } else {
          this.setTransitionDelay(elem, 0);
          elem.classList.remove(this.activeClass);
        }

        setTimeout(resolve, this.animationDuration * 2.2);
      });
    });
  }

  /**
   * Go to next screen
   */
  public next = async (): Promise<void> => {
    if (this.activeIndex < (this.elements.length - 1))
      await this.setActiveIndex(this.activeIndex + 1);
  }

  /**
   * Go to previous screen
   */
  public prev = async (): Promise<void> => {
    if (this.activeIndex > 0)
      await this.setActiveIndex(this.activeIndex - 1);
  }

  /**
   * Go to first screen
   */
  public reset = async (): Promise<void> => {
    await this.setActiveIndex(0);
  }

  /**
   * Set element transition delay
   * @param element element as HTMLElement
   * @param amount in ms
   */
  protected setTransitionDelay(element: HTMLElement, amount: number): void {
    element.style.transitionDelay = `${amount}ms`;
  }
}

const navController: AppNavigationController = new AppNavigationController();

export default navController;
