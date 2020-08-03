import React from "react";

const RoverStage = ({ children }) => (
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
    <pointLight key="p1" position={[-10, 0, -20]} color="red" intensity={2.5} />
    <pointLight key="p2" position={[0, -10, 0]} intensity={1.5} />
    {children}
  </>
);

export default RoverStage;
