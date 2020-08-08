import React, { useRef, useEffect, useState, useMemo } from "react";
import { generateTerrainMap } from "src/lib/generateTerrainMap";
import { usePlane } from "use-cannon";
import * as THREE from "three";

const SIZE = 120;
const SEGMENTS_PER_SIDE = 17;

const Planet = (props) => {
  const generatedTerrain = generateTerrainMap(SEGMENTS_PER_SIDE, 48);
  const flatGeneratedTerrain = [].concat(...generatedTerrain);
  const geometry = useRef();

  const [terrainData, setTerrainData] = useState();
  const [meshRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    vertices: terrainData,
  }));

  useEffect(() => {
    const vertices = geometry.current.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      // new Z value for vertex
      vertices[i + 2] = flatGeneratedTerrain[i / 3] / 10;
    }
    setTerrainData(vertices);
    // ref.vertices = vertices;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(">", meshRef);
    debugger;
  }, [meshRef]);

  return (
    <mesh
      ref={meshRef}
      {...props}
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
    >
      <planeBufferGeometry
        attach="geometry"
        ref={geometry}
        args={[SIZE, SIZE, SEGMENTS_PER_SIDE - 1, SEGMENTS_PER_SIDE - 1]}
      >
        {terrainData && (
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={terrainData.length / 3}
            array={terrainData}
            itemSize={3}
          />
        )}
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

export default Planet;
