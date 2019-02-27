import Image from "./Image";

export default class ImagePicker {
  protected fileListSelector: string = ".image-process__filelist";
  protected fileListParent: HTMLElement | null = null;
  protected counterSelector: string = ".image-process__counter__label";
  protected counterElement: HTMLElement | null = null;
  protected targetBrowserSelector: string = ".image-process__select--target";
  protected targetBrowserElement: HTMLElement | null = null;
  protected resultSelector: string = ".image-process__loading__progress--result";
  protected resultElement: HTMLElement | null = null;

  constructor() {
    window.addEventListener("DOMContentLoaded", () => {
      this.fileListParent = document.querySelector(this.fileListSelector);
      this.counterElement = document.querySelector(this.counterSelector);
      this.targetBrowserElement = document.querySelector(this.targetBrowserSelector);
      this.resultElement = document.querySelector(this.resultSelector);
    });
  }

  protected generateImageHTML(image: Image): void {
    if (this.fileListParent === null)
      return;

    const convertedImage: string = image.data.toString("base64");
    const wrapperElement: HTMLDivElement = document.createElement("div");
    wrapperElement.className = "image-process__filelist__file";

    const imgElement: HTMLImageElement = document.createElement("img");
    imgElement.src = `data:image/jpeg;base64,${convertedImage}`;

    imgElement.addEventListener("load", () => {
      imgElement.classList.add("loaded");
    });

    wrapperElement.appendChild(imgElement);
    this.fileListParent.appendChild(wrapperElement);
  }

  public updateCounter(count: number): void {
    if (this.counterElement === null)
      return;

    this.counterElement.textContent = String(count);
  }

  public setTargetBrowserVisibleState(isOn: boolean): void {
    if (this.targetBrowserElement === null)
      return;

    if (isOn)
      this.targetBrowserElement.classList.add("active");
    else
      this.targetBrowserElement.classList.remove("active");
  }

  public clearHTML(): void {
    if (this.fileListParent === null || this.resultElement === null)
      return;

    while (this.fileListParent.firstChild) {
      this.fileListParent.removeChild(this.fileListParent.firstChild);
    }

    this.resultElement.classList.remove("success", "fail");
  }

  public addImage(image: Image): void {
    this.generateImageHTML(image);
  }

  public setSuccessful(isOn: boolean): void {
    if (this.resultElement === null)
      return;

    if (isOn) {
      this.resultElement.classList.add("success");
      this.resultElement.classList.remove("fail");
    } else {
      this.resultElement.classList.add("fail");
      this.resultElement.classList.remove("success");
    }
  }
}
