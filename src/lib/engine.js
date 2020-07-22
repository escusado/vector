import { World } from "ecsy";
import Velocity from "src/components/Velocity";
import Position from "src/components/Position";
import Shape from "src/components/Shape";
import Renderable from "src/components/Renderable";
import MovableSystem from "src/systems/MovableSystem";
import RendererSystem from "src/systems/RendererSystem";

const Engine = () => {

  var world = new World();
  world.registerComponent(Velocity)
    .registerComponent(Position)
    .registerComponent(Shape)
    .registerComponent(Renderable)
    .registerSystem(MovableSystem)
    .registerSystem(RendererSystem);

};

export default Engine;