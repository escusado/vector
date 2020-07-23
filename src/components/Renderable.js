import { Component, Types } from "ecsy";

class Renderable extends Component {}
Renderable.schema = {
  id: { type: Types.String },
};
export default Renderable;
