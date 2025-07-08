import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Flex } from "@/components/ui/flex";
import { Box } from "@/components/ui/box";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import type { FC } from "react";

import { Stack } from "@/components/ui/stack";

export type Stat = {
  // icon: React.ForwardRefExoticComponent<
  //   Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement> | string
  // >;
  icon: string;
  title: string;
  count: string;
  description: string;
  link: string;
};

export const Stats: FC<{
  className?: string;
  classNameDescription?: string;
  stats: Stat[];
  isSuperAdmin?: boolean;
}> = ({ classNameDescription, className, stats, isSuperAdmin }) => {
  return (
    <Box
      className={cn(
        "grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {stats.map((item, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ComponentWrapper
                key={index}
                className="px-3 py-3 relative overflow-hidden cursor-pointer"
              >
                <Link to={item.link}>
                  <Flex className="justify-between items-center">
                    <Stack className="gap-0">
                      <h2 className=" font-semibold">{item.title}</h2>
                      <p
                        className={cn(
                          "font-light text-gray-500 text-sm",
                          classNameDescription
                        )}
                      >
                        {item.description}
                      </p>
                    </Stack>
                    <img src={item.icon} className="size-10" alt={item.title} />
                  </Flex>
                  <p className="text-2xl font-bold mt-5">
                    {item.count}{" "}
                    {index === 2 && (
                      <span
                        className={cn(
                          "text-gray-400 font-light",
                          isSuperAdmin && "hidden"
                        )}
                      >
                        hrs
                      </span>
                    )}
                  </p>
                </Link>
              </ComponentWrapper>
            </TooltipTrigger>
            <TooltipContent className="mb-2">
              <p>Click to view {item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </Box>
  );
};
