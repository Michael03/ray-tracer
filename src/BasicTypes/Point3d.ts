import {Vec3d} from "./Vec3d";

export class Point3d extends Vec3d {
    public static deserialize(obj:any) {
        return new Point3d(obj.x, obj.y, obj.z)
    }
}