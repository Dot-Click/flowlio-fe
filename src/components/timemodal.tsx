import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Play } from "lucide-react";
import { Center } from "./ui/center";
import { Flex } from "./ui/flex";
import { Stack } from "./ui/stack";

export default function TimeModal() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Simple timer logic
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  // Pause timer logic
  const handlePause = () => {
    if (isRunning && intervalId) {
      setIsRunning(false);
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Reset timer logic
  //   const handleReset = () => {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //       setIntervalId(null);
  //     }
  //     setIsRunning(false);
  //     setTimer(0);
  //   };

  // Format timer as HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Cleanup interval on unmount
  React.useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src="/dashboard/clock.svg"
          className="absolute bottom-0 right-12 size-10"
          alt="clock"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-3xl max-sm:w-full max-sm:h-full h-54 mb-10 mr-10 p-0 rounded-2xl"
      >
        <form className="flex flex-col gap-6 h-full bg-[#F5F5F5] rounded-2xl p-6">
          <Flex className="flex-row max-sm:flex-col gap-2 w-full justify-between">
            <Stack className="flex-1 max-sm:w-full gap-2">
              <label className="font-medium">
                Project<span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger className="rounded-full h-14 w-full py-6 border-none">
                  Select User
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">User 1</SelectItem>
                  <SelectItem value="user2">User 2</SelectItem>
                </SelectContent>
              </Select>
            </Stack>
            <Stack className="flex-1 max-sm:w-full gap-2">
              <label className="font-medium">
                Task<span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger className="rounded-full h-14 w-full py-6 border-none">
                  Select User
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">User 1</SelectItem>
                  <SelectItem value="user2">User 2</SelectItem>
                </SelectContent>
              </Select>
            </Stack>
            <Stack className="flex-1 gap-2">
              <label className="font-medium">
                Activity Type<span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger className="rounded-full h-14 w-full py-6 border-none">
                  Agenda
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agenda">Agenda</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </Stack>
          </Flex>
          <div className="flex items-center justify-end gap-4 mt-4">
            <span className="text-2xl font-mono font-bold">
              {formatTime(timer)}
            </span>
            {/* <Button
              type="button"
              className="rounded-full px-6 py-2 text-lg bg-red-500 hover:bg-red-600"
              onClick={handleReset}
              disabled={!isRunning && timer === 0}
            >
              Reset
            </Button> */}
            <Button
              type="button"
              className="cursor-pointer rounded-full px-6 py-4 h-14 text-lg bg-yellow-500 hover:bg-yellow-600"
              onClick={handlePause}
              disabled={!isRunning}
            >
              Pause
            </Button>
            <Button
              type="button"
              className="cursor-pointer rounded-full px-8 py-4 h-14 text-lg bg-[#47C363] hover:bg-[#47C363]/80"
              onClick={handleStart}
              disabled={isRunning}
            >
              <span className="flex items-center gap-2">
                <Center
                  className=" w-5 h-5 rounded-full border-2 border-white flex-shrink-0"
                  style={{ background: isRunning ? "#22c55e" : "transparent" }}
                >
                  <Play className="size-3 fill-white" />
                </Center>
                Start
              </span>
            </Button>
          </div>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
