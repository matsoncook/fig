export default interface Loader {
  draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void;
}