import FileDraggingController from "./controllers/FileDraggingController";
import ImageDialogController from "./controllers/ImageDialogController";
import SessionController from "./controllers/SessionController";

export default class ImageProcessRendererModule {
  constructor() {
    SessionController.clearQueue();

    window.addEventListener("DOMContentLoaded", () => {
      const parentFolderSelectBtn: HTMLDivElement | null = document.querySelector(".image-process__drop-zone");

      if (parentFolderSelectBtn !== null) {
        parentFolderSelectBtn.addEventListener("click", () => {
          ImageDialogController.showParentFolderDialog(SessionController.setParentFolder);
        });

        const parentFolderDragging: FileDraggingController = new FileDraggingController({
          element: parentFolderSelectBtn,
          activeClass: "active",
          isFolderOnly: true,
          dropCallback: (folders: FileList): void => {
            SessionController.setParentFolder(folders[0].path);
          }
        });
      }

      const targetFolderSelectBtn: HTMLButtonElement | null =
        document.querySelector(".image-process__select--target button");
      if (targetFolderSelectBtn !== null) {
        targetFolderSelectBtn.addEventListener("click", () => {
          ImageDialogController.showTargetFolderDialog(SessionController.setTargetFolder);
        });
      }

      const resetBtn: HTMLButtonElement | null = document.querySelector(".image-process__reset");
      if (resetBtn !== null)
        resetBtn.addEventListener("click", SessionController.clearQueue);
    });
  }
}
