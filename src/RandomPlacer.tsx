import React from "react";
import { Position } from "./App";

export interface RandomPlacerProps extends Position {}

const RandomPlacer = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<RandomPlacerProps>
>(({ children, top, left }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top,
        left,
      }}
      className="transition-all duration-1000"
    >
      {children}
    </div>
  );
});

export default RandomPlacer;
