import React from "react";

const RoverStage = ({ children }) => (
  <>
    <ambientLight key="a0" intensity={0.4} />
    <directionalLight
      key="d0"
      castShadow
      position={[10, 10, 10]}
      intensity={1}
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
    <pointLight key="p1" position={[-10, 0, -20]} color="white" intensity={1} />

    {children}
  </>
);

export default RoverStage;
