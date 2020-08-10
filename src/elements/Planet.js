import React, { useRef, useEffect, useState } from "react";
import { generateTerrainMap } from "src/lib/generateTerrainMap";
import { useHeightfield } from "use-cannon";

const SIZE = 120;
const SEGMENTS_PER_SIDE = 17;

const TerrainPlane = (props) => {
  // const geometry = new THREE.Geometry();
  // geometry.vertices = props.terrainData;
  // // geometry.rotation = [-Math.PI / 2, 0, 0];
  // // const position = new THREE.BufferAttribute(props.terrainData, 3);
  // // console.log(">>>>", position);
  // const args = [];

  // for (let i = 0; i < props.terrainData.length; i += 3) {
  //   const x = props.terrainData.length[i];
  //   const y = props.terrainData.length[i + 1];
  //   const z = props.terrainData.length[i + 2];
  //   args.push([x, y, z]);
  // }

  const [ref] = useHeightfield(() => ({
    ...props,
    type: "Static",
    args: [
      props.terrainData.generatedTerrain,
      {
        elementSize: 1,
      },
    ],
  }));
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <planeBufferGeometry
        attach="geometry"
        args={[SIZE, SIZE, SEGMENTS_PER_SIDE - 1, SEGMENTS_PER_SIDE - 1]}
      >
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={props.terrainData.vertices.length / 3}
          array={props.terrainData.vertices}
          itemSize={3}
        />
      </planeBufferGeometry>
      <meshStandardMaterial
        attach="material"
        color={"hotpink"}
        // wireframe={true}
        flatShading={true}
      />
    </mesh>
  );
};

const Planet = (props) => {
  let generatedTerrain = generateTerrainMap(SEGMENTS_PER_SIDE, 48);
  let flatGeneratedTerrain = [].concat(...generatedTerrain);
  const max = flatGeneratedTerrain.reduce((a, b) => Math.max(a, b));
  const min = flatGeneratedTerrain.reduce((a, b) => Math.min(a, b));
  generatedTerrain = generatedTerrain.map((row) => {
    console.log("this is very wrong x___x >");
    return row.map((value) => value + Math.abs(min));
  });
  flatGeneratedTerrain = [].concat(...generatedTerrain);

  const geometry = useRef();
  const [terrainData, setTerrainData] = useState();

  useEffect(() => {
    const vertices = geometry.current.attributes.position.array;
    const indices = geometry.current.index.array;
    for (let i = 0; i < vertices.length; i += 3) {
      // new Z value for vertex
      vertices[i + 2] = flatGeneratedTerrain[i / 3] / 10;
    }
    setTerrainData({
      vertices,
      indices,
      generatedTerrain,
      max,
      min,
    });
  }, []);

  return (
    <>
      {terrainData ? (
        <TerrainPlane
          {...props}
          rotation={[-Math.PI / 2, 0, 0]}
          terrainData={terrainData}
        />
      ) : (
        <mesh
          {...props}
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <planeBufferGeometry
            attach="geometry"
            ref={geometry}
            args={[SIZE, SIZE, SEGMENTS_PER_SIDE - 1, SEGMENTS_PER_SIDE - 1]}
          ></planeBufferGeometry>
        </mesh>
      )}
    </>
  );
};

export default Planet;
