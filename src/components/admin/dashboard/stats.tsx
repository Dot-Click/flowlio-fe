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
import img1 from "/dashboard/1.svg";
import img2 from "/dashboard/2.svg";
import img3 from "/dashboard/3.svg";
import img4 from "/dashboard/4.svg";
import { Stack } from "@/components/ui/stack";
type Stat = {
  // icon: React.ForwardRefExoticComponent<
  //   Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement> | string
  // >;
  icon: string;
  title: string;
  count: string;
  description: string;
  link: string;
};

export const Stats: FC<{ className?: string }> = ({ className }) => {
  const stats: Stat[] = [
    {
      link: "/dashboard",
      title: "Total Clients",
      description: "Active users on the platform",
      icon: img1,
      count: "22",
    },
    {
      link: "/dashboard",
      title: "Active Projects",
      description: "Ongoing client projects",
      icon: img2,
      count: "20",
    },
    {
      link: "/dashboard",
      title: "Hours Tracked",
      description: "Time logged this week",
      icon: img3,
      count: "45",
    },
    {
      link: "/dashboard",
      title: "Pending Tasks",
      description: "Tasks in progress",
      icon: img4,
      count: "48",
    },
  ];

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
                      <h2 className="text-sm font-medium">{item.title}</h2>
                      <p className="text-sm font-light text-gray-500">
                        {item.description}
                      </p>
                    </Stack>
                    <img src={item.icon} className="size-10" alt={item.title} />
                  </Flex>
                  <p className="text-2xl font-bold mt-5">
                    {item.count}{" "}
                    {index === 2 && (
                      <span className="text-gray-400 font-light">hrs</span>
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
