import { Geometric } from "./Geometric";

import { Ray } from "./Ray"
import { Normal } from "./Normal"
import { Point3d } from "./Point3d"
import { Vec3d } from "./Vec3d";

export class Sphere extends Geometric {

    public center: Point3d
    private radius: number

    constructor(center: Point3d, radius: number) {
        super()
        this.center = center
        this.radius = radius
    }

    public hit(ray: Ray): number {
        // let tmin = Number.POSITIVE_INFINITY
        // let t;
        const oc: Vec3d = ray.origin.minus(this.center)
        let a: number = ray.direction.dot(ray.direction)
        let b: number = oc.mult(2.0).dot(ray.direction)
        let c: number = oc.dot(oc) - this.radius * this.radius
        let disc = b * b - 4 * a * c
        if (disc < 0) {
            return -1
        } else {
            return (-b - Math.sqrt(disc)) / (2 * a);
            // const e = Math.sqrt(disc)
            // const denom = 2 * a
            // t = (-b - e) / denom // Smaller root
            // if (t > 0.0001) {
            //     tmin = t
            //     return true
            // }
            // t = (-b + e) / denom; // larger root
            // if (t > 0.0001) {
            //     tmin = t
            //     return true
            // }
        }
        // return false
    }
}