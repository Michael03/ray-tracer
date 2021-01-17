import { HitRecord } from "../HitRecord";
import { Ray } from "../Maths/Ray";

export interface Geometric {
     hit(ray: Ray, tmin: number, tmax: number):HitRecord|null
}