import { System } from "ecsy";
import Velocity from "src/components/Velocity";
import Position from "src/components/Position";

const tools = { KeyboardController: {} };
tools.KeyboardController.keyPressed = (evtobj) => {
  const { key } = evtobj;

  // don't need to change anything if it's already pressed
  if (tools.KeyboardController.keyStatus[key] === true) return;
  // we store the key in an object which describe the keyboard status
  tools.KeyboardController.keyStatus[key] = true;
};

tools.KeyboardController.keyReleased = (evtobj) => {
  const { key } = evtobj;
  // if key is not already realese, noting to do
  if (tools.KeyboardController.keyStatus[key] === false) return;
  // set the key as not pushed
  delete tools.KeyboardController.keyStatus[key];
};

tools.KeyboardController.keyStatus = {};

document.onkeydown = tools.KeyboardController.keyPressed;
document.onkeyup = tools.KeyboardController.keyReleased;

const SHAPE_SIZE = 5;
const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;

const canvasWidth = 50;
const canvasHeight = 50;

class MovableSystem extends System {
  init(attributes) {
    this.context = attributes.context;
  }

  // This method will get called on every frame by default
  execute(delta) {
    // console.log(">>>>>>", tools.KeyboardController.keyStatus);
    // Iterate through all the entities on the query
    this.queries.moving.results.forEach((entity) => {
      const velocity = entity.getComponent(Velocity);
      const position = entity.getMutableComponent(Position);
      // position.x += velocity.x * delta;
      // position.y += velocity.y * delta;

      if (tools.KeyboardController.keyStatus.ArrowLeft) {
        position.x -= velocity.x * delta;
      }

      if (tools.KeyboardController.keyStatus.ArrowRight) {
        position.x += velocity.x * delta;
      }

      if (tools.KeyboardController.keyStatus.ArrowUp) {
        position.y += velocity.y * delta;
      }

      if (tools.KeyboardController.keyStatus.ArrowDown) {
        position.y -= velocity.y * delta;
      }

      if (position.x > canvasWidth + SHAPE_HALF_SIZE) {
        position.x = -SHAPE_HALF_SIZE;
      }
      if (position.x < -SHAPE_HALF_SIZE) {
        position.x = canvasWidth + SHAPE_HALF_SIZE;
      }
      if (position.y > canvasHeight + SHAPE_HALF_SIZE) {
        position.y = -SHAPE_HALF_SIZE;
      }
      if (position.y < -SHAPE_HALF_SIZE) {
        position.y = canvasHeight + SHAPE_HALF_SIZE;
      }
    });
  }
}

MovableSystem.queries = {
  moving: {
    components: [Velocity, Position],
  },
};

export default MovableSystem;
