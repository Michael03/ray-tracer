import { Vec3d } from "./Vec3d";

export class Color extends Vec3d {
    get r() {
        return this.x * 256
    }
    get g() {
        return this.y * 256
    }
    get b() {
        return this.z * 256
    }
}