import React from "react";
import { System } from "ecsy";
import Renderable from "src/components/Renderable";
import Shape from "src/components/Shape";
import Position from "src/components/Position";

// import { Box } from "drei";
import Box from "src/elements/Box";
// import Rotation from "src/components/Rotation";

class RendererSystem extends System {
  init(attributes) {
    this.context = attributes.context;
  }

  execute() {
    const elements = [];
    this.queries.renderables.results.forEach((entity) => {
      const position = entity.getComponent(Position);
      const shape = entity.getComponent(Shape);
      const renderable = entity.getComponent(Renderable);

      if (shape.type === "box") {
        elements.push(
          <Box
            key={renderable.id}
            position={[position.x, position.z, position.y]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial attach="material" color={"hotpink"} />
          </Box>,
        );
      }
    });
    this.context.setRendererContent(elements);
  }
}

RendererSystem.queries = {
  renderables: { components: [Renderable, Position, Shape] },
};

export default RendererSystem;
