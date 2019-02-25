import ImageDialog from "./controllers/ImageDialogController";
import ImagePickerController from "./controllers/ImagePickerController";
import FileDraggingController from "./controllers/FileDraggingController";

export default class ImageProcessRendererModule {
  protected imagePickerController: ImagePickerController = new ImagePickerController();

  constructor() {
    window.addEventListener("DOMContentLoaded", () => {
      const parentFolderSelectBtn: HTMLDivElement | null = document.querySelector(".image-process__drop-zone");

      if (parentFolderSelectBtn !== null) {
        parentFolderSelectBtn.addEventListener("click", () => {
          ImageDialog.showParentFolderDialog();
        });

        new FileDraggingController({
          element: parentFolderSelectBtn,
          activeClass: "active",
          isFolderOnly: true,
          dropCallback: (folders: FileList) => {
            ImageDialog.sendEntryFolderEvent(folders[0].path);
          }
        });
      }

      const targetFolderSelectBtn: HTMLButtonElement | null = document.querySelector(".image-process__select--target button");
      if (targetFolderSelectBtn !== null) {
        targetFolderSelectBtn.addEventListener("click", () => {
          ImageDialog.showTargetFolderDialog();
        })
      }
    });
  }
}
