export default class ImageProcessController {
  public static handleQueue(): void {
    const { ipcRenderer } = require("electron");

    ipcRenderer.send("imgproc:queue:start");
  }
}
