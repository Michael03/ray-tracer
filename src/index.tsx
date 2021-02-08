import { Canvas } from "./Canvas"

import { Camera } from "./Camera";
import { BallsReflection,RedBlue } from "./Scenes"
// import * as ReactDOM from "react-dom"
// import * as React from "react"
// import { Controls } from "./UI/Components/Controls"
import { Application } from "./Application"
import { Point3d } from "./BasicTypes/Point3d";
import { Vec3d } from "./BasicTypes/Vec3d";

console.log("Starting")

const canvas = new Canvas("canvas")

//Build
let scene = new BallsReflection()
const world = scene.build();

// Image
const aspectRatio = 16.0 / 9.0;
canvas.width = 400
canvas.height = canvas.width / aspectRatio;

const cameraOrigin = new Point3d(0,0,1);
const cameraLookAt = new Point3d(0,0,-1);
const vup = new Vec3d(0,1,0)
const camera = new Camera(cameraOrigin, cameraLookAt, vup,45, aspectRatio);

const application = new Application(canvas, camera, world)
application.run();

// ReactDOM.render(
//   <Controls application={application} camera={camera} />,
//   document.getElementById('controls')
// );