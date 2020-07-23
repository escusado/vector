import React from "react";
import { World } from "ecsy";
import Velocity from "src/components/Velocity";
import Position from "src/components/Position";
import Shape from "src/components/Shape";
import Renderable from "src/components/Renderable";
import MovableSystem from "src/systems/MovableSystem";
import RendererSystem from "src/systems/RendererSystem";
import { Canvas, useFrame } from "react-three-fiber";

const Engine = ({ children }) => {

  var world = new World();
  world.registerComponent(Velocity)
    .registerComponent(Position)
    .registerComponent(Shape)
    .registerComponent(Renderable)
    .registerSystem(MovableSystem)
    .registerSystem(RendererSystem);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      {children}
    </Canvas>
  );
};

export default Engine;
