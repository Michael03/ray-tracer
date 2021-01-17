import { Geometric } from "./Geometric";

import { Ray } from "../Maths/Ray"
import { Normal } from "../Maths/Normal"
import { Point3d } from "../Maths/Point3d"
import { Vec3d } from "../Maths/Vec3d";
import { HitRecord } from "../HitRecord";

export class Sphere implements Geometric {

    public center: Point3d
    private radius: number

    constructor(center: Point3d, radius: number) {
        this.center = center
        this.radius = radius
    }

    public hit(ray: Ray, tmin: number, tmax: number): HitRecord|null {
        // let tmin = Number.POSITIVE_INFINITY
        // let t;
        const oc: Vec3d = ray.origin.minus(this.center)
        let a: number = ray.direction.lengthSquared
        let halfB: number = oc.dot(ray.direction)
        let c: number = oc.lengthSquared - this.radius * this.radius
        let disc = halfB * halfB - a * c
        if (disc < 0) {
            return null
        } else {
            const squaredDisc = Math.sqrt(disc)
            let root = (-halfB - squaredDisc) / a;
            if (root < tmin || tmax < root) {
                 root = (-halfB + squaredDisc) / a;

                if (root < tmin || tmax < root)
                    return null;
            }
            const colisionPoint = ray.at(root);
            const outwardNormal: Vec3d = (colisionPoint.minus(this.center))

            return new HitRecord(colisionPoint, colisionPoint.minus(this.center).div(this.radius), root)
        }
    }
}