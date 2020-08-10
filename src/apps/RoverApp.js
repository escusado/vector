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
import { Physics, useBox } from "use-cannon";

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [5, 15, 5],
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

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
      .addComponent(Position, { x: 0, y: 0, z: 0 })
      .addComponent(Renderable, { id: uuidv4() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }) => {
    world.execute(clock.getDelta(), clock.getElapsedTime());
  });

  return (
    <RoverStage>
      <Physics>
        <Cube></Cube>
        {rendererContext.rendererContent}
      </Physics>
    </RoverStage>
  );
};

export default RoverApp;
