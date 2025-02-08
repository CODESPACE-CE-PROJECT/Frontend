import React, { forwardRef, ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
  className?: string;
  disabled?: boolean;
}

export const ConfirmButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`${className} bg-primary hover:bg-blue-800 py-3 rounded-md disabled:bg-blue-400`}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

ConfirmButton.displayName = "ConfirmButton";
