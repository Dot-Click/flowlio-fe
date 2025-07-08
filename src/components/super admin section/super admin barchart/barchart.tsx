import { ChartContainer } from "@/components/ui/chart";
import { type FC } from "react";
import { cn } from "@/lib/utils";
import { Flex } from "@/components/ui/flex";
import { SuperAdminChartGuides } from "./chartguides";
import { Stack } from "@/components/ui/stack";
import { Box, type BoxProps } from "@/components/ui/box";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { SuperAdminCalendarPopOver } from "./calendarpopover";

const chartData = [
  { project: "Jan", Completed: 16 },
  { project: "Feb", Completed: 25 },
  { project: "Mar", Completed: 23 },
  { project: "Apr", Completed: 13 },
  { project: "May", Completed: 20 },
  { project: "Jun", Completed: 14 },
  { project: "Jul", Completed: 22 },
  { project: "Aug", Completed: 21 },
  { project: "Sep", Completed: 11 },
  { project: "Oct", Completed: 22 },
  { project: "Nov", Completed: 33 },
  { project: "Dec", Completed: 45 },
];

export const SuperAdminBarChartComponent: FC<BoxProps> = ({
  className,
  ...props
}) => {
  return (
    <ComponentWrapper className={cn("p-4 relative", className)} {...props}>
      <Stack className="gap-5">
        <Flex className="max-lg:flex-col items-center justify-between">
          <Flex className="justify-between max-md:justify-start max-lg:w-full">
            <img src="/dashboard/stat.svg" alt="stat" className="size-5" />
            <h1 className="text-lg font-medium">Project Overview</h1>
          </Flex>

          <SuperAdminChartGuides className="gap-4 pt-1 max-md:mr-auto" />
          <SuperAdminCalendarPopOver />
        </Flex>
      </Stack>

      <Box className="absolute top-72 left-6 transform -translate-y-1/2 -rotate-90 origin-left text-sm font-light text-gray-600 max-md:top-80">
        No. of companies
      </Box>

      <ChartContainer className="mt-5 w-full h-[21.8rem]" config={{}}>
        <BarChart
          width={900}
          height={300}
          data={chartData}
          barGap={0}
          barCategoryGap="16%"
        >
          <CartesianGrid
            vertical={true}
            horizontal={true}
            stroke="#cccccc"
            strokeWidth={1}
            strokeDasharray="none"
            opacity={1}
          />

          <XAxis
            dataKey="project"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{
              fontSize: 12,
              fontWeight: 500,
              fill: "#666666",
              transform: "translateX(-50%)",
              textAnchor: "middle",
            }}
            interval={0}
          />
          <YAxis
            axisLine={true}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickCount={7}
            // label={{
            //   value: "Task",
            //   angle: -90,
            //   position: "insideLeft",
            //   offset: 10,
            //   style: { textAnchor: "middle", fontSize: 14 },
            // }}
          />

          <Bar
            dataKey="Completed"
            fill="#3f53b5"
            radius={[2, 2, 0, 0]}
            stackId="stack"
          />
          <Bar
            dataKey="Delayed"
            fill="#EF5350"
            radius={[2, 2, 0, 0]}
            stackId="stack"
          />
          <Bar
            dataKey="In-Progress"
            fill="#FFC107"
            radius={[4, 4, 0, 0]}
            stackId="stack"
          />
        </BarChart>
      </ChartContainer>
    </ComponentWrapper>
  );
};
