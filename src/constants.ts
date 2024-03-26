import { Position } from "./App";

export const MOVEMENT = 10;
export const BOX_SIZE = 150;
export const DOT_SIZE = 10;
export const TARGET_SIZE = 50;

export const isDotInside = (dot: Position, target: Position): boolean => {
  const dotCenterX = dot.x + dot.width / 2;
  const dotCenterY = dot.y + dot.height / 2;

  const targetLeft = target.x;
  const targetRight = target.x + target.width;
  const targetTop = target.y;
  const targetBottom = target.y + target.height;

  return (
    dotCenterX >= targetLeft &&
    dotCenterX <= targetRight &&
    dotCenterY >= targetTop &&
    dotCenterY <= targetBottom
  );
};
