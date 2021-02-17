import { Geometric } from "./Geometric";

import { Ray } from "../BasicTypes/Ray"
import { Normal } from "../BasicTypes/Normal"
import { Point3d } from "../BasicTypes/Point3d"

export class Plane implements Geometric {

    private origin: Point3d
    private normal: Normal

    constructor(origin: Point3d, normal: Normal) {
        this.origin = origin
        this.normal = normal
    }

    public hit(ray: Ray, _tmin: number, tmax: number) {
        let tmin = Number.POSITIVE_INFINITY;
        const t = this.origin.minus(ray.origin).dot(this.normal) / ray.direction.dot(this.normal)
        if (t > 0.00001) {
            tmin = t;
            return null;// Hit record should be returned
        } else {
            return null;
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