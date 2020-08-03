import React, { useState, useContext, useEffect } from "react";
import RoverStage from "src/apps/RoverStage";
import { World } from "ecsy";
import { RendererContext } from "src/lib/RendererContext";
import RendererSystem from "src/systems/RendererSystem";
import Renderable from "src/components/Renderable";
import Shape from "src/components/Shape";
import Velocity from "src/components/Velocity";
import Position from "src/components/Position";
import Rotation from "src/components/Rotation";
import { v4 as uuidv4 } from "uuid";
import { useFrame } from "react-three-fiber";

const RoverApp = () => {
  const [world] = useState(new World());

  const rendererContext = useContext(RendererContext);

  useEffect(() => {
    console.log("Rover...");
    world
      .registerSystem(RendererSystem, { context: rendererContext })
      .registerComponent(Renderable)
      .registerComponent(Shape)
      .registerComponent(Velocity)
      .registerComponent(Position)
      .registerComponent(Rotation);

    world
      .createEntity()
      .addComponent(Shape, { type: "Planet" })
      .addComponent(Velocity, {
        x: Math.random() / 100,
        y: Math.random() / 100,
        z: 0.0001,
      })
      .addComponent(Position, { x: 0, y: 0, z: 2 })
      .addComponent(Renderable, { id: uuidv4() });
  }, []);

  useFrame(({ clock }) => {
    world.execute(clock.getDelta(), clock.getElapsedTime());
  });

  return <RoverStage> {rendererContext.rendererContent}</RoverStage>;
};

export default RoverApp;
