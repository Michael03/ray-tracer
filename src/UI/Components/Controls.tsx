import { observer } from "mobx-react";
import * as React from "react";
import { Camera } from "../../Camera";
import { Application } from "../../Application";
type props = {
  application: Application,
  camera: Camera,
}
expor const Controls = () => null;
// export const Controls = observer(({ application, camera }: props) => {
//   return (
//     <div>
//       <p>
//         <label>Quality:<input
//           type='number'
//           min='1'
//           step='1'
//           value={application.samplesPerPixel}
//           onChange={(event) => { application.setSamplesPerPixel(parseInt(event.target.value, 10)) }}>
//         </input>
//         </label>

//       </p>
//       {/* <p>

//         Camera
//       <label>Camera - Origin - X:<input
//           type='number'
//           min='1'
//           step='1'
//           value={camera.origin.x}
//           onChange={(event) => { camera.setOriginX(parseInt(event.target.value, 10)) }}>
//         </input>
//         </label>
//       </p> */}
//     </div>
//   )
// })
