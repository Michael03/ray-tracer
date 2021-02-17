import { Vec3d } from "./Vec3d";

export class Color extends Vec3d {
    get r() {
        return this.x
    }
    get g() {
        return this.y
    }
    get b() {
        return this.z
    }

    public static deserialize(json:any) {
        return new Color(json.x, json.y, json.z)
    }
}