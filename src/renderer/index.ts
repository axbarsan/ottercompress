import ImageProcessRenderer from "./image-process/";
import AppNavigationController from "./core/AppNavigationController";

export default class Renderer {
  public appNavController: AppNavigationController;
  public imageProcessRenderer: ImageProcessRenderer;

  constructor() {
    this.appNavController = new AppNavigationController();
    this.imageProcessRenderer = new ImageProcessRenderer();
  }
}

export const currentRenderer: Renderer = new Renderer();