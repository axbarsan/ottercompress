import ImageProcessModule from "./image-process/";

/**
 * Electron main renderer
 */
class Renderer {
  public imageProcessModule: ImageProcessModule = new ImageProcessModule();
}

const renderer: Renderer = new Renderer();

export default renderer;
