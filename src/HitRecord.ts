import { Material } from "./Material/Material";
import { Point3d } from "./BasicTypes/Point3d";
import { Ray } from "./BasicTypes/Ray";
import { Vec3d } from "./BasicTypes/Vec3d";

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