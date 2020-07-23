import React, { useContext } from "react";
import { RendererContext } from "src/lib/RendererContext";
import { World } from "ecsy";
import MovableSystem from "src/systems/MovableSystem";
import RendererSystem from "src/systems/RendererSystem";
import Renderable from "src/components/Renderable";
import Velocity from "src/components/Velocity";
import Position from "src/components/Position";
import Shape from "src/components/Shape";
import { useFrame } from "react-three-fiber";

const world = new World();
let isInit = true;
const DroneVectorApp = () => {
  // console.log("DroneVectorApp...");
  const rendererContext = useContext(RendererContext);

  if (isInit) {
    world
      .registerSystem(MovableSystem)
      .registerSystem(RendererSystem, { context: rendererContext })
      .registerComponent(Renderable)
      .registerComponent(Shape)
      .registerComponent(Velocity)
      .registerComponent(Position);

    world
      .createEntity()
      .addComponent(Shape, { type: "box" })
      .addComponent(Velocity, { x: 0.001, y: 0.001 })
      .addComponent(Position, { x: 0, y: 0 })
      .addComponent(Renderable);

    world
      .createEntity()
      .addComponent(Shape, { type: "box" })
      .addComponent(Velocity, { x: 0.002, y: 0.002 })
      .addComponent(Position, { x: 0, y: 0 })
      .addComponent(Renderable);

    isInit = false;
  }
  useFrame(({ clock }) => {
    world.execute(clock.getDelta(), clock.getElapsedTime());
  });

  return (
    <>
      <fog attach="fog" args={["white", 0, 40]} />
      <ambientLight intensity={0.4} />
      <directionalLight
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
      <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
      {rendererContext.rendererContent}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </mesh>
    </>
  );
};

export default DroneVectorApp;
