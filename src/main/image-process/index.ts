import SessionController from "./controllers/SessionController";

export default class ImageProcessModule {
  protected sessionController: SessionController = new SessionController();

  constructor() {
    SessionController.setUpFileSelectEvents();
    SessionController.clearQueue();
  }
}
