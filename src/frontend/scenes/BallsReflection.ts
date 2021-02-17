import { Geometric, HittablesList, Sphere } from "../../shared/hittable"
import { Lambertian, Metal } from "../../shared/material"
import { Color } from "../../shared/basics/Color"
import { Point3d } from "../../shared/basics/Point3d"
import { Scene } from "./Scene";

export class BallsReflection implements Scene {
    build(): Geometric {
        const world = new HittablesList();
        const matterialGround = new Lambertian(new Color(0.8, 0.8, 0))
        const matterialCenter = new Lambertian(new Color(0.7, 0.3, 0.3))
        const matterialLeft = new Metal(new Color(0.8, 0.8, 0.8),0.3)
        const matterialRight = new Metal(new Color(0.8, 0.6, 0.2),1)

        
        world.add(new Sphere(new Point3d(0, -100.5, -1), 100, matterialGround));
        world.add(new Sphere(new Point3d(0, 0, -1), 0.5, matterialCenter));
        world.add(new Sphere(new Point3d(-1, 0, -1), 0.5, matterialLeft));
        world.add(new Sphere(new Point3d(1, 0, -1), 0.5, matterialRight));
        return world
    }
}