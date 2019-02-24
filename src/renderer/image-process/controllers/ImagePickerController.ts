import IImageData from "../../../interfaces/IImageData";

export default class ImagePickerController {
  protected static readonly images: IImageData[] = [];

  constructor() {
    ImagePickerController.handleEvents();
  }

  public static handleEvents() {
    const { ipcRenderer } = require("electron");

    ipcRenderer.on("imgproc:queue:image-added", (evt: Electron.IpcMessageEvent, imageData: IImageData) => {
      ImagePickerController.images.push(imageData);
      ImagePickerController.appendToHTML(imageData);
    });

    ipcRenderer.on("imgproc:queue:clear", (evt: Electron.IpcMessageEvent) => {
      ImagePickerController.images.length = 0;
      ImagePickerController.clearHTML();
    });
  }

  public static appendToHTML(imageData: IImageData): void {
    const fileListParent: HTMLDivElement | null = document.querySelector(".image-process__filelist");
    let parent: HTMLDivElement;

    if (fileListParent === null)
      return;

    const lastElement: Element | null = fileListParent.lastElementChild;

    if (lastElement === null) {
      parent = document.createElement("div");
      parent.className = "image-process__filelist__file";
      fileListParent.appendChild(parent);
    } else {
      const lastElemClone: Node = lastElement.cloneNode(false);
      fileListParent.appendChild(lastElemClone);
      parent = fileListParent.lastElementChild as HTMLDivElement;
    }

    const convertedImage: string = imageData.data.toString("base64");

    const imgElement: HTMLImageElement = document.createElement("img");
    imgElement.src = `data:image/jpeg;base64,${convertedImage}`;

    parent.appendChild(imgElement);
  }

  public static clearHTML(): void {
    const fileListParent: HTMLDivElement | null = document.querySelector(".image-process__filelist");

    if (fileListParent === null)
      return;

    while (fileListParent.firstChild) {
      fileListParent.removeChild(fileListParent.firstChild);
    }
  }
}
