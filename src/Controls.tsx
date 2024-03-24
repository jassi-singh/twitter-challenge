import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Direction, insideBox } from "./App";
import Button from "./Button";

const Controls = ({
  setCurrentDirection,
  currentDirection,
  dotRef,
}: {
  setCurrentDirection: Dispatch<SetStateAction<Direction | null>>;
  currentDirection: Direction | null;
  dotRef?: React.RefObject<HTMLDivElement>;
}) => {
  const b1Ref = useRef<HTMLButtonElement>(null);
  const b2Ref = useRef<HTMLButtonElement>(null);
  const b3Ref = useRef<HTMLButtonElement>(null);
  const b4Ref = useRef<HTMLButtonElement>(null);

  const handleMouseDown = (direction: Direction) => () => {
    setCurrentDirection(direction);
  };

  const handleMouseUp = () => {
    setCurrentDirection(null);
  };

  useEffect(() => {
    if (dotRef?.current) {
      if (insideBox(b1Ref, dotRef)) {
        handleMouseDown("up")();
        console.log("up");
      } else if (insideBox(b2Ref, dotRef)) {
        handleMouseDown("left")();
        console.log("left");
      } else if (insideBox(b3Ref, dotRef)) {
        handleMouseDown("right")();
      } else if (insideBox(b4Ref, dotRef)) {
        handleMouseDown("down")();
      } else {
        handleMouseUp();
      }
    }
  }, [dotRef?.current?.getBoundingClientRect()]);

  return (
    <div className="w-full space-y-2 flex flex-col justify-center items-stretch h-full">
      <div className="flex justify-center">
        <Button
          ref={b1Ref}
          className={
            currentDirection == "up"
              ? "ring ring-yellow-500 text-yellow-500"
              : ""
          }
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown("up")}
        >
          &#8593;
        </Button>
      </div>
      <div className="flex justify-between">
        <Button
          ref={b2Ref}
          className={
            currentDirection == "left"
              ? "ring ring-yellow-500 text-yellow-500"
              : ""
          }
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown("left")}
        >
          &#8592;
        </Button>
        <Button
          ref={b3Ref}
          className={
            currentDirection == "right"
              ? "ring ring-yellow-500 text-yellow-500"
              : ""
          }
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown("right")}
        >
          &#8594;
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          ref={b4Ref}
          className={
            currentDirection == "down"
              ? "ring ring-yellow-500 text-yellow-500"
              : ""
          }
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown("down")}
        >
          &#8595;
        </Button>
      </div>
    </div>
  );
};

export default Controls;
