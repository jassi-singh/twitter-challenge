import React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`rounded-sm p-2 text-white bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-800 active:ring active:ring-yellow-500 active:text-yellow-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
