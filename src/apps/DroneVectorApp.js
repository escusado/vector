import React, { useContext, useEffect, useState } from "react";
import { RendererContext } from "src/lib/RendererContext";
import { World } from "ecsy";
import { v4 as uuidv4 } from "uuid";
import MovableSystem from "src/systems/MovableSystem";
import RendererSystem from "src/systems/RendererSystem";
import Renderable from "src/components/Renderable";
import Velocity from "src/components/Velocity";
import Position from "src/components/Position";
import Shape from "src/components/Shape";
import { useFrame } from "react-three-fiber";
import Rotation from "src/components/Rotation";
import { InputContext } from "src/lib/InputContext";

const DroneVectorApp = () => {
  const [world] = useState(new World());

  const rendererContext = useContext(RendererContext);
  const inputContext = useContext(InputContext);

  useEffect(() => {
    console.log("DroneVectorApp...");
    world
      .registerSystem(MovableSystem, { context: inputContext })
      .registerSystem(RendererSystem, { context: rendererContext })
      .registerComponent(Renderable)
      .registerComponent(Shape)
      .registerComponent(Velocity)
      .registerComponent(Position)
      .registerComponent(Rotation);

    world
      .createEntity()
      .addComponent(Shape, { type: "box" })
      .addComponent(Velocity, {
        x: Math.random() / 100,
        y: Math.random() / 100,
        z: 0.0001,
      })
      .addComponent(Position, { x: 0, y: 0 })
      .addComponent(Rotation)
      .addComponent(Renderable, { id: uuidv4() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }) => {
    world.execute(clock.getDelta(), clock.getElapsedTime());
  });

  return (
    <>
      <ambientLight key="a0" intensity={0.4} />
      <directionalLight
        key="d0"
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight
        key="p1"
        position={[-10, 0, -20]}
        color="red"
        intensity={2.5}
      />
      <pointLight key="p2" position={[0, -10, 0]} intensity={1.5} />
      <mesh
        key="p3"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
        <meshStandardMaterial attach="material" color={"white"} />
      </mesh>

      {rendererContext.rendererContent}
    </>
  );
};

export default DroneVectorApp;
