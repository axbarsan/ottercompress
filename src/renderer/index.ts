import ImageProcessRenderer from "./image-process/";

export default class Renderer {
  public imageProcessRenderer: ImageProcessRenderer | null = null;

  constructor() {
    this.imageProcessRenderer = new ImageProcessRenderer();
  }
}

export const currentRenderer: Renderer = new Renderer();