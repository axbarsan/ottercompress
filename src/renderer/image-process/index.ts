import ImageDialogController from "./controllers/ImageDialogController";
import ImagePicker from "./ImagePicker";
import FileDraggingController from "./controllers/FileDraggingController";
import ImageProcessEventHandler from "./ImageProcessEventHandler";

export default class ImageProcessRendererModule {
  public imagePicker: ImagePicker = new ImagePicker(this);
  public imageProcessEventHandler: ImageProcessEventHandler = new ImageProcessEventHandler(this);

  constructor() {
    window.addEventListener("DOMContentLoaded", () => {
      const parentFolderSelectBtn: HTMLDivElement | null = document.querySelector(".image-process__drop-zone");

      if (parentFolderSelectBtn !== null) {
        parentFolderSelectBtn.addEventListener("click", () => {
          ImageDialogController.showParentFolderDialog(this.imageProcessEventHandler.sendEntryFolderEvent);
        });

        new FileDraggingController({
          element: parentFolderSelectBtn,
          activeClass: "active",
          isFolderOnly: true,
          dropCallback: (folders: FileList): void => {
            this.imageProcessEventHandler.sendEntryFolderEvent(folders[0].path);
          }
        });
      }

      const targetFolderSelectBtn: HTMLButtonElement | null = document.querySelector(".image-process__select--target button");
      if (targetFolderSelectBtn !== null) {
        targetFolderSelectBtn.addEventListener("click", () => {
          ImageDialogController.showTargetFolderDialog(this.imageProcessEventHandler.sendTargetFolderEvent);
        })
      }
    });
  }
}
