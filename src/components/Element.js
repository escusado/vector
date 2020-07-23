import { Component, Types } from "ecsy";

class Element extends Component {}
Element.schema = {
  element: { type: Types.JSON },
};
export default Element;
