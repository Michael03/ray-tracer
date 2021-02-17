import { Material } from "../../shared/material/Material";
import { Point3d } from "../../shared/basics/Point3d";
import { Ray } from "../../shared/basics/Ray";
import { Vec3d } from "../../shared/basics/Vec3d";

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