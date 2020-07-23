import { Component, Types } from "ecsy";
import { v4 as uuidv4 } from "uuid";

class Renderable extends Component {}
Renderable.schema = {
  id: { type: Types.String, default: (() => uuidv4())() },
};
export default Renderable;
