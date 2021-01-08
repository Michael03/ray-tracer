import { Point3d } from "./Point3d";
import { Vec3d } from "./Vec3d";

export class Ray {
    public origin: Point3d
    public direction: Vec3d

    constructor(origin: Point3d, direction: Vec3d) {
        this.origin = origin
        this.direction = direction
    }

    public at(t:number):Vec3d {
        return this.origin.add(this.direction.mult(t));
    }
}
