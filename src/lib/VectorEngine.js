import React from "react";
import { Canvas } from "react-three-fiber";
import DroneVectorApp from "src/lib/DroneVectorApp";
import { RendererContextProvider } from "src/lib/RendererContext";
import { OrbitControls, softShadows, Stats } from "drei";

softShadows();

const VectorEngine = () => (
  <Canvas colorManagement shadowMap camera={{ position: [-5, 2, 10], fov: 60 }}>
    <RendererContextProvider>
      <DroneVectorApp />
    </RendererContextProvider>
    <OrbitControls />
    <Stats />
  </Canvas>
);

export default VectorEngine;
