import { ChartContainer } from "@/components/ui/chart";
import { type FC } from "react";
import { cn } from "@/lib/utils";
import { Flex } from "@/components/ui/flex";
import { SuperAdminChartGuides } from "./chartguides";
import { Stack } from "@/components/ui/stack";
import { type BoxProps } from "@/components/ui/box";
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { SuperAdminCalendarPopOver } from "./calendarpopover";
import { DiamondIcon } from "./diamondicon";

const chartData = [
  { project: "Jan", companies: 25, projectsCreated: 40 },
  { project: "Feb", companies: 15, projectsCreated: 25 },
  { project: "Mar", companies: 28, projectsCreated: 38 },
  { project: "Apr", companies: 35, projectsCreated: 40 },
  { project: "May", companies: 30, projectsCreated: 45 },
  { project: "Jun", companies: 14, projectsCreated: 30 },
  { project: "Jul", companies: 22, projectsCreated: 45 },
  { project: "Aug", companies: 21, projectsCreated: 35 },
  { project: "Sep", companies: 11, projectsCreated: 28 },
  { project: "Oct", companies: 22, projectsCreated: 38 },
  { project: "Nov", companies: 33, projectsCreated: 49 },
  { project: "Dec", companies: 45, projectsCreated: 55 },
];

export const SuperAdminBarChartComponent: FC<BoxProps> = ({
  className,
  ...props
}) => {
  const CustomDiamondDot = (props: any) => {
    const { cx, cy } = props;
    if (typeof cx !== "number" || typeof cy !== "number") return null;
    return (
      <g transform={`translate(${cx - 6}, ${cy - 8})`}>
        <DiamondIcon size={16} />
      </g>
    );
  };

  const HoverCustomDiamondDot = (props: any) => {
    const { cx, cy } = props;
    if (typeof cx !== "number" || typeof cy !== "number") return null;
    return (
      <g transform={`translate(${cx - 6}, ${cy - 8})`}>
        <DiamondIcon size={17} />
      </g>
    );
  };

  return (
    <ComponentWrapper className={cn("p-4", className)} {...props}>
      <Stack className="gap-5">
        <Flex className="max-lg:flex-col items-center justify-between">
          <Flex className="justify-between max-md:justify-start max-lg:w-full">
            <img src="/dashboard/stat.svg" alt="stat" className="size-5" />
            <h1 className="text-lg font-medium">Project Overview</h1>
          </Flex>

          <Flex className="gap-4">
            <SuperAdminChartGuides className="gap-4 pt-1 max-md:mr-auto" />
            <SuperAdminCalendarPopOver />
          </Flex>
        </Flex>
      </Stack>

      <ChartContainer className="mt-5 w-full h-[21.8rem] " config={{}}>
        <ComposedChart data={chartData}>
          <CartesianGrid
            vertical={true}
            horizontal={true}
            stroke="#cccccc"
            strokeWidth={1}
            strokeDasharray="none"
            opacity={0.6}
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
            padding={{ left: 15, right: 15 }}
          />

          <YAxis
            axisLine={true}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickCount={7}
            label={{
              value: "No. of companies",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: {
                textAnchor: "middle",
                fontSize: 14,
                fontWeight: 300,
                color: "#666666",
              },
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #cccccc",
              backgroundColor: "#ffffff",
              padding: "10px",
              fontSize: "12px",
              fontWeight: "500",
              color: "#666666",
              textTransform: "capitalize",
              textShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          />
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ea4864" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ea4864" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="projectsCreated"
            fill="url(#areaGradient)"
            stroke="#ea4864"
            dot={<CustomDiamondDot />}
            activeDot={<HoverCustomDiamondDot />}
            fillOpacity={1}
            strokeWidth={0}
          />

          <Bar dataKey="companies" barSize={30} fill="#3f53b5" />
        </ComposedChart>
      </ChartContainer>
    </ComponentWrapper>
  );
};
