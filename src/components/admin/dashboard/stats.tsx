import {
  Rocket,
  Hourglass,
  ListChecks,
  CalendarCheck,
  type LucideProps,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Center } from "@/components/ui/center";
import { Flex } from "@/components/ui/flex";
import { Box } from "@/components/ui/box";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import type { FC } from "react";

type Stat = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  count: string;
  link: string;
};

export const Stats: FC<{ className?: string }> = ({ className }) => {
  const stats: Stat[] = [
    {
      link: "/dashboard/schedule/pending-schedule",
      title: "Pending Approvals",
      icon: Hourglass,
      count: "22",
    },
    {
      link: "/dashboard/schedule/current-schedule",
      title: "Active Schedules",
      icon: CalendarCheck,
      count: "20",
    },
    {
      link: "/dashboard/project",
      title: "Total Projects",
      icon: Rocket,
      count: "45",
    },
    {
      link: "/dashboard/task-management",
      title: "Total Tasks",
      icon: ListChecks,
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
                className="px-4 py-5 relative overflow-hidden cursor-pointer"
              >
                <Link to={item.link}>
                  <Flex className="justify-between items-center">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <Center className="bg-white border border-slate-200/70  size-16 rounded-full absolute -top-4 -right-4">
                      <item.icon size={20} className="opacity-85" />
                    </Center>
                  </Flex>
                  <p className="text-2xl font-bold mt-5">{item.count}</p>
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
