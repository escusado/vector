import React, { useContext } from "react";
import { Plane, Sphere } from "drei";
import { RendererContextProvider } from "src/lib/RendererContext";

const DroneVectorApp = () => {
  const rendererContext = useContext(RendererContextProvider);
  console.log("Adding entities");
  console.log("Adding systems");
  return (
    <>
      {rendererContext}
      <Plane args={[2, 2]} />
      <Sphere>
        <meshBasicMaterial attach="material" color="hotpink" />
      </Sphere>
    </>
  );
};

export default DroneVectorApp;
