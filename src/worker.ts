const ctx: Worker = self as any;
// import { Point3d } from "./BasicTypes/Point3d";
import {Camera} from "./Camera";
import { HittablesList } from "./Hittable";
import {RayTracer} from "./RayTracer";
onmessage = (e:MessageEvent) => {
    // console.log(`got message ${JSON.stringify(e.data)}`)
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
    // console.log(Point3d)
    // console.log(e.data.origin.x,e.data.origin.y,e.data.origin.z);
    // const origin = new Point3d(e.data.origin.x,e.data.origin.y,e.data.origin.z);
    // const camera = new Camera(new Point3d(e.data.camera.origin.setOriginX))
    const cameraObj = Camera.deserialize(camera);
    const worldObj = HittablesList.deserialize(world);
    const rayTracer = new RayTracer();

    rayTracer.trace(chunk, width, height, worldObj, cameraObj, samplesPerPixel, maxDepth).then(val => {

        ctx.postMessage(val);
    })
}