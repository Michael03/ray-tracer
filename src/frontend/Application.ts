import { Camera } from "./Camera";
import { Canvas } from "./Canvas";
import { Geometric } from "../shared/hittable/Geometric";
import { Color } from "../shared/basics/Color"
export class Application {
    public samplesPerPixel = 1;
    public maxDepth = 50;
    public numWorkers = 10;

    constructor(private canvas: Canvas, private camera: Camera, private world: Geometric) {
    }

    public setSamplesPerPixel(val: number) {
        this.samplesPerPixel = val;
    }


    public async run() {
        console.log(`Starting run with samples: ${this.samplesPerPixel}`)
        this.canvas.clear()

        const t0 = performance.now();
        const height = this.canvas.height;
        const width = this.canvas.width;

        //Handle non multiples of group size
        let chunks = this.chunk(height, width);

        //Trace
        const workers = []
        let count = 0;
        let work = new Promise((resolve) => {

            for(let i =0; i < this.numWorkers; i++) {
                const worker = new Worker('../backend/js/worker.ts');
                worker.onmessage = (e: MessageEvent) => {
                    console.log(`get message from worker ${i}`)
                    this.draw(e.data);
                    count = count +1;
                    if (count === chunks.length) {
                        console.log("woo")
                        resolve(true)
                    }
                }
                
                workers.push(worker)
            }
        });
        chunks.map((chunk,i) => {
            workers[i%this.numWorkers].postMessage({
                camera: this.camera.serialize(),
                world: this.world.serialize(),
                width,
                height,
                samplesPerPixel: this.samplesPerPixel,
                maxDepth: this.maxDepth,
                chunk
            });
        });


        await work;
        const t1 = performance.now();
        console.log(`took ${t1 - t0} milliseconds`)
        console.profileEnd();
    }
    private draw(groupsOfPixels: { x: number; y: number; color: Color }[]) {
        for (let pixel of groupsOfPixels) {
            this.canvas.draw(pixel.x, pixel.y, pixel.color.x, pixel.color.y, pixel.color.z, this.samplesPerPixel);
        }
    }

    private chunk(height: number, width: number) {
        const groupSize = 10000;
        let chunks: number[][] = [];
        for (let i = 0; i < height * width; i += groupSize) {
            let pixels = Array.from({ length: groupSize }, (_, k) => k + i);
            chunks.push(pixels);
        }
        return this.shuffle(chunks);
    }

    private shuffle<T>(arr: T[]): T[] {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let tmp = arr[i];
            arr[i] = arr[j]
            arr[j] = tmp;
        }
        return arr;
    }
}