import IImageData from "../../interfaces/IImageData";
import ImageProcessRendererModule from "./";

export default class ImagePicker {
  public readonly images: IImageData[] = [];
  protected fileListSelector: string = ".image-process__filelist";
  protected fileListParent: HTMLElement | null = null;
  protected counterSelector: string = ".image-process__counter__label";
  protected counterElement: HTMLElement | null = null;

  constructor(protected controller: ImageProcessRendererModule) {
    window.addEventListener("DOMContentLoaded", () => {
      this.fileListParent = document.querySelector(this.fileListSelector);
      this.counterElement = document.querySelector(this.counterSelector);
    });
  }

  public generateImageHTML(imageData: IImageData): void {
    if (this.fileListParent === null)
      return;

    const convertedImage: string = imageData.data.toString("base64");
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

  public clearHTML(): void {
    if (this.fileListParent === null)
      return;

    while (this.fileListParent.firstChild) {
      this.fileListParent.removeChild(this.fileListParent.firstChild);
    }
  }

  public updateCounter(): void {
    if (this.counterElement === null)
      return;

    this.counterElement.textContent = String(this.images.length);
  }
}
