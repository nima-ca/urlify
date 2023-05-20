import { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@src/lib/utils/cn";

const largeHeadingVariants = cva(
  "text-black dark:text-white lg:text-left leading-tight tracking-tighter",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:text-6xl",
        sm: "text-2xl md:text-3xl lg:text-4xl",
        lg: "text-5xl md:text-6xl lg:text-7xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof largeHeadingVariants> {}

const LargeHeading: FunctionComponent<HeadingProps> = forwardRef<
  HTMLHeadingElement,
  HeadingProps
>(({ size, children, className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      {...props}
      className={cn(largeHeadingVariants({ size, className }))}
    >
      {children}
    </h1>
  );
});

// for debugging purposes
LargeHeading.displayName = "LargeHeading";

export default LargeHeading;
