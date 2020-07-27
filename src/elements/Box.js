import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const Box = (props) => {
  const mesh = useRef();

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  );
};

export default Box;
