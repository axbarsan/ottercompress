import ImageDialog from "./image-process/ImageDialogController";
import ImagePickerController from "./image-process/ImagePickerController";
import ImageProcessController from "./image-process/ImageProcessController";

export const imagePickerController: ImagePickerController = new ImagePickerController();

window.addEventListener("DOMContentLoaded", () => {
  const parentFolderSelectBtn: HTMLButtonElement | null = document.querySelector(".image-process__select--parent button");
  if (parentFolderSelectBtn !== null) {
    parentFolderSelectBtn.addEventListener("click", () => {
      ImageDialog.showOpenDialog();
    })
  }

  const targetFolderSelectBtn: HTMLButtonElement | null = document.querySelector(".image-process__select--target button");
  if (targetFolderSelectBtn !== null) {
    targetFolderSelectBtn.addEventListener("click", () => {
      ImageDialog.showOpenDialog(false);
    })
  }

  const imageProcessButton: HTMLButtonElement | null = document.querySelector(".image-process__action button");
  if (imageProcessButton !== null) {
    imageProcessButton.addEventListener("click", () => {
      ImageProcessController.handleQueue();
    })
  }
});
