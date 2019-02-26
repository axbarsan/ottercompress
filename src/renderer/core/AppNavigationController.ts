class AppNavigationController {
  protected elements: HTMLElement[] = [];
  protected activeIndex: number = 0;
  protected activeClass: string = "active";
  protected htmlLoadedClass: string = "loaded";
  protected screenSelector: string = ".app__screen";

  constructor() {
    window.addEventListener("DOMContentLoaded", () => {
      const elements: NodeListOf<Element> = document.querySelectorAll(this.screenSelector);

      for (const elem of Array.from(elements))
        this.elements.push(elem as HTMLElement);

      this.reset();
    });

    window.addEventListener("load", () => {
      document.documentElement.classList.add(this.htmlLoadedClass);
    });
  }

  public setActiveIndex = (index: number): void => {
    this.activeIndex = index;

    this.elements.forEach((elem: HTMLElement, elemIndex: number): void => {
      if (elemIndex === index)
        elem.classList.add(this.activeClass);
      else
        elem.classList.remove(this.activeClass);
    });
  }

  public next = (): void => {
    if (this.activeIndex < (this.elements.length - 1))
      this.setActiveIndex(this.activeIndex + 1);
  }

  public prev = (): void => {
    if (this.activeIndex > 0)
      this.setActiveIndex(this.activeIndex - 1);
  }

  public reset = (): void => {
    this.setActiveIndex(0);
  }
}

const navController: AppNavigationController = new AppNavigationController();

export default navController;
