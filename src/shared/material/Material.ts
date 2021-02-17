import { HitRecord } from "../../backend/js/HitRecord";
import { Ray } from "../basics/Ray";

import {Color } from "../basics/Color"
export interface Material{
    scatter(ray: Ray, hitRecord:HitRecord):[Ray, Color, boolean]
}