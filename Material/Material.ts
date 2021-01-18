import { HitRecord } from "../HitRecord";
import { Ray } from "../Maths/Ray";

import {Color } from "../Color"
export interface Material{
    scatter(ray: Ray, hitRecord:HitRecord):[Ray, Color, boolean]
}