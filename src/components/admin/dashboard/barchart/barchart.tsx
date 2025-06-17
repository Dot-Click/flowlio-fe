import {
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type FC } from "react";
import { cn } from "@/lib/utils";
import { Flex } from "@/components/ui/flex";
import { ChartGuides } from "./chartguides";
import { Stack } from "@/components/ui/stack";
import { Curve } from "@/components/common/curve";
import { ChartNoAxesCombined } from "lucide-react";
import { CalendarPopOver } from "./calendarpopover";
import { type BoxProps } from "@/components/ui/box";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ComponentWrapper } from "@/components/common/componentwrapper";

const chartData = [
  { project: "Project A", Completed: 186, "In-Progress": 80, Delayed: 86 },
  { project: "Project B", Completed: 205, "In-Progress": 100, Delayed: 50 },
  { project: "Project C", Completed: 23, "In-Progress": 120, Delayed: 90 },
  { project: "Project D", Completed: 73, "In-Progress": 190, Delayed: 30 },
  { project: "Project E", Completed: 260, "In-Progress": 130, Delayed: 80 },
  { project: "Project F", Completed: 214, "In-Progress": 40, Delayed: 114 },
  { project: "Project G", Completed: 212, "In-Progress": 200, Delayed: 112 },
  { project: "Project H", Completed: 21, "In-Progress": 180, Delayed: 12 },
  { project: "Project I", Completed: 181, "In-Progress": 100, Delayed: 2 },
  { project: "Project J", Completed: 221, "In-Progress": 120, Delayed: 21 },
  { project: "Project K", Completed: 101, "In-Progress": 280, Delayed: 8 },
];

export const BarChartComponent: FC<BoxProps> = ({ className, ...props }) => {
  return (
    <ComponentWrapper className={cn("p-5", className)} {...props}>
      <Stack className="gap-5">
        <Flex className="max-lg:flex-col items-start justify-between">
          <Flex className="max-md:justify-between max-lg:w-full">
            <ChartNoAxesCombined />
            <h1 className="text-lg font-medium">Project Schedule</h1>
            <CalendarPopOver />
          </Flex>

          <ChartGuides className="gap-4 pt-1" />
        </Flex>
        <Curve />
      </Stack>
      <ChartContainer className="mt-5" config={{}}>
        <BarChart accessibilityLayer data={chartData} barGap={0}>
          <CartesianGrid vertical={false} />
          <XAxis
            tickMargin={10}
            tickLine={false}
            axisLine={false}
            dataKey="project"
            tickFormatter={(value) => value.slice(0, 12)}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={20}
            tickCount={8}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar
            dataKey="Completed"
            className="fill-green-500 capitalize"
            radius={2}
          />
          <Bar
            dataKey="In-Progress"
            className="fill-yellow-400 capitalize"
            radius={2}
          />
          <Bar
            dataKey="Delayed"
            className="fill-red-500 capitalize"
            radius={2}
          />
        </BarChart>
      </ChartContainer>
    </ComponentWrapper>
  );
};
