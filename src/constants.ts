import { Position } from "./App";

export const MOVEMENT = 10;
export const BOX_SIZE = 150;
export const DOT_SIZE = 10;
export const TARGET_SIZE = 50;

export const isDotInside = (
  dotPosition: Position,
  targetPosition: Position
): boolean => {
  return (
    dotPosition.x >= targetPosition.x &&
    dotPosition.y >= targetPosition.y &&
    dotPosition.x + dotPosition.width <=
      targetPosition.x + targetPosition.width &&
    dotPosition.y + dotPosition.height <=
      targetPosition.y + targetPosition.height
  );
};
