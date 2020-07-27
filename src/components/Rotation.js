import { Component, Types } from "ecsy";

class Rotation extends Component {}
Rotation.schema = {
  yaw: { type: Types.Number },
  roll: { type: Types.Number },
  pitch: { type: Types.Number },
};
export default Rotation;
