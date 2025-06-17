import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { PopoverContent, PopoverTrigger } from "../../ui/popover";
import { EllipsisVertical, PanelLeftOpen } from "lucide-react";
import { Box, type BoxProps } from "@/components/ui/box";
import { Progress } from "@/components/ui/progress";
import { Popover } from "@radix-ui/react-popover";
import { MyTaskStep } from "@/pages/mytask.page";
import { Stack } from "@/components/ui/stack";
import { Badge } from "@/components/ui/badge";
import { Flex } from "@/components/ui/flex";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { type FC } from "react";

interface MyOngoingtTaskCardProps extends BoxProps {
  assignees: Array<{ src: string; userName: string }>;
  createdAt: string | undefined;
  createdBy: string;
  taskName: string;
  goToStep: (step: MyTaskStep, data?: any, force?: boolean) => void;
}

export const MyOngoingtTaskCard: FC<MyOngoingtTaskCardProps> = ({
  createdAt,
  assignees,
  createdBy,
  className,
  taskName,
  goToStep,
  ...props
}) => {
  return (
    <Box
      className={cn(
        "bg-white/50 border border-gray-200 rounded-xl p-3",
        className
      )}
      {...props}
    >
      <Stack className="bg-zinc-200 p-4 rounded-md gap-6">
        <Flex className="justify-between">
          <Box className="bg-black p-2 rounded-full">
            <PanelLeftOpen className="text-white size-4" />
          </Box>
          <Flex>
            <p className="text-sm bg-white rounded-full py-1 px-2.5">
              {createdAt}
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <EllipsisVertical className="size-4 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-30 p-0 rounded-lg overflow-hidden">
                <Stack className="gap-0 ">
                  <Button
                    className="cursor-pointer hover:bg-gray-100 bg-transparent text-black rounded-none  border-b border-gray-300 p-2 w-full"
                    onClick={() => goToStep("Create Issue")}
                  >
                    Create Issue
                  </Button>
                  <Button
                    className="cursor-pointer hover:bg-gray-100 bg-transparent text-black rounded-none p-2 w-full"
                    onClick={() => goToStep("Create Issue")}
                  >
                    Update
                  </Button>
                </Stack>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>

        <h1 className="text-xl font-semibold capitalize">
          {taskName.substring(0, 26).concat("...")}
        </h1>
        <Flex>
          <p className="text-sm text-gray-500">Create by:</p>
          <p className="capitalize text-sm">{createdBy}</p>
        </Flex>
      </Stack>

      <Flex className="mt-6 justify-between">
        <Badge
          className="border-blue-600 text-blue-600 rounded-sm py-1.5 px-3"
          variant="outline"
        >
          <Box className="bg-blue-600 p-1 rounded-full"></Box>
          Ongoing
        </Badge>

        <Flex className="-space-x-5">
          {assignees.map(({ src, userName }, key) => (
            <TooltipProvider key={key}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="relative hover:z-1 border-2 border-white size-10">
                    <AvatarImage src={src} alt={userName} />
                    <AvatarFallback>{userName}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="capitalize">{userName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </Flex>
      </Flex>

      <Progress value={22} className="w-full min-h-0.5 mt-6" />
      <Flex className="justify-between mb-2">
        <h5 className="text-gray-500 text-sm">Progress</h5>
        <p className="text-sm">65%</p>
      </Flex>
    </Box>
  );
};
