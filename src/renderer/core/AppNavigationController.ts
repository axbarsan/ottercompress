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

  public setActiveIndex = (index: number): Promise<void> => {
    return new Promise((resolve: () => void) => {
      this.activeIndex = index;

      this.elements.forEach((elem: HTMLElement, elemIndex: number): void => {
        if (elemIndex === index) {
          elem.classList.add(this.activeClass);
          this.setTransitionDelay(elem, this.animationDuration);

          setTimeout(() => {
            resolve();
          }, this.animationDuration);
        } else {
          elem.classList.remove(this.activeClass);
          this.setTransitionDelay(elem, 0);
        }
      });
    });
  }

  public next = async (): Promise<void> => {
    if (this.activeIndex < (this.elements.length - 1))
      await this.setActiveIndex(this.activeIndex + 1);
  }

  public prev = async (): Promise<void> => {
    if (this.activeIndex > 0)
      await this.setActiveIndex(this.activeIndex - 1);
  }

  public reset = async (): Promise<void> => {
    await this.setActiveIndex(0);
  }

  protected setTransitionDelay(element: HTMLElement, amount: number): void {
    element.style.transitionDelay = `${amount}ms`;
  }
}

const navController: AppNavigationController = new AppNavigationController();

export default navController;
