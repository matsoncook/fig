// Assuming these helper types and functions exist
type Point2d = { x: number; y: number };
type Bounds2d = { x: number; y: number; sizeX: number; sizeY: number; set2?: (x: number, y: number) => void };

declare function createPoint2d(x: number, y: number): Point2d;
declare function createBounds2(x: number, y: number): Bounds2d;
declare function cloneBounds(bounds: Bounds2d): Bounds2d;
declare function clonePoint2d(p: Point2d): Point2d;

export class ViewPort {
    //worldBounds: Bounds2d;
    //viewPortWorldMagnification: Point2d;
    viewPortWorldPosition: Point2d;
    viewPortBounds: Bounds2d;
    viewPortCanvasMagnification: Point2d;
    viewPortCanvasPosition: Point2d;
    canvasViewPortMagnification: Point2d;
    canvasBounds: Bounds2d;
    canvasPosition?: Point2d;

    static construct7()
    {
        return new ViewPort(undefined,createPoint2d(1, 1));
    }

    constructor(
        private worldBounds : Bounds2d = createBounds2(10, 10),
        private viewPortWorldMagnification: Point2d = createPoint2d(1, 1)
    ) {
        //this.worldBounds = createBounds2(10, 10);
        //this.viewPortWorldMagnification = createPoint2d(0, 0);
        this.viewPortWorldPosition = createPoint2d(0, 0);
        this.viewPortBounds = createBounds2(1, 1);
        this.viewPortCanvasMagnification = createPoint2d(1, 1);
        this.viewPortCanvasPosition = createPoint2d(0, 0);
        this.canvasViewPortMagnification = createPoint2d(1, 1);
        this.canvasBounds = createBounds2(200, 150);
    }

    viewPortToCanvasX(viewPortX: number): number {
        return (viewPortX * this.viewPortCanvasMagnification.x) + this.viewPortCanvasPosition.x;
    }

    viewPortToCanvasY(viewPortY: number): number {
        return this.viewPortCanvasPosition.y - (viewPortY * this.viewPortCanvasMagnification.y);
    }

    canvasToViewPortX(canvasX: number): number {
        return (canvasX - this.viewPortCanvasPosition.x) / this.viewPortCanvasMagnification.x;
    }

    canvasToViewPortY(canvasY: number): number {
        return (canvasY - this.viewPortCanvasPosition.y) / (-this.viewPortCanvasMagnification.y);
    }

    viewPortToWorldX(viewPortX: number): number {
        return (viewPortX * this.viewPortWorldMagnification.x) + this.viewPortWorldPosition.x;
    }

    viewPortToWorldY(viewPortY: number): number {
        return (viewPortY * this.viewPortWorldMagnification.y) + this.viewPortWorldPosition.y;
    }

    worldToViewPortX(worldX: number): number {
        return (worldX - this.viewPortWorldPosition.x) / this.viewPortWorldMagnification.x;
    }

    worldToViewPortY(worldY: number): number {
        return (worldY - this.viewPortWorldPosition.y) / this.viewPortWorldMagnification.y;
    }

    worldToCanvasX(worldX: number): number {
        return this.viewPortToCanvasX(this.worldToViewPortX(worldX));
    }

    worldToCanvasY(worldY: number): number {
        return this.viewPortToCanvasY(this.worldToViewPortY(worldY));
    }

    setViewPortBoundsByRatio(widthHeightRatio: number): void {
        if (widthHeightRatio < 1) {
            const width = 1;
            const height = widthHeightRatio;
            this.canvasViewPortMagnification = createPoint2d(width, height);
        } else {
            const width = 1;
            const height = widthHeightRatio;
            this.viewPortBounds.set2?.(width, height);
        }
    }

    setViewPortCanvasRatios(): void {
        this.viewPortCanvasMagnification.x = this.canvasBounds.x / this.viewPortBounds.x;
        this.viewPortCanvasMagnification.y = this.canvasBounds.y / this.viewPortBounds.y;
    }

    // Add other conversion methods here (e.g. to/from sizes and points)...

    // Factory-like static constructors
    static fromParams7(...args: ConstructorParameters<typeof ViewPort>): ViewPort {
        const vp = new ViewPort();
        // Assign the arguments accordingly
        // This function could be fleshed out like createViewPort7
        return vp;
    }

    static clone(pviewPort: ViewPort): ViewPort {
        const vp = new ViewPort();
        vp.worldBounds = cloneBounds(pviewPort.worldBounds);
        vp.viewPortBounds = cloneBounds(pviewPort.viewPortBounds);
        vp.viewPortWorldPosition = clonePoint2d(pviewPort.viewPortWorldPosition);
        vp.canvasViewPortMagnification = clonePoint2d(pviewPort.canvasViewPortMagnification);
        vp.canvasBounds = cloneBounds(pviewPort.canvasBounds);
        vp.canvasPosition = clonePoint2d(pviewPort.canvasPosition!);
        return vp;
    }
}
