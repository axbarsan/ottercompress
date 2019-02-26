import ImageProcessModule from "./image-process/";

class Renderer {
  public imageProcessModule: ImageProcessModule = new ImageProcessModule();
}

const renderer: Renderer = new Renderer();

export default renderer;
