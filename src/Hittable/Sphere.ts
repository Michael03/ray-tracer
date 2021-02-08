import { Geometric } from "./Geometric";

import { Ray } from "../BasicTypes/Ray"
import { Point3d } from "../BasicTypes/Point3d"
import { Vec3d } from "../BasicTypes/Vec3d";
import { HitRecord } from "../HitRecord";
import { Lambertian, Metal } from "../Material";

export class Sphere implements Geometric {

    constructor(public center: Point3d, public radius: number, public material) {
    }

    public hit(ray: Ray, tmin: number, tmax: number): HitRecord|null {
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
            const outwardNormal: Vec3d = (colisionPoint.minus(this.center)).div(this.radius);

            const hitRec =  new HitRecord(colisionPoint, colisionPoint.minus(this.center).div(this.radius), root)
            hitRec.setFaceNormal(ray, outwardNormal);
            hitRec.matterial = this.material;
            return hitRec
        }
    }

    public serialize() {
        return {center: this.center, radius: this.radius, material: this.material.serialize()}
    }

    public static deserialize(json:any) {
        let material;
        if(json.material.className === "Lambertian") {
            material = Lambertian.deserialize(json.material);
        } else if(json.material.className === "Metal") {
            material = Metal.deserialize(json.material);
        }
        return new Sphere(Point3d.deserialize(json.center),json.radius, material);
    }
}