import { HitRecord } from "../HitRecord";
import { Ray } from "../BasicTypes/Ray";
import { Material } from "./Material";

import { Color } from "../BasicTypes/Color"
import { Vec3d } from "../BasicTypes/Vec3d";
import { randomInUnitSphere } from "../BasicTypes/Utils";

export class Metal implements Material {
    constructor(public color: Color, private fuzz: number) { }

    public scatter(ray: Ray, rec: HitRecord): [Ray, Color, boolean] {
        const reflected = this.reflect(ray.direction.unit(), rec.normal)
        const scattered = new Ray(rec.point, reflected.add(randomInUnitSphere().mult(this.fuzz)))
        return [scattered, this.color, scattered.direction.dot(rec.normal) > 0]
    }

    reflect(vec: Vec3d, n: Vec3d): Vec3d {
        // return ec.minus(2) 
        return vec.minus(n.mult(vec.dot(n)).mult(2))
    }
}