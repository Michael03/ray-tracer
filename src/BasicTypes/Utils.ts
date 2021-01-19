import { Vec3d } from "./Vec3d"
export function degrees_to_radians(degrees: number) {
    return degrees * Math.PI / 180.0;
}
export function randomInUnitSphere() {
    while (true) {
        const point = Vec3d.randomInside(-1, 1)
        if (point.lengthSquared >= 1) continue;
        return point;
    }
}

export function randomUnitVector(): Vec3d {
    return randomInUnitSphere().unit()
}
