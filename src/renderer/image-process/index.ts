import ImageDialog from "./controllers/ImageDialogController";
import ImagePickerController from "./controllers/ImagePickerController";
import ImageProcessController from "./controllers/ImageProcessController";

export default class ImageProcessRendererModule {
  protected imagePickerController: ImagePickerController = new ImagePickerController();

  constructor() {
    window.addEventListener("DOMContentLoaded", () => {
      const parentFolderSelectBtn: HTMLButtonElement | null = document.querySelector(".image-process__select--parent button");
      if (parentFolderSelectBtn !== null) {
        parentFolderSelectBtn.addEventListener("click", () => {
          ImageDialog.showParentFolderDialog();
        })
      }

      const targetFolderSelectBtn: HTMLButtonElement | null = document.querySelector(".image-process__select--target button");
      if (targetFolderSelectBtn !== null) {
        targetFolderSelectBtn.addEventListener("click", () => {
          ImageDialog.showTargetFolderDialog();
        })
      }

      const imageProcessButton: HTMLButtonElement | null = document.querySelector(".image-process__action button");
      if (imageProcessButton !== null) {
        imageProcessButton.addEventListener("click", () => {
          ImageProcessController.handleQueue();
        })
      }
    });
  }
}
