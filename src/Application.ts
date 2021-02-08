import { Camera } from "./Camera";
import { Canvas } from "./Canvas";
import { Geometric } from "./Hittable/Geometric";
import { RayTracer } from "./RayTracer"
import { Color } from "./BasicTypes/Color"
import { resolve } from "core-js/fn/promise";
// import { action, autorun, makeObservable, observable } from "mobx";
export class Application {
    public samplesPerPixel = 100;
    public maxDepth = 50;
    public numWorkers = 10;

    private rayTracer: RayTracer
    constructor(private canvas: Canvas, private camera: Camera, private world: Geometric) {
        this.rayTracer = new RayTracer();
        // makeObservable(this, {
        //     setSamplesPerPixel: action,
        //     run: action,
        //     samplesPerPixel: observable,
        //     maxDepth: observable
        // })
        // autorun(() => { this.run(), console.log(this.samplesPerPixel) }, { delay: 1000 })
    }

    public setSamplesPerPixel(val: number) {
        this.samplesPerPixel = val;
    }

    public async run() {
        console.log(`Starting run with ${this.samplesPerPixel}`)
        this.canvas.clear()

        const t0 = performance.now();
        const height = this.canvas.height;
        const width = this.canvas.width;

        //Handle non multiples of group size
        let chunks = this.chunk(height, width);

        //Trace
        // let pixels = chunks.map(chunk => this.rayTracer.trace(chunk, width, height, this.world, this.camera, this.samplesPerPixel, this.maxDepth));
        const workers = []
        let count = 0;
        let promise = new Promise((resolve) => {

            for(let i =0; i < this.numWorkers; i++) {
                const worker = new Worker('worker.ts');
                worker.onmessage = (e: MessageEvent) => {
                    console.log(`get message from worker ${i}`)
                    this.draw2(e.data);
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

       


        // Draw results
        // let promises = this.draw(pixels);
        // await Promise.all(promises)
        await promise;
        const t1 = performance.now();
        console.log(`took ${t1 - t0} milliseconds`)
        console.profileEnd();
    }
    private draw2(groupsOfPixels: { x: number; y: number; color: Color }[]) {
        for (let res of groupsOfPixels) {
            this.canvas.draw(res.x, res.y, res.color.x, res.color.y, res.color.z, this.samplesPerPixel);
        }

    }


    private draw(groupsOfPixels: Promise<{ x: number; y: number; color: Color }[]>[]) {
        return groupsOfPixels.map(result => result.then(colors => {
            for (let res of colors) {
                this.canvas.draw(res.x, res.y, res.color.r, res.color.g, res.color.b, this.samplesPerPixel);
            }
        }));
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