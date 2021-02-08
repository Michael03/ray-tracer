import { Geometric } from "./Geometric";

import { Ray } from "../BasicTypes/Ray"
import { Normal } from "../BasicTypes/Normal"
import { Point3d } from "../BasicTypes/Point3d"
import { Vec3d } from "../BasicTypes/Vec3d";
import { HitRecord } from "../HitRecord";
import { Sphere } from "./Sphere";

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

    public serialize() {
        return this.hittable.map(o  => o.serialize());
    }

    public static deserialize(json:any) {
        const objects = json.map(o => Sphere.deserialize(o));
        const hittable = new HittablesList()
        return objects.reduce((list, obj) => {list.add(obj); return list}, hittable)
    }
}