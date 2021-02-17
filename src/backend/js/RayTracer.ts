import { Camera } from "../../frontend/Camera";
import { Color } from "../../shared/basics/Color"
import { Ray } from "../../shared/basics/Ray";
import { Vec3d } from "../../shared/basics/Vec3d";
import { Geometric } from "../../shared/hittable/Geometric";
export class RayTracer {

    public trace(pixels: number[], width: number, height: number, world:Geometric, camera:Camera, samplesPerPixel:number, maxDepth:number): Promise<{ x: number, y: number, color: Color }[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                let colors = this.getColor(pixels, height, width, world, camera, samplesPerPixel, maxDepth)
                resolve(colors);
            }, 1);
        })

    }

    private getColor(pixels: number[], height: number, width: number, world:Geometric, camera: Camera, samplesPerPixel: number, maxDepth:number): { x: number, y: number, color: Color }[] {
        const res: { x: number, y: number, color: Color }[] = []
        for (let i = 0; i < pixels.length; i++) {
            let x = pixels[i] % width;
            let y = Math.floor(pixels[i] / width)
            let color = new Color(0, 0, 0)
            for (let n = 0; n < samplesPerPixel; n++) {
                let v = (height - y + Math.random()) / (height - 1)
                let u = (x + Math.random()) / (width - 1)
                const ray = camera.getRay(u, v)
                color = this.rayColor(ray, world, maxDepth).add(color)
            }
            res.push({ color, x, y })
        }
        return res
    }

    private rayColor(ray: Ray, world: Geometric, depth: number): Color {
        if (depth <= 0) {
            return new Color(0,0,0)
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