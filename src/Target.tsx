import { Position } from "./App";
import { TARGET_SIZE, isDotInside } from "./constants";

const TargetBox = ({
  position,
  dotPosition,
}: {
  position: Position;
  dotPosition: Position;
}) => {
  const bg = isDotInside(dotPosition, position)
    ? "bg-green-500/25"
    : "bg-blue-500/25";

  return (
    <div
      style={{
        top: position.y,
        left: position.x,
        height: TARGET_SIZE,
        width: TARGET_SIZE,
      }}
      className={`absolute ${bg}`}
    ></div>
  );
};

export default TargetBox;
