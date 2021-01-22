import { Point3d } from "./BasicTypes/Point3d";
import { Ray } from "./BasicTypes/Ray";
import { degreesToRadians } from "./BasicTypes/Utils";
import { Vec3d } from "./BasicTypes/Vec3d";

export class Camera {
    private origin: Point3d;
    private lowerLeftCorner: Vec3d;
    private horizontal: Vec3d;
    private vertical: Vec3d;
    private ray = new Ray(new Point3d(0, 0, 0), new Vec3d(0, 0, 0))
    constructor(
        lookFrom: Point3d,
        lookAt: Point3d,
        vup: Vec3d,
        vfov: number,
        aspectRatio: number
    ) {
        this.origin = lookFrom
        const theta = degreesToRadians(vfov)
        const h = Math.tan(theta / 2)
        const viewportHeight = 2 * h
        const viewportWidth = viewportHeight * aspectRatio

        const w = (lookFrom.minus(lookAt) as Vec3d).unit()
        const u = vup.cross(w).unit()
        const v = w.cross(u)
        console.log({ w, u, v })
        // const v = new Vec3d(0,1,0)
        console.log({ v })

        this.horizontal = u.mult(viewportWidth)
        this.vertical = v.mult(viewportHeight)
        this.lowerLeftCorner = this.origin.minus(this.horizontal.div(2)).minus(this.vertical.div(2)).minus(w);
    }

    public getRay(u: number, v: number): Ray {
        this.ray.origin = this.origin;
        this.ray.direction = this.lowerLeftCorner.add(this.horizontal.mult(u)).add(this.vertical.mult(v)).minus(this.origin)
        return this.ray;

    }
}