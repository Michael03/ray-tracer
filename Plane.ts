import { Geometric } from "./Geometric";

import { Ray } from "./Ray"
import { Normal } from "./Normal"
import { Point3d } from "./Point3d"

export class Plane extends Geometric {

    private origin: Point3d
    private normal: Normal

    constructor(origin: Point3d, normal: Normal) {
        super();
        this.origin = origin
        this.normal = normal
    }

    public hit(ray: Ray) {
        let tmin = Number.POSITIVE_INFINITY;
        const t = this.origin.minus(ray.origin).dot(this.normal) / ray.direction.dot(this.normal)
        if (t > 0.00001) {
            tmin = t;
            return true;
        } else {
            return false;
        }
        // double t = (point - ray.o) * normal / (ray.d * normal);
        // if (t > kEpsilon) {
        //     tmin = t;
        //     sr.normal = normal;
        //     sr.local_hit_point = ray.o + t * ray.d;

        //     return (true);
        // }
        // else
        //     return (false);

    }
}