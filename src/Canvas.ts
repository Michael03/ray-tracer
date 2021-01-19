export class Canvas {
    private ctx: CanvasRenderingContext2D
    private canvas: HTMLCanvasElement;
    constructor(id: string) {
        const canvas = document.getElementById(id) as HTMLCanvasElement
        if (!canvas) throw Error(`no canvas found with ${id}`);
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw Error("No contect found");
        this.ctx = ctx;
    }

    public draw(x: number, y: number, r: number, g: number, b: number, sampleSize: number): void {
        const scale = 1 / sampleSize

        r = Math.sqrt(scale * r);
        g = Math.sqrt(scale * g);
        b = Math.sqrt(scale * b);

        this.ctx.fillStyle = "rgba(" + 256*this.clamp(r, 0.0, 0.999)  + "," + 256*this.clamp(g, 0.0, 0.999)  + "," + 256*this.clamp(b, 0.0, 0.999)  + ",255)";
        this.ctx.fillRect(x, y, 1, 1);
    }

    get width() {
        return this.canvas.width
    }

    set width(val: number) {
        this.canvas.width = val
    }

    get height() {
        return this.canvas.height
    }
    set height(val: number) {
        this.canvas.height = val
    }

    private clamp(num: number, min: number, max: number): number {
        if (num < min) return min
        if (num > max) return max
        return num
    }
}