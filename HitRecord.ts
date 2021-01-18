import { Material } from "./Material/Material";
import { Point3d } from "./Maths/Point3d";
import { Ray } from "./Maths/Ray";
import { Vec3d } from "./Maths/Vec3d";

export class HitRecord {
    private frontFace: boolean;
    public matterial: Material;
    constructor(public point: Point3d, public normal: Vec3d, public t: number) {

    }

    public setFaceNormal(ray: Ray, outwardNormal: Point3d) {
        this.frontFace = ray.direction.dot(outwardNormal) < 0;
        this.normal = (this.frontFace ? outwardNormal : outwardNormal.neg()) as Vec3d
    }
}