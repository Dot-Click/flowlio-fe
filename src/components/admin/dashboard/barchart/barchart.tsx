import { ChartContainer } from "@/components/ui/chart";
import { type FC } from "react";
import { cn } from "@/lib/utils";
import { Flex } from "@/components/ui/flex";
import { ChartGuides } from "./chartguides";
import { Stack } from "@/components/ui/stack";
import { CalendarPopOver } from "./calendarpopover";
import { Box, type BoxProps } from "@/components/ui/box";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ComponentWrapper } from "@/components/common/componentwrapper";

const chartData = [
  { project: "Project A", Completed: 16, "In-Progress": 18, Delayed: 20 },
  { project: "Project B", Completed: 25, "In-Progress": 10, Delayed: 50 },
  { project: "Project C", Completed: 23, "In-Progress": 10, Delayed: 30 },
  { project: "Project D", Completed: 13, "In-Progress": 10, Delayed: 30 },
  { project: "Project E", Completed: 60, "In-Progress": 30, Delayed: 10 },
  { project: "Project F", Completed: 14, "In-Progress": 40, Delayed: 14 },
  { project: "Project G", Completed: 22, "In-Progress": 20, Delayed: 22 },
  { project: "Project H", Completed: 21, "In-Progress": 10, Delayed: 12 },
  { project: "Project I", Completed: 11, "In-Progress": 30, Delayed: 2 },
  { project: "Project J", Completed: 22, "In-Progress": 20, Delayed: 21 },
  { project: "Project K", Completed: 33, "In-Progress": 20, Delayed: 18 },
  { project: "Project L", Completed: 44, "In-Progress": 10, Delayed: 8 },
  { project: "Project O", Completed: 23, "In-Progress": 30, Delayed: 21 },
];

export const BarChartComponent: FC<BoxProps> = ({ className, ...props }) => {
  return (
    <ComponentWrapper className={cn("p-4 relative", className)} {...props}>
      <Stack className="gap-5">
        <Flex className="max-lg:flex-col items-center justify-between">
          <Flex className="justify-between max-md:justify-start max-lg:w-full">
            <img src="/dashboard/stat.svg" alt="stat" className="size-5" />
            <h1 className="text-lg font-medium">Project Schedule Overview</h1>
          </Flex>

          <ChartGuides className="gap-4 pt-1 max-md:mr-auto" />
          <CalendarPopOver />
        </Flex>
      </Stack>

      <Box className="absolute top-65 left-6 transform -translate-y-1/2 -rotate-90 origin-left text-sm max-sm:hidden font-light text-gray-600 max-md:top-80">
        Task
      </Box>

      <ChartContainer
        className="mt-5 w-full max-sm:-ml-6  h-[21.8rem] max-sm:h-[16rem] max-sm:overflow-x-scroll"
        config={{}}
      >
        <BarChart
          width={900}
          height={300}
          data={chartData}
          barGap={0}
          barCategoryGap="16%"
          className="max-sm:overflow-x-scroll"
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
