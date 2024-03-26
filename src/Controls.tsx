import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "@phosphor-icons/react";
import Button from "./Button";
import { Direction, Position } from "./App";
import { DOT_SIZE, MOVEMENT, isDotInside } from "./constants";
import { useEffect, useMemo, useRef, useState } from "react";

const Controls = ({
  setDotPosition,
  parentBoxDot,
  parentBoxRef,
}: {
  setDotPosition: React.Dispatch<React.SetStateAction<Position>>;
  parentBoxRef?: React.RefObject<HTMLDivElement>;
  parentBoxDot?: Position;
}) => {
  const intervalRef = useRef<number | null>(null);

  const upBtnRef = useRef<HTMLButtonElement>(null);
  const downBtnRef = useRef<HTMLButtonElement>(null);
  const leftBtnRef = useRef<HTMLButtonElement>(null);
  const rightBtnRef = useRef<HTMLButtonElement>(null);

  const [activeButton, setActiveButton] = useState<Direction | null>(null);

  const {
    upBtnPos,
    downBtnPos,
    leftBtnPos,
    rightBtnPos,
  }: {
    upBtnPos: Position | null;
    downBtnPos: Position | null;
    leftBtnPos: Position | null;
    rightBtnPos: Position | null;
  } = useMemo(() => {
    if (
      upBtnRef.current &&
      downBtnRef.current &&
      leftBtnRef.current &&
      rightBtnRef.current &&
      parentBoxRef?.current
    ) {
      const parentRect = parentBoxRef.current.getBoundingClientRect();
      const upBtnRect = upBtnRef.current.getBoundingClientRect();
      const downBtnRect = downBtnRef.current.getBoundingClientRect();
      const leftBtnRect = leftBtnRef.current.getBoundingClientRect();
      const rightBtnRect = rightBtnRef.current.getBoundingClientRect();

      const upBtnPos = {
        x: upBtnRect.x - parentRect.x,
        y: upBtnRect.y - parentRect.y,
        height: upBtnRect.height,
        width: upBtnRect.width,
      };

      const downBtnPos = {
        x: downBtnRect.x - parentRect.x,
        y: downBtnRect.y - parentRect.y,
        height: downBtnRect.height,
        width: downBtnRect.width,
      };

      const leftBtnPos = {
        x: leftBtnRect.x - parentRect.x,
        y: leftBtnRect.y - parentRect.y,
        height: leftBtnRect.height,
        width: leftBtnRect.width,
      };

      const rightBtnPos = {
        x: rightBtnRect.x - parentRect.x,
        y: rightBtnRect.y - parentRect.y,
        height: rightBtnRect.height,
        width: rightBtnRect.width,
      };

      return {
        upBtnPos,
        downBtnPos,
        leftBtnPos,
        rightBtnPos,
      };
    } else {
      return {
        upBtnPos: null,
        downBtnPos: null,
        leftBtnPos: null,
        rightBtnPos: null,
      };
    }
  }, [
    upBtnRef.current,
    downBtnRef.current,
    leftBtnRef.current,
    rightBtnRef.current,
    parentBoxRef?.current,
  ]);

  const moveDot = (direction: Direction, start: boolean): number => {
    switch (direction) {
      case Direction.up:
        setDotPosition((state) => ({
          ...state,
          y: Math.max(state.y - MOVEMENT, 0),
        }));
        break;

      case Direction.down:
        setDotPosition((state) => ({
          ...state,
          y: Math.min(state.y + MOVEMENT, 150 - DOT_SIZE),
        }));
        break;

      case Direction.left:
        setDotPosition((state) => ({
          ...state,
          x: Math.max(state.x - MOVEMENT, 0),
        }));
        break;

      case Direction.right:
        setDotPosition((state) => ({
          ...state,
          x: Math.min(state.x + MOVEMENT, 150 - DOT_SIZE),
        }));
        break;
    }

    if (start)
      return setInterval(() => {
        moveDot(direction, false);
      }, 1000);

    return 0;
  };

  const handleMouseDown = (direction: Direction) => () => {
    if (intervalRef.current) return;
    intervalRef.current = moveDot(direction, true);
  };

  const handleMouseUp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!(parentBoxDot && upBtnPos && downBtnPos && leftBtnPos && rightBtnPos))
      return;

    if (isDotInside(parentBoxDot, upBtnPos)) {
      setActiveButton(Direction.up);
    } else if (isDotInside(parentBoxDot, downBtnPos)) {
      setActiveButton(Direction.down);
    } else if (isDotInside(parentBoxDot, leftBtnPos)) {
      setActiveButton(Direction.left);
    } else if (isDotInside(parentBoxDot, rightBtnPos)) {
      setActiveButton(Direction.right);
    } else {
      setActiveButton(null);
    }
  }, [parentBoxDot]);

  useEffect(() => {
    if (activeButton !== null) {
      console.log(activeButton);
      if (!intervalRef.current)
        intervalRef.current = moveDot(activeButton, true);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [activeButton]);

  return (
    <div className="w-32 m-auto flex flex-col justify-center items-center gap-2">
      <Button
        ref={upBtnRef}
        onMouseDown={handleMouseDown(Direction.up)}
        onMouseUp={handleMouseUp}
        isActive={activeButton === Direction.up}
      >
        <ArrowUp />
      </Button>
      <div className="flex justify-between w-full">
        <Button
          ref={leftBtnRef}
          onMouseDown={handleMouseDown(Direction.left)}
          onMouseUp={handleMouseUp}
          isActive={activeButton === Direction.left}
        >
          <ArrowLeft />
        </Button>

        <Button
          ref={rightBtnRef}
          onMouseDown={handleMouseDown(Direction.right)}
          onMouseUp={handleMouseUp}
          isActive={activeButton === Direction.right}
        >
          <ArrowRight />
        </Button>
      </div>
      <Button
        ref={downBtnRef}
        onMouseDown={handleMouseDown(Direction.down)}
        onMouseUp={handleMouseUp}
        isActive={activeButton === Direction.down}
      >
        <ArrowDown />
      </Button>
    </div>
  );
};

export default Controls;
