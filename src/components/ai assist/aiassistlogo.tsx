import { Flex } from "../ui/flex";
import { cn } from "@/lib/utils";
import type { FC } from "react";

interface AiAssistLogoProps {
  containerClassName?: string;
  isCompact?: boolean;
  className?: string;
}

export const AiAssistLogo: FC<AiAssistLogoProps> = ({
  containerClassName,
  isCompact = false,
  className,
}) => {
  return (
    <Flex
      className={cn(
        !isCompact && "justify-",
        "overflow-hidden",
        containerClassName
      )}
    >
      <img
        alt="logo"
        src="/general/planflowlogo.png"
        className={cn("max-w-34", className)}
      />
    </Flex>
  );
};
