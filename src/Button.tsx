import React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  isActive: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isActive, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`p-2 bg-zinc-600 text-white hover:bg-zinc-700 active:ring active:ring-yellow-500 active:bg-zinc-800 ${
          isActive ? "ring ring-yellow-500" : ""
        }`}
      >
        {children}
      </button>
    );
  }
);

export default Button;
