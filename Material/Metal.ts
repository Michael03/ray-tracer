import { HitRecord } from "../HitRecord";
import { Ray } from "../Maths/Ray";
import { Material } from "./Material";

import { Color } from "../Color"
import { Vec3d } from "../Maths/Vec3d";
export class Metal implements Material {
    constructor(public color: Color) { }

    public scatter(ray: Ray, rec: HitRecord): [Ray, Color, boolean] {
        const reflected = this.reflect(ray.direction.unit(), rec.normal)
        const scattered = new Ray(rec.point, reflected);
        return [scattered, this.color, scattered.direction.dot(rec.normal) > 0]
    }

    reflect(vec: Vec3d, n: Vec3d) {
        // return ec.minus(2) 
        return vec.minus(n.mult(vec.dot(n)).mult(2))
    }
}