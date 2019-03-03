interface IFileDraggingControllerConfig {
  element: HTMLElement;
  activeClass: string;
  isFolderOnly: boolean;
  dropCallback: (files: FileList) => void;
}

export default class FileDraggingController {
  constructor(protected config: IFileDraggingControllerConfig) {
    this.addEvents();
  }

  protected addEvents(): void {
    this.config.element.ondragover = this.setActiveToggle.bind(this, true);
    this.config.element.ondragenter = this.setActiveToggle.bind(this, true);
    this.config.element.ondragleave = this.setActiveToggle.bind(this, false);

    this.config.element.ondrop = (e: DragEvent) => {
      e.preventDefault();

      if (e.dataTransfer !== null) {
        if (this.config.isFolderOnly && e.dataTransfer.files[0].type !== "")
          return false;

        this.config.dropCallback(e.dataTransfer.files);
      }

      this.setActiveToggle.call(this, false);

      return false;
    };
  }

  protected setActiveToggle(on: boolean): boolean {
    if (on)
      this.config.element.classList.add(this.config.activeClass);
    else
      this.config.element.classList.remove(this.config.activeClass);

    return false;
  }
}
