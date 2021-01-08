import { Point3d } from "./Point3d";
import { Vec3d } from "./Vec3d";

export class HitRecord {
    constructor(public point: Point3d, public normal: Vec3d, public t: number) {

    }
}