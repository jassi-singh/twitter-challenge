import React from "react";

export interface BoxProps extends React.HTMLProps<HTMLDivElement> {
  height: number;
  width: number;
}

const Box = ({ children, height, width, className }: BoxProps) => {
  return (
    <div
      style={{ height, width }}
      className={`box-content relative border ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
