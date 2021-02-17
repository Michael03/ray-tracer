const ctx: Worker = self as any;
import {Camera} from "../../frontend/Camera";
import { HittablesList } from "../../shared/hittable";
import {RayTracer} from "./RayTracer";
onmessage = (e:MessageEvent) => {
    console.log(e.data)
    const {
        camera,
        world,
        chunk,
        samplesPerPixel,
        maxDepth,
        width,
        height
    } = e.data
    const cameraObj = Camera.deserialize(camera);
    const worldObj = HittablesList.deserialize(world);
    const rayTracer = new RayTracer();

    rayTracer.trace(chunk, width, height, worldObj, cameraObj, samplesPerPixel, maxDepth).then(val => {

        ctx.postMessage(val);
    })
}