import React, { useRef, useEffect, useState } from "react";
import { generateTerrainMap } from "src/lib/generateTerrainMap.ts";

const SIZE = 120;
const SEGMENTS_PER_SIDE = 17;

const Planet = (props) => {
  const mesh = useRef();
  const geometry = useRef();

  const [terrainData, setTerrainData] = useState();

  useEffect(() => {
    const vertices = geometry.current.attributes.position.array;
    const generatedTerrain = generateTerrainMap(SEGMENTS_PER_SIDE, 48);
    const flatGeneratedTerrain = [].concat(...generatedTerrain);
    for (let i = 0; i < vertices.length; i += 3) {
      // new Z value for vertex
      vertices[i + 2] = flatGeneratedTerrain[i / 3] / 10;
    }
    setTerrainData(vertices);
  }, []);

  return (
    <mesh
      {...props}
      ref={mesh}
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
