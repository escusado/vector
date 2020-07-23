import { Component, Types } from "ecsy";

class Shape extends Component {}
Shape.schema = {
  type: { type: Types.String },
};
export default Shape;
