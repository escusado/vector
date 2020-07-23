import React, { useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { System } from "ecsy";
import Renderable from "src/components/Renderable";
import Shape from "src/components/Shape";
import Position from "src/components/Position";
import Box from "src/elements/Box";

class RendererSystem extends System {
  // This method will get called on every frame by default
  execute() {
    return this.queries.renderables.results.map((entity) => {
      const shape = entity.getComponent(Shape);
      const position = entity.getComponent(Position);
      if (shape.primitive === "box") {
        return <Box position={position} />;
      }
      return null;
    });
  }
}

RendererSystem.queries = {
  renderables: { components: [Renderable, Shape] },
};

export default RendererSystem;
