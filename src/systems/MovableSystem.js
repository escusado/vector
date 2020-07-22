import { System } from "ecsy";

class MovableSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {
    // Iterate through all the entities on the query
    this.queries.moving.results.forEach(entity => {
      var velocity = entity.getComponent(Velocity);
      var position = entity.getMutableComponent(Position);
      position.x += velocity.x * delta;
      position.y += velocity.y * delta;

      if (position.x > canvasWidth + SHAPE_HALF_SIZE) position.x = - SHAPE_HALF_SIZE;
      if (position.x < - SHAPE_HALF_SIZE) position.x = canvasWidth + SHAPE_HALF_SIZE;
      if (position.y > canvasHeight + SHAPE_HALF_SIZE) position.y = - SHAPE_HALF_SIZE;
      if (position.y < - SHAPE_HALF_SIZE) position.y = canvasHeight + SHAPE_HALF_SIZE;
    });
  }
}

MovableSystem.queries = {
  moving: {
    components: [Velocity, Position]
  }
}

export default MovableSystem;