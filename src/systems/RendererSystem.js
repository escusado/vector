import { System } from "ecsy";

class RendererSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {

    ctx.fillStyle = "#d4d4d4";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Iterate through all the entities on the query
    this.queries.renderables.results.forEach(entity => {
      var shape = entity.getComponent(Shape);
      var position = entity.getComponent(Position);
      if (shape.primitive === 'box') {
        this.drawBox(position);
      } else {
        this.drawCircle(position);
      }
    });
  }

  drawCircle(position) {
    ctx.beginPath();
    ctx.arc(position.x, position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#39c495";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0b845b";
    ctx.stroke();
  }

  drawBox(position) {
    ctx.beginPath();
    ctx.rect(position.x - SHAPE_HALF_SIZE, position.y - SHAPE_HALF_SIZE, SHAPE_SIZE, SHAPE_SIZE);
    ctx.fillStyle = "#e2736e";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#b74843";
    ctx.stroke();
  }
};

RendererSystem.queries = {
  renderables: { components: [Renderable, Shape] }
}

export default RendererSystem;