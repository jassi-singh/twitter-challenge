import React from "react";
import { BOX_SIZE } from "./constants";

const Box = React.forwardRef<HTMLDivElement, React.PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        style={{ height: BOX_SIZE, width: BOX_SIZE }}
        className="box-content border-2 border-dashed border-black relative flex items-center justify-center"
      >
        {children}
      </div>
    );
  }
);

export default Box;
