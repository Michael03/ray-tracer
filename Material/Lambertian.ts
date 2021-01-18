import { Material } from "./Material"
import { HitRecord } from "../HitRecord"
import { randomUnitVector } from "../Utils";
import { Ray } from "../Maths/Ray"
import { Color } from "../Color"
export class Lambertian implements Material {
    constructor(public color: Color) { }

    public scatter(ray: Ray, rec: HitRecord): [Ray, Color, boolean] {
        let scatterDir = rec.normal.add(randomUnitVector())
        if (scatterDir.nearZero()) {
            scatterDir = rec.normal
        }

        const scattered = new Ray(rec.point, scatterDir)

        return [scattered, this.color, true]
    }
}