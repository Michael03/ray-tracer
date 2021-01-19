import { Point3d } from "./BasicTypes/Point3d";
import { Ray } from "./BasicTypes/Ray";
// import { Point3d } from "./Maths/Point3d";
import { Vec3d } from "./BasicTypes/Vec3d";

export class Camera {
    private origin: Point3d;
    private lowerLeftCorner: Vec3d;
    private horizontal: Vec3d;
    private vertical: Vec3d;
    private ray = new Ray(new Point3d(0, 0, 0), new Vec3d(0, 0, 0))
    constructor() {
        // camera
        const aspectRatio = 16.0 / 9.0;

        const viewportHeight = 2;
        const viewportWidth = viewportHeight * aspectRatio
        const focalLength = new Vec3d(0, 0, 1);

        this.origin = new Point3d(0, 0, 0);
        this.horizontal = new Vec3d(viewportWidth, 0, 0);
        this.vertical = new Vec3d(0, viewportHeight, 0);


        this.lowerLeftCorner = this.origin.minus(this.horizontal.div(2)).minus(this.vertical.div(2)).minus(focalLength)

    }
    public getRay(u: number, v: number): Ray {
        this.ray.origin = this.origin;
        this.ray.direction = this.lowerLeftCorner.add(this.horizontal.mult(u)).add(this.vertical.mult(v))
        return this.ray;
        // return new Ray(this.origin, this.lowerLeftCorner.add(this.horizontal.mult(u)).add(this.vertical.mult(v)))

    }
}