import { HitRecord } from "../../backend/js/HitRecord";
import { Ray } from "../basics/Ray";

export interface Geometric {
     hit(ray: Ray, tmin: number, tmax: number):HitRecord|null
     serialize()
}