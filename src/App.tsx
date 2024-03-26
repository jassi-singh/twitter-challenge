import { useMemo, useRef, useState } from "react";
import Box from "./Box";
import Dot from "./Dot";
import Controls from "./Controls";
import { DOT_SIZE, TARGET_SIZE } from "./constants";
import TargetBox from "./Target";

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum Direction {
  up,
  down,
  left,
  right,
}

const randomPositionInBox = (objectSize: number): Pick<Position, "x" | "y"> => {
  return {
    x: Math.random() * (150 - objectSize),
    y: Math.random() * (150 - objectSize),
  };
};

const App = () => {
  const targetPosition: Position = useMemo(
    () => ({
      ...randomPositionInBox(TARGET_SIZE),
      width: TARGET_SIZE,
      height: TARGET_SIZE,
    }),
    []
  );

  const [dot1Position, setDot1Position] = useState<Position>({
    ...randomPositionInBox(DOT_SIZE),
    width: DOT_SIZE,
    height: DOT_SIZE,
  });
  const [dot2Position, setDot2Position] = useState<Position>({
    ...randomPositionInBox(DOT_SIZE),
    width: DOT_SIZE,
    height: DOT_SIZE,
  });
  const [dot3Position, setDot3Position] = useState<Position>({
    ...randomPositionInBox(DOT_SIZE),
    width: DOT_SIZE,
    height: DOT_SIZE,
  });

  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col justify-between items-center h-screen gap-4 py-4">
      <Box>
        <Dot {...dot3Position} />
        <TargetBox position={targetPosition} dotPosition={dot3Position} />
      </Box>

      <Box ref={box2Ref}>
        <Dot {...dot2Position} />
        <Controls
          setDotPosition={setDot3Position}
          parentBoxDot={dot2Position}
          parentBoxRef={box2Ref}
        />
      </Box>

      <Box ref={box1Ref}>
        <Dot {...dot1Position} />
        <Controls
          setDotPosition={setDot2Position}
          parentBoxDot={dot1Position}
          parentBoxRef={box1Ref}
        />
      </Box>

      <Controls master={true} setDotPosition={setDot1Position} />
    </div>
  );
};

export default App;
