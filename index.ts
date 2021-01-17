import { Canvas } from "./Canvas"
import { Color } from "./Color"
import { Point3d } from "./Maths/Point3d";
import { Ray } from "./Maths/Ray";
import { Sphere } from "./hittable/Sphere";
import { Vec3d } from "./Maths/Vec3d";
import { HittablesList } from "./hittable/HittablesList";
import { Geometric } from "./hittable/Geometric";
import { Camera } from "./Camera";

const canvas = new Canvas("canvas")

//Build
const hittablesList = new HittablesList();
hittablesList.add(new Sphere(new Point3d(0, 0, -1), 0.5))
hittablesList.add(new Sphere(new Point3d(0, -100.5, -1), 100))

// Image
const aspectRatio = 16.0 / 9.0;
const width = canvas.width = 400
const height = canvas.height = width / aspectRatio;

const camera = new Camera();
const samplesPerPixel: number = 100;
const maxDepth = 10

function run() {
    const t0 = performance.now();
    for (let i = height - 1; i >= 0; i--) {
        for (let j = 0; j < width; j++) {
            let color = new Color(0, 0, 0)
            for (let n = 0; n < samplesPerPixel; n++) {
                let v = (i + Math.random()) / (height - 1);
                let u = (j + Math.random()) / (width - 1);
                
                const ray = camera.getRay(u, v);
                color = bgcolor(ray, hittablesList,maxDepth).add(color)
            }
            canvas.draw(j, height - i, color.r, color.g, color.b, samplesPerPixel)
        }
    }
    
    const t1 = performance.now();
console.log(`took ${t1 - t0 } milliseconds`)

}
// let xpos = 0
// let ypos = 0
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

function bgcolor(ray: Ray, world: Geometric, depth:number): Color {
    if(depth <= 0) {
        return new Color(0,0,0)
    }
    let hitRecord = world.hit(ray, 0, Number.POSITIVE_INFINITY);
    if (hitRecord) {
        // let n = hitRecord.normal.unit();
        // return new Color(n.x + 1, n.y + 1, n.z + 1).mult(0.5);

        let n = hitRecord.normal.unit();
        const target = hitRecord.point.add(hitRecord.normal).add(randomInUnitSphere());
        return bgcolor(new Ray(hitRecord.point, target.minus(hitRecord.point)), world, depth-1).mult(0.5)
        // return new Color(n.x + 1, n.y + 1, n.z + 1).mult(0.5);
    }
    else {
        if (ray.direction.x > -5 && ray.direction.x < 5) {
            if (ray.direction.y > -5 && ray.direction.y < 5) {
                // console.log(`ray ${JSON.stringify(ray.direction)}`)
                // console.log(`unit ${JSON.stringify(ray.direction.unit())}`);
                const unitVec: Vec3d = ray.direction.unit()
                const t = 0.5 * (unitVec.y + 1)
                return new Color(1, 1, 1).mult(1 - t).add(new Color(0.5, 0.7, 1).mult(t))
            }
        }

    }
}

function degrees_to_radians(degrees: number) {
    return degrees * Math.PI / 180.0;
}
function randomInUnitSphere() {
    while (true) {
        const point = Vec3d.randomInside(-1,1)
        if (point.lengthSquared >= 1) continue;
        return point;
    }
}
