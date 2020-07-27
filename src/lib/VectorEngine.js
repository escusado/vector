import React from "react";
import { Canvas } from "react-three-fiber";
import { RendererContextProvider } from "src/lib/RendererContext";
import { OrbitControls, Stats, softShadows } from "drei";
import { InputContextProvider } from "./InputContext";

softShadows();

const VectorEngine = ({ children }) => (
  <Canvas colorManagement shadowMap camera={{ position: [-5, 2, 10], fov: 60 }}>
    <InputContextProvider>
      <RendererContextProvider>{children}</RendererContextProvider>
    </InputContextProvider>
    <OrbitControls />
    <Stats />
    <axesHelper args="1000" />
    <gridHelper args={[30, 30, 30]} />
  </Canvas>
);

export default VectorEngine;
