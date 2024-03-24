import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Dot from "./Dot";
import RandomPlacer from "./RandomPlacer";
import Box from "./box";
import Controls from "./Controls";
const MOVEMENT = 10;
const BOX_SIZE = 150;
const DOT_SIZE = 10;
const TARGET_SIZE = 50;

export interface Position {
  top: number;
  left: number;
}
export type Direction = "up" | "down" | "left" | "right";

export const insideBox = (
  targetRef: React.RefObject<HTMLDivElement | HTMLButtonElement>,
  dotRef: React.RefObject<HTMLDivElement>
): boolean => {
  const targetRect = targetRef.current!.getBoundingClientRect();
  const dotRect = dotRef.current!.getBoundingClientRect();

  if (
    dotRect.x > targetRect.x &&
    dotRect.x + dotRect.width < targetRect.x + targetRect.width &&
    dotRect.y > targetRect.y &&
    dotRect.y + dotRect.height < targetRect.y + targetRect.height
  ) {
    return true;
  } else return false;
};

function App() {
  const targetBoxPosition: Position = useMemo(
    () => ({
      top: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - TARGET_SIZE - 2),
      left: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - TARGET_SIZE - 2),
    }),
    []
  );

  const targetRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);

  const [dotPosition, setDotPosition] = useState<Position>({
    top: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - DOT_SIZE),
    left: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - DOT_SIZE),
  });

  const [dot2Position, setDot2Position] = useState<Position>({
    top: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - DOT_SIZE),
    left: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - DOT_SIZE),
  });

  const [dot3Position, setDot3Position] = useState<Position>({
    top: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - DOT_SIZE),
    left: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - DOT_SIZE),
  });

  const [currentDirection, setCurrentDirection] = useState<Direction | null>(
    null
  );
  const [currentDirection2, setCurrentDirection2] = useState<Direction | null>(
    null
  );
  const [currentDirection3, setCurrentDirection3] = useState<Direction | null>(
    null
  );
  const [success, setSuccess] = useState<boolean>(false);

  // const reset = () => {
  //   setDotPosition({
  //     top: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - DOT_SIZE),
  //     left: Math.min(Math.random() * BOX_SIZE, BOX_SIZE - DOT_SIZE),
  //   });
  //   setSuccess(false);
  // };

  const moveDot = (
    direction: Direction,
    setDotPosition: (value: React.SetStateAction<Position>) => void
  ) => {
    if (insideBox(targetRef, dot3Ref)) {
      setSuccess(true);
      return;
    }

    setDotPosition((state) => {
      switch (direction) {
        case "up":
          return {
            ...state,
            top: Math.max(state.top - MOVEMENT, 0),
          };

        case "down":
          return {
            ...state,
            top: Math.min(state.top + MOVEMENT, BOX_SIZE - DOT_SIZE),
          };
        case "right":
          return {
            ...state,
            left: Math.min(state.left + MOVEMENT, BOX_SIZE - DOT_SIZE),
          };
        case "left":
          return {
            ...state,
            left: Math.max(state.left - MOVEMENT, 0),
          };
      }
    });
  };

  useEffect(() => {
    let intervalId: number | undefined;
    if (currentDirection) {
      moveDot(currentDirection, setDotPosition);
      intervalId = setInterval(() => {
        moveDot(currentDirection, setDotPosition);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentDirection]);

  useEffect(() => {
    let intervalId: number | undefined;
    if (currentDirection2) {
      moveDot(currentDirection2, setDot2Position);
      intervalId = setInterval(() => {
        moveDot(currentDirection2, setDot2Position);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentDirection2]);

  useEffect(() => {
    let intervalId: number | undefined;
    if (currentDirection3) {
      moveDot(currentDirection3, setDot3Position);
      intervalId = setInterval(() => {
        moveDot(currentDirection3, setDot3Position);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentDirection3]);

  useEffect(() => {
    const keyDownEvent = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setCurrentDirection("up");
          break;

        case "ArrowDown":
          setCurrentDirection("down");
          break;

        case "ArrowLeft":
          setCurrentDirection("left");
          break;

        case "ArrowRight":
          setCurrentDirection("right");
          break;
        default:
          break;
      }
    };

    const keyUpEvent = (_e: KeyboardEvent) => {
      setCurrentDirection(null);
    };

    document.addEventListener("keydown", keyDownEvent);
    document.addEventListener("keyup", keyUpEvent);

    return () => {
      document.removeEventListener("keydown", keyDownEvent);
      document.removeEventListener("keyup", keyUpEvent);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col gap-8 items-center justify-center">
      {success && (
        <h1 className="text-xl font-bold text-green-500">You won 🎉🎉</h1>
      )}

      <Box height={BOX_SIZE} width={BOX_SIZE} className="border-black">
        <RandomPlacer ref={targetRef} {...targetBoxPosition}>
          <Box
            height={TARGET_SIZE}
            width={TARGET_SIZE}
            className={`border-dashed border-blue-500 ${
              success ? "bg-blue-300" : ""
            }`}
          />
        </RandomPlacer>
        <RandomPlacer ref={dot3Ref} {...dot3Position}>
          <Dot size={DOT_SIZE} />
        </RandomPlacer>
      </Box>

      <Box height={BOX_SIZE} width={BOX_SIZE} className="border-black">
        <RandomPlacer ref={dot2Ref} {...dot2Position}>
          <Dot size={DOT_SIZE} />
        </RandomPlacer>

        <Controls
          dotRef={dot2Ref}
          currentDirection={currentDirection3}
          setCurrentDirection={setCurrentDirection3}
        />
      </Box>

      <Box height={BOX_SIZE} width={BOX_SIZE} className="border-black">
        <RandomPlacer ref={dotRef} {...dotPosition}>
          <Dot size={DOT_SIZE} />
        </RandomPlacer>

        <Controls
          dotRef={dotRef}
          currentDirection={currentDirection2}
          setCurrentDirection={setCurrentDirection2}
        />
      </Box>
      <div className="h-32 w-32">
        <Controls
          currentDirection={currentDirection}
          setCurrentDirection={setCurrentDirection}
        />
      </div>
    </div>
  );
}

export default App;
