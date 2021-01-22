import { Camera } from "./Camera";
import { Canvas } from "./Canvas";
import { Color } from "./BasicTypes/Color"
import { Ray } from "./BasicTypes/Ray";
import { Vec3d } from "./BasicTypes/Vec3d";
import { Geometric } from "./Hittable/Geometric";
import { action, autorun, makeObservable, observable } from "mobx";
export class RayTracer {
    public samplesPerPixel = 20;
    public maxDepth = 50;
    constructor(private canvas: Canvas, private camera: Camera, private world: Geometric) {
        makeObservable(this, {
            setSamplesPerPixel: action,
            run: action,
            samplesPerPixel: observable,
            maxDepth: observable
        })
        autorun(() => {this.run(), console.log(this.samplesPerPixel)},{delay:1000})
    }

    public setSamplesPerPixel(val: number) {
        this.samplesPerPixel = val;
    }

    public run() {
            console.log(`Starting run with ${this.samplesPerPixel}`)
            const t0 = performance.now();
            const height = this.canvas.height;
            const width = this.canvas.width;
    
            for (let i = height - 1; i >= 0; i--) {
                for (let j = 0; j < width; j++) {
                    let color = new Color(0, 0, 0)
                    for (let n = 0; n < this.samplesPerPixel; n++) {
                        let v = (i + Math.random()) / (height - 1);
                        let u = (j + Math.random()) / (width - 1);
                        const ray = this.camera.getRay(u, v);
                        color = this.rayColor(ray, this.world, this.maxDepth).add(color)
                    }
                    this.canvas.draw(j, height - i, color.r, color.g, color.b, this.samplesPerPixel)
                }
            }
    
            const t1 = performance.now();
            console.log(`took ${t1 - t0} milliseconds`)
    }

    private rayColor(ray: Ray, world: Geometric, depth: number): Color {
        if (depth <= 0) {
            return new Color(0, 0, 0)
        }

        let hitRecord = world.hit(ray, 0.001, Number.POSITIVE_INFINITY);
        if (hitRecord) {
            const [scatter, color, boo] = hitRecord.matterial.scatter(ray, hitRecord)
            if (boo) {
                return color.mult(this.rayColor(scatter, world, depth - 1))
            }
            return new Color(0, 0, 0);
        } else {
            const unitVec: Vec3d = ray.direction.unit()
            const t = 0.5 * (unitVec.y + 1)
            return new Color(1, 1, 1).mult(1 - t).add(new Color(0.5, 0.7, 1).mult(t))
        }
    }
}