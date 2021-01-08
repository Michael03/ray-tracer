export class Canvas {
    private ctx : CanvasRenderingContext2D
    private canvas: HTMLCanvasElement;
    constructor(id: string) {
        const canvas = document.getElementById(id) as HTMLCanvasElement
        if (!canvas) throw Error(`no canvas found with ${id}`);
        this.canvas = canvas;
        const ctx = canvas.getContext('2d'); 
        if (!ctx) throw Error("No contect found");
        this.ctx = ctx;
    }

    public draw (x, y, r, g, b) {
        this.ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",255)";
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
}