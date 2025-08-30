
export type Rect = { x: number; y: number; w: number; h: number };
export interface PlaceOpts {
    padding?: number;     // extra gap to keep between rectangles (and outer edges)
    maxAttempts?: number; // how many random tries before giving up
    integer?: boolean;    // snap x/y to integers
}
export default class RectanglePlacement {
    
    obstacles: Rect[] = [];

    constructor(public outer: Rect,public w: number,public h: number,public sx: number,public sy: number)
    {

    }

    addRectangle(rect : Rect)
    {
        rect.x += this.sx;
        rect.y += this.sy;
        this.obstacles.push(rect);

    }
    removeRectangle(rect : Rect)
    {
        

        const index = this.obstacles.indexOf(rect);
        if (index !== -1) {
            this.obstacles.splice(index, 1);
        }
    }

    randomPlace()
    {
        let newRect = this.randomPlaceRect(
            this.outer,
            this.obstacles,
            this.w,
            this.h,
        );
        if(newRect)
        {
            newRect.x -= this.sx;
            newRect.y -= this.sy;
        }
        return newRect;
    }
    /** Returns true if a and b overlap (treating touching edges as overlap when pad > 0). */
    rectsOverlap(a: Rect, b: Rect, pad = 0): boolean {
        return !(
            a.x + a.w <= b.x - pad ||
            b.x + b.w <= a.x - pad ||
            a.y + a.h <= b.y - pad ||
            b.y + b.h <= a.y - pad
        );
    }

    /** Uniform random in [min, max] */
    rand(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * Try to place a rectangle of size (w,h) randomly inside `outer`,
     * avoiding overlap with any `obstacles`. Returns the placed rect or null.
     */
    randomPlaceRect(
        outer: Rect,
        obstacles: Rect[],
        w: number,
        h: number,
        opts: PlaceOpts = {}
    ): Rect | null {
        const padding = opts.padding ?? 0;
        const maxAttempts = opts.maxAttempts ?? 1000;
        const integer = opts.integer ?? false;

        // Shrink the allowed area by the new rect size and padding so it stays inside.
        const minX = outer.x + padding;
        const minY = outer.y + padding;
        const maxX = outer.x + outer.w - w - padding;
        const maxY = outer.y + outer.h - h - padding;

        if (maxX < minX || maxY < minY) return null; // doesn't fit at all

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            let x = this.rand(minX, maxX);
            let y = this.rand(minY, maxY);
            if (integer) {
                // Ensure we still stay within bounds after snapping
                x = Math.min(Math.floor(x), maxX);
                y = Math.min(Math.floor(y), maxY);
            }

            const candidate: Rect = { x, y, w, h };

            // Check against all existing rectangles
            let ok = true;
            for (const r of obstacles) {
                if (this.rectsOverlap(candidate, r, padding)) {
                    ok = false;
                    break;
                }
            }

            if (ok) return candidate;
        }

        return null; // gave up after maxAttempts
    }

}