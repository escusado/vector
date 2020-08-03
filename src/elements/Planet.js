import React, { useRef, useEffect, useState } from "react";
import Perlin from "src/lib/perlin";

Perlin.seed();

const SIZE = 10;
const SEGMENTS_PER_SIDE = 20;

const Planet = (props) => {
  const mesh = useRef();
  const geometry = useRef();

  const [terrainData, setTerrainData] = useState();

  useEffect(() => {
    const vertices = geometry.current.attributes.position.array;

    let currentVertex = 0;

    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i + 2] = Perlin.get(i / 11, currentVertex);
      console.log(
        ">>s>",
        currentVertex,
        ":",
        i / 11,
        vertices[i],
        vertices[i + 1],
        vertices[i + 2],
        Perlin.get(i / 11, currentVertex),
      );
      currentVertex += 1;
    }
    // for (let i = 0, j = 0, l = vertices.length; i < l; i += 1, j += 3) {
    //   vertices[j + 1] = data[i] * 10;
    // }
    setTerrainData(vertices);
  }, []);

  return (
    <mesh {...props} ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry
        attach="geometry"
        ref={geometry}
        args={[SIZE, SIZE, SEGMENTS_PER_SIDE, SEGMENTS_PER_SIDE]}
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
        wireframe={true}
      />
    </mesh>
  );
};

export default Planet;

{
  /* <planeBufferGeometry
  attach="geometry"
  ref={geometry}
  args={[10, 10, 5, 5]}
  // attributes-position-array={}
/> */
}
