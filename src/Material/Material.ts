import { HitRecord } from "../HitRecord";
import { Ray } from "../BasicTypes/Ray";

import {Color } from "../BasicTypes/Color"
export interface Material{
    scatter(ray: Ray, hitRecord:HitRecord):[Ray, Color, boolean]
}