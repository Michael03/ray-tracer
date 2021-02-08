import { isJSDocPublicTag } from "typescript";
import { Point3d } from "./BasicTypes/Point3d";
import { Ray } from "./BasicTypes/Ray";
import { degreesToRadians } from "./BasicTypes/Utils";
import { Vec3d } from "./BasicTypes/Vec3d";

export class Camera {
    private ray = new Ray(new Point3d(0, 0, 0), new Vec3d(0, 0, 0))
    public rayCount = 0;
    constructor(
        public origin: Point3d,
        private lookAt: Point3d,
        private vup: Vec3d,
        private vfov: number,
        private aspectRatio: number
    ) {
    }   

    private get horizontal(): Vec3d {
        return this.u.mult(this.viewportWidth);
    }

    private get vertical(): Vec3d {
        return this.v.mult(this.viewportHeight)
    }

    private get v(): Vec3d {
        return this.w.cross(this.u);
    }
    private get u(): Vec3d {
        return this.vup.cross(this.w).unit()
    }
    private get w(): Vec3d {
        return (this.origin.minus(this.lookAt) as Vec3d).unit()
    }

    private get viewportHeight(): number {
        const theta = degreesToRadians(this.vfov)
        const h = Math.tan(theta / 2)
        return 2 * h;
    }
    private get viewportWidth(): number {
        return this.viewportHeight * this.aspectRatio
    }

    private get lowerLeftCorner(): Point3d {
        return this.origin.minus(this.horizontal.div(2)).minus(this.vertical.div(2)).minus(this.w);
    }

    public getRay(u: number, v: number): Ray {
        this.rayCount++;
        this.ray.origin = this.origin;
        this.ray.direction = this.lowerLeftCorner.add(this.horizontal.mult(u)).add(this.vertical.mult(v)).minus(this.origin)
        return this.ray;

    }

    public setOriginX(val: number) {
        this.origin.x = val;
    }

    public serialize(){
       return this;
    }

    public static deserialize(json:any){
        const origin = Point3d.deserialize(json.origin)
        const lookAt = Point3d.deserialize(json.lookAt)
        const vup = Vec3d.deserialize(json.vup)
        const vfov = json.vfov
        const aspectRatio = json.aspectRatio
        return new Camera(origin, lookAt, vup, vfov, aspectRatio)
    }
}