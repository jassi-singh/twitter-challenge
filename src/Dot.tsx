import { Position } from "./App";
import { DOT_SIZE } from "./constants";

const Dot = ({ x, y }: Position) => {
  return (
    <div
      style={{ top: y, left: x, height: DOT_SIZE, width: DOT_SIZE }}
      className="rounded-full bg-red-600 absolute"
    ></div>
  );
};

export default Dot;
