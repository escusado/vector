import React, { useRef } from "react";
import { World } from "ecsy";
import Velocity from "src/components/Velocity";
import Position from "src/components/Position";
import Shape from "src/components/Shape";
import Renderable from "src/components/Renderable";
import MovableSystem from "src/systems/MovableSystem";
import RendererSystem from "src/systems/RendererSystem";
import { Canvas, useFrame } from "react-three-fiber";

const Engine = ({ children }) => {
  const container = useRef(<></>);
  const world = new World();
  world
    .registerComponent(Velocity)
    .registerComponent(Position)
    .registerComponent(Shape)
    .registerComponent(Renderable)
    .registerSystem(MovableSystem)
    .registerSystem(RendererSystem, { container });

  let lastTime = performance.now();
  useFrame(() => {
    // Compute delta and elapsed time
    const time = performance.now();
    const delta = time - lastTime;

    // Run all the systems
    world.execute(delta, time);

    lastTime = time;
  });

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {container}
    </Canvas>
  );
};

export default Engine;
