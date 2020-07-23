import React from "react";
import { Canvas, useFrame } from "react-three-fiber";
import DroneVectorApp from "src/lib/DroneVectorApp";
import { RendererContextProvider } from "src/lib/RendererContext";

const VectorEngine = () => (
  <Canvas>
    <RendererContextProvider>
      <DroneVectorApp />
    </RendererContextProvider>
  </Canvas>
);

export default VectorEngine;
