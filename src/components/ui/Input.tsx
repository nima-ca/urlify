import * as React from "react";

import { cn } from "@/lib/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={cn(
          `flex h-10 w-full rounded-md border ${
            error
              ? "border-red-500 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-300"
              : "border-slate-300 dark:border-slate-700 focus:ring-slate-400 dark:focus:ring-slate-400"
          } bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:text-slate-50  dark:focus:ring-offset-slate-900`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
