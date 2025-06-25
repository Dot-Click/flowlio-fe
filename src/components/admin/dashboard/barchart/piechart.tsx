import { type FC } from "react";
import { cn } from "@/lib/utils";
import { Box, type BoxProps } from "@/components/ui/box";
import { PieChart, Pie, Cell } from "recharts";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import Img1 from "/dashboard/prostat1.svg";
import Img2 from "/dashboard/prostat2.svg";
import Img3 from "/dashboard/projstat3.svg";

const data = [
  { name: "Ongoing", value: 10.61, icon: Img2, color: "#FFE000" },
  { name: "Delayed", value: 18.46, icon: Img3, color: "#F50057" },
  { name: "Finished", value: 70.93, icon: Img1, color: "#3f53b5" },
];

export const ProjectStatusPieChart: FC<BoxProps> = ({
  className,
  ...props
}) => {
  return (
    <ComponentWrapper className={cn("p-4 max-md:w-full", className)} {...props}>
      <Stack className="gap-2 w-full">
        <Flex className="items-center justify-between">
          <h1 className="text-lg font-medium">Project Status</h1>
        </Flex>

        <Box className="max-sm:w-full flex flex-col max-md:justify-center max-md:items-center">
          <PieChart className="w-full" width={220} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={110}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          <div className=" w-full">
            <div className="flex justify-center gap-6">
              {data.map((item, index) => (
                <Flex key={index} className="flex-col items-center gap-1">
                  <img src={item.icon} alt={item.name} />
                  <h1>{item.value} %</h1>
                  <h1 className="text-[12px] text-gray-400 flex-col">
                    {item.name}
                  </h1>
                </Flex>
              ))}
            </div>
          </div>
        </Box>
      </Stack>
    </ComponentWrapper>
  );
};
