import { observer } from "mobx-react";
import * as React from "react";
import { RayTracer } from "../../RayTracer";
type props = {
  rayTracer: RayTracer
}
export const Controls = observer(({rayTracer }: props) => {
  return (
    <div>
      <input
        type='number'
        min='1'
        step='1'
        value={rayTracer.samplesPerPixel}
        onChange={(event) => { rayTracer.setSamplesPerPixel(parseInt(event.target.value, 10)) }}>
      </input>
    </div>
  )
})
