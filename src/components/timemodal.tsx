import { useState } from "react";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Center } from "./ui/center";
import { Flex } from "./ui/flex";
import { Stack } from "./ui/stack";
import { Box } from "./ui/box";

export default function TimeModal() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useState(false);

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
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 size-11 z-50 bg-transparent border-none p-0 hover:bg-transparent cursor-pointer"
        style={{ outline: "none" }}
        aria-label="Open timer"
      >
        <img src="/dashboard/clock.svg" className="size-11" alt="clock" />
      </Button>

      {open && (
        <Stack className="fixed bottom-6 right-6 z-50 items-end pointer-events-none gap-0">
          <Box className="bg-white rounded-2xl shadow-xl w-[700px] max-lg:w-[500px] max-sm:w-[300px] max-w-full max-h-[90vh] p-0 pointer-events-auto relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 size-8 hover:text-gray-700 text-xl cursor-pointer bg-red-400 text-white rounded-full pb-1"
              aria-label="Close timer"
              type="button"
            >
              x
            </button>
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

                <Stack className="flex-1 max-sm:w-full gap-2">
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
              <Flex className="items-center justify-end max-sm:flex-col gap-4 mt-4">
                <span className="text-2xl font-mono font-bold">
                  {formatTime(timer)}
                </span>
                <Button
                  type="button"
                  className="cursor-pointer rounded-full px-6 py-4 h-14 text-lg max-sm:text-sm bg-yellow-500 hover:bg-yellow-600"
                  onClick={handlePause}
                  disabled={!isRunning}
                >
                  Pause
                </Button>
                <Button
                  type="button"
                  className="cursor-pointer rounded-full px-8 py-4 max-sm:px-4 max-sm:py-2 h-14 text-lg bg-[#47C363] hover:bg-[#47C363]/80"
                  onClick={handleStart}
                  disabled={isRunning}
                >
                  <span className="flex items-center gap-2">
                    <Center
                      className="w-5 h-5 rounded-full border-2 border-white flex-shrink-0"
                      style={{
                        background: isRunning ? "#22c55e" : "transparent",
                      }}
                    >
                      <Play className="size-3 fill-white" />
                    </Center>
                    Start
                  </span>
                </Button>
              </Flex>
            </form>
          </Box>
        </Stack>
      )}
    </>
  );
}
