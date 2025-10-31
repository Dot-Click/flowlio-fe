import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Box, type BoxProps } from "@/components/ui/box";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import type { FC } from "react";
import { useFetchOrganizationActivities } from "@/hooks/useFetchOrganizationActivities";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import { Center } from "@/components/ui/center";

export const RecentActivities: FC<BoxProps> = ({ className, ...props }) => {
  const { data: activitiesResponse, isLoading } =
    useFetchOrganizationActivities();

  const activitiesContent = activitiesResponse?.data?.activities || [];

  return (
    <ComponentWrapper className={cn(" rounded-lg", className)} {...props}>
      <Stack className="p-3 relative overflow-hidden">
        <h1 className="text-lg font-medium"> Recent Activities</h1>

        <Box className="w-full h-0.5 bg-gray-200 rounded-full absolute top-14 left-0"></Box>
        <Box className="max-h-[21rem] overflow-auto scroll space-y-5 mt-5">
          {isLoading ? (
            <Center className="py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </Center>
          ) : activitiesContent.length > 0 ? (
            activitiesContent.map(({ id, activity, date, user }) => {
              const dateObj = typeof date === "string" ? new Date(date) : date;
              const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true });

              return (
                <Link key={id} to={"#"} className="group block">
                  <Flex className="items-start pl-1">
                    <Box className="size-2.5 group-hover:size-3.5 transition-all ease-in border outline outline-slate-300 group-hover:outline-slate-400 outline-offset-1 bg-slate-200 group-hover:bg-primary rounded-full mt-[6.5px]" />
                    <Stack className="gap-0">
                      <Flex>
                        <h2 className="font-medium text-[13px]">{user}</h2>
                        <p className="text-xs text-slate-500 ml-2">{timeAgo}</p>
                      </Flex>
                      <p className="text-sm text-slate-500 group-hover:text-black">
                        {activity}
                      </p>
                    </Stack>
                  </Flex>
                </Link>
              );
            })
          ) : (
            <Center className="py-8">
              <p className="text-sm text-gray-500">No recent activities</p>
            </Center>
          )}
        </Box>
      </Stack>
    </ComponentWrapper>
  );
};
