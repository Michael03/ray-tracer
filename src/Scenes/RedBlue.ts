import { Geometric, HittablesList, Sphere } from "../Hittable"
import { Lambertian } from "../Material"
import { Color } from "../BasicTypes/Color"
import { Point3d } from "../BasicTypes/Point3d"
import { Scene } from "./Scene";

export class RedBlue implements Scene {
    build(): Geometric {
        const r = Math.cos(Math.PI / 4);

        const world = new HittablesList();
        const matterialLeft = new Lambertian(new Color(0,0,1))
        const matterialRight = new Lambertian(new Color(1,0,0))

        world.add(new Sphere(new Point3d(-r, 0, -1), r, matterialLeft));
        world.add(new Sphere(new Point3d(r, 0, -1), r, matterialRight));
        return world
    }
}