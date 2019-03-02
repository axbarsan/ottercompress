export default class ImageResolution {
  constructor(
    public width: number | null,
    public height: number | null) { }

  public reset(): void {
    this.width = null;
    this.height = null;
  }
}
