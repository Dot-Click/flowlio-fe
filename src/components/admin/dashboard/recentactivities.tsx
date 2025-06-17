import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Box, type BoxProps } from "@/components/ui/box";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import type { FC } from "react";

export const RecentActivities: FC<BoxProps> = ({ className, ...props }) => {
  const activitiesContent = [
    {
      user: "John Doe",
      activity: "added new task to the schedule",
      date: "2 minutes ago",
    },
    {
      user: "Lima Charter",
      activity: "updated user permission",
      date: "20 minutes ago",
    },
    {
      user: "Noah Mitchell",
      activity: "delete an inactive project",
      date: "20 minutes ago",
    },
    {
      user: "Elijah Bennet",
      activity: "added new task to the schedule",
      date: "20 minutes ago",
    },
    {
      user: "Elijah Bennet",
      activity: "added new task to the schedule",
      date: "20 minutes ago",
    },
    {
      user: "Lima",
      activity: "added new task to the schedule",
      date: "20 minutes ago",
    },
    {
      user: "Elijah Bennet",
      activity: "added new task to the schedule",
      date: "20 minutes ago",
    },
    {
      user: "Elijah Bennet",
      activity: "added new task to the schedule",
      date: "20 minutes ago",
    },
    {
      user: "Lima",
      activity: "added new task to the schedule",
      date: "20 minutes ago",
    },
    {
      user: "Lima",
      activity: "added new task to the schedule",
      date: "20 minutes ago",
    },
  ];

  return (
    <ComponentWrapper className={cn("p-5 rounded-lg", className)} {...props}>
      <Stack>
        <h1 className="text-lg font-medium"> Recent Activities</h1>
        <img
          src="/general/curved-border-activities.svg"
          className="mt-2 mb-5"
          alt="curved"
        />
        <Box className="max-h-[28rem] overflow-auto scroll scroll space-y-5">
          {activitiesContent.map(({ activity, date, user }, key) => (
            <Link key={key} to={"#"} className="group block">
              <Flex className="items-start pl-1">
                <Box className="size-2.5 group-hover:size-3.5 transition-all ease-in border outline outline-slate-300 group-hover:outline-slate-400 outline-offset-1 bg-slate-200 group-hover:bg-primary rounded-full mt-[6.5px]" />
                <Stack className="gap-0">
                  <Flex>
                    <h2 className="font-medium text-sm">{user}</h2>
                    <p className="text-xs text-slate-500">{date}</p>
                  </Flex>
                  <p className="text-sm text-slate-500 group-hover:text-black">
                    {activity}
                  </p>
                </Stack>
              </Flex>
            </Link>
          ))}
        </Box>
      </Stack>
    </ComponentWrapper>
  );
};
