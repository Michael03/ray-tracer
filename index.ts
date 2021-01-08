import { Canvas } from "./Canvas"
import { Color } from "./Color"
import { Point3d } from "./Point3d";
import { Ray } from "./Ray";
import { Sphere } from "./Sphere";
import { Vec3d } from "./Vec3d";

const canvas = new Canvas("canvas")


//Build
const sphere = new Sphere(new Point3d(0,0,-1), 0.5);

// Image
const aspectRatio = 16.0 / 9.0;
const width = canvas.width = 400
const height = canvas.height = width / aspectRatio;

// camera
const viewportHeight = 2;
const viewportWidth = viewportHeight * aspectRatio
const focalLength = new Vec3d(0, 0, 1);

const origin = new Point3d(0, 0, 0);
const horizontal = new Vec3d(viewportWidth, 0, 0);
const vertical = new Vec3d(0, viewportHeight, 0);
const ray = new Ray(origin, new Vec3d(0, 0, -1))


const t0 = performance.now();
let lower_left_corner = origin.minus(horizontal.div(2)).minus(vertical.div(2)).minus(focalLength)
// console.log(lower_left_corner)
for (let i = height - 1; i >= 0; i--) {
    for (let j = 0; j < width; j++) {
        let color = new Color(0, 0.5, 1)
        let u = j / (width - 1);
        let v = i / (height - 1);
        ray.direction = lower_left_corner.add(horizontal.mult(u)).add(vertical.mult(v))
        color = bgcolor(ray, sphere)
        // }
        // }
        canvas.draw(j, height - i, color.r, color.g, color.b)
    }
}

function bgcolor(ray: Ray, sphere: Sphere): Color {
    let t = sphere.hit(ray);
    if(t > 0) {
        let n = ray.at(t).minus(sphere.center).unit();
        return new Color(n.x+1, n.y+1, n.z+1).mult(0.5);
    } else {
        // if (ray.direction.x > -5 &&ray.direction.x < 5 ) {
        // if (ray.direction.y > -5 &&ray.direction.y < 5 ) {
        // console.log(`ray ${JSON.stringify(ray.direction)}`)
        // console.log(`unit ${JSON.stringify(ray.direction.unit())}`);
        const unitVec: Vec3d = ray.direction.unit()
        const t = 0.5 * (unitVec.y + 1)
        return new Color(1, 1, 1).mult(1 - t).add(new Color(0.5, 0.7, 1).mult(t))
    
    }
}

const t1 = performance.now();
console.log(`took ${t1 - t0} milliseconds`)



