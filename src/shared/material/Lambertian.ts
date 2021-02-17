import { Material } from "./Material"
import { HitRecord } from "../../backend/js/HitRecord"
import { randomUnitVector } from "../basics/Utils";
import { Ray } from "../basics/Ray"
import { Color } from "../basics/Color"
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

    public serialize() {
        return {color:this.color, className: "Lambertian"}
    }

    public static deserialize(json:any) {
        return new Lambertian(Color.deserialize(json.color));
    }
}