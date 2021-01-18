import { Canvas } from "./Canvas"
import { Color } from "./Color"
import { Point3d } from "./Maths/Point3d";
import { Ray } from "./Maths/Ray";
import { Sphere } from "./Hittable/Sphere";
import { Vec3d } from "./Maths/Vec3d";
import { HittablesList } from "./Hittable/HittablesList";
import { Geometric } from "./Hittable/Geometric";
import { Camera } from "./Camera";
import { Lambertian } from "./Material/Lambertian";
import { Metal } from "./Material/Metal";
import {BallsReflection} from "./Scenes"
const canvas = new Canvas("canvas")

//Build
let a = new BallsReflection()
const world = a.build();

// Image
const aspectRatio = 16.0 / 9.0;
const width = canvas.width = 400
const height = canvas.height = width / aspectRatio;

const camera = new Camera();
const samplesPerPixel: number = 100;
const maxDepth = 50

function run() {
    const t0 = performance.now();
    for (let i = height - 1; i >= 0; i--) {
    for (let j = 0; j < width; j++) {
    // for (let i = height - 165; i >= 60; i--) {
        // for (let j = 280; j < 290; j++) {
            let color = new Color(0, 0, 0)
            for (let n = 0; n < samplesPerPixel; n++) {
                let v = (i + Math.random()) / (height - 1);
                let u = (j + Math.random()) / (width - 1);
                const ray = camera.getRay(u, v);
                color = rayColor(ray, world, maxDepth).add(color)
            }
            // console.log("draw ", color)
            canvas.draw(j, height - i, color.r, color.g, color.b, samplesPerPixel)
            // console.log(color);
            // return;
        }
    }

    const t1 = performance.now();
    console.log(`took ${t1 - t0} milliseconds`)

}
// let xpos = 0
// let ypos = 0
let count = 0;
const act = () => {
    // xpos += 0.2;
    // ypos += 0.5;
    // sphere.center.x += Math.cos(xpos) * 0.2
    // sphere.center.y += Math.cos(ypos) * 0.1
    run()
    // if (runs-- > 0) {
    // setTimeout(act,1)
    // } 
}
act()

function rayColor(ray: Ray, world: Geometric, depth: number): Color {
    if (depth <= 0) {
        return new Color(0, 0, 0)
    }

    let hitRecord = world.hit(ray, 0.001, Number.POSITIVE_INFINITY);
    if (hitRecord) {
        const [scatter, color, boo] = hitRecord.matterial.scatter(ray, hitRecord)
        if (boo) {
            return color.mult(rayColor(scatter, world, depth - 1))
        }
        return new Color(0, 0, 0);
        // const target = hitRecord.point.add(hitRecord.normal).add(randomUnitVector());
        // return rayColor(new Ray(hitRecord.point, target.minus(hitRecord.point)), world, depth - 1).mult(0.5)
    } else {
        const unitVec: Vec3d = ray.direction.unit()
        const t = 0.5 * (unitVec.y + 1)
        return new Color(1, 1, 1).mult(1 - t).add(new Color(0.5, 0.7, 1).mult(t))

    }
}

