import {Normal} from "./Normal"
export class Vec3d {
    public x: number;
    public y: number;
    public z: number;
    constructor(x: number, y: number = null, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    neg() {
        return new Vec3d(-this.x, -this.y, -this.z)
    }

    add(vec: Vec3d) {
        return new (this.constructor as any)(this.x + vec.x, this.y + vec.y, this.z + vec.z)
    }

    minus(vec: Vec3d) {
        return new Vec3d(this.x - vec.x, this.y - vec.y, this.z - vec.z)
    }

    mult(t: number | Vec3d):this{
        if(typeof t === 'number') {
            return new (this.constructor as any)(this.x * t, this.y * t, this.z * t) 
        } else {
            return new (this.constructor as any)(this.x * t.x, this.y * t.y, this.z * t.z)
        }
    }

    div(t: number) {
        return this.mult(1/t);
    }

    dot(vec: Vec3d) {
        return (this.x * vec.x + this.y * vec.y + this.z * vec.z)
    }

    cross(vec: Vec3d) {
        return new Vec3d(this.y * vec.z - this.z * vec.x,
                this.z & vec.x - this.x * vec.z,
                this.x * vec.y - this.y * vec.x
            )
    }

    unit() {
        return this.div(this.length);
    }

    get length() {
        return Math.sqrt(this.lengthSquared)
    }

    get lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }


}