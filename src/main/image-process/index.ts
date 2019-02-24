import SessionController from "./controllers/SessionController";

export default class ImageProcessModule {
  protected sessionController: SessionController | null = null;

  constructor() {
    this.sessionController = new SessionController();
  }
}
