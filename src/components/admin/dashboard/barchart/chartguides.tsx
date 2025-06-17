import { Flex, type FlexProps } from "@/components/ui/flex";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { type FC } from "react";

export const ChartGuides: FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex {...props}>
      <Center className="gap-1">
        <Box className="bg-green-500 rounded-full p-1" />
        <h1 className="text-xs">Completed</h1>
      </Center>
      <Center className="gap-1">
        <Box className="bg-yellow-400 rounded-full p-1" />
        <h1 className="text-xs">In-Progress</h1>
      </Center>
      <Center className="gap-1">
        <Box className="bg-red-500 rounded-full p-1" />
        <h1 className="text-xs">Delayed</h1>
      </Center>
    </Flex>
  );
};
