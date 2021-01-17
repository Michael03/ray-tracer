import { Geometric } from "./Geometric";

import { Ray } from "../Maths/Ray"
import { Normal } from "../Maths/Normal"
import { Point3d } from "../Maths/Point3d"
import { Vec3d } from "../Maths/Vec3d";
import { HitRecord } from "../HitRecord";

export class HittablesList implements Geometric {
    private hittable: Geometric[] = []

    public add(obj: Geometric) {
        this.hittable = [...this.hittable, obj];
    }

    public hit(ray: Ray, tmin: number, tmax: number): HitRecord | null {
        let hitRecord: HitRecord
        let closest = tmax
        for (const hittable of this.hittable) {
            const tempHitRecord = hittable.hit(ray, tmin, closest);
            if (tempHitRecord) {
                closest = tempHitRecord.t
                hitRecord = tempHitRecord
            }
        }
        return hitRecord;
        
    }
}