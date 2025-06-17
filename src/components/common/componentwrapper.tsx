import { Box, type BoxProps } from "../ui/box";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const ComponentWrapper = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          "bg-slate-50 border-4 border-white rounded-lg shadow-component",
          className
        )}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
