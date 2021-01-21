import { Canvas } from "./Canvas"

import { Camera } from "./Camera";
import { BallsReflection } from "./Scenes"
import * as ReactDOM from "react-dom"
import * as React from "react"
import { Controls } from "./UI/Components/Controls"
import { RayTracer } from "./RayTracer"

console.log("Starting")

const canvas = new Canvas("canvas")

//Build
let scene = new BallsReflection()
const world = scene.build();

// Image
const aspectRatio = 16.0 / 9.0;
canvas.width = 200
canvas.height = canvas.width / aspectRatio;

const camera = new Camera();

const rayTracer = new RayTracer(canvas, camera, world)


ReactDOM.render(
  <Controls rayTracer={rayTracer} />,
  document.getElementById('controls')
);