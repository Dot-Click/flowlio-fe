import { Box, type BoxProps } from "../ui/box";
import { cn } from "@/lib/utils";
import type { FC } from "react";

export const PageWrapper: FC<BoxProps> = ({ className, children }) => {
  return (
    <Box
      className={cn(
        "bg-gradient-to-r from-violet-50 via-slate-50 to-purple-50 border-[7px] border-white p-3 min-h-screen",
        className
      )}
    >
      {children}
    </Box>
  );
};
