import React from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { System } from "ecsy";
import Renderable from "~/components/Renderable";
import Shape from "~/components/Shape";
import Position from "~/components/Position";

class RendererSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {
    this.queries.renderables.results.forEach((entity) => {
      const shape = entity.getComponent(Shape);
      const position = entity.getComponent(Position);
      if (shape.primitive === "box") {
        this.drawBox(position);
      } else {
        this.drawCircle(position);
      }
    });
  }

  drawCircle(position) {
    // ctx.beginPath();
    // ctx.arc(position.x, position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
    // ctx.fillStyle = "#39c495";
    // ctx.fill();
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = "#0b845b";
    // ctx.stroke();
  }

  drawBox(position) {
    // ctx.beginPath();
    // ctx.rect(position.x - SHAPE_HALF_SIZE, position.y - SHAPE_HALF_SIZE, SHAPE_SIZE, SHAPE_SIZE);
    // ctx.fillStyle = "#e2736e";
    // ctx.fill();
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = "#b74843";
    // ctx.stroke();
  }
}

RendererSystem.queries = {
  renderables: { components: [Renderable, Shape] },
};

export default RendererSystem;
