import {
  Brain,
  Image,
  Headset,
  CirclePlus,
  MessageSquareText,
} from "lucide-react";
import { Box } from "../ui/box";
import { useState } from "react";
import { Flex } from "../ui/flex";
import { Stack } from "../ui/stack";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const content = [
  {
    iconStyleBox: "bg-blue-100 p-1 rounded-full w-fit",
    titleChild: "Get real-time answers to queries",
    iconStyle: "text-blue-500 p-1",
    title: "Smart Chat Support",
    Icon: MessageSquareText,
  },
  {
    titleChild: "Quickly assign, track, and manage tasks.",
    iconStyleBox: "bg-red-100 p-1 rounded-full w-fit",
    iconStyle: "text-red-500 p-1",
    title: "Smart Chat Support",
    Icon: Headset,
  },
  {
    titleChild: "AI-powered suggestions to improve efficiency.",
    iconStyleBox: "bg-yellow-100 p-1 rounded-full w-fit",
    iconStyle: "text-yellow-500 p-1",
    title: "Automated Responses",
    Icon: Brain,
  },
];

export const AiAssistChat: React.FC<{ withoutWelcomeGrids?: boolean }> = ({
  withoutWelcomeGrids = false,
}) => {
  return (
    <>
      {!withoutWelcomeGrids && <WelcomeContent />}
      <ChatBox />
    </>
  );
};

const WelcomeContent = () => {
  return (
    <Stack className="items-center">
      <Box className="border border-blue-200 rounded-full p-1 bg-blue-50/50 w-fit">
        <img src="/general/planflowframe.png" alt="frame" className="size-16" />
      </Box>
      <h2 className="text-gray-500 text-sm">Hi there, 👋</h2>
      <h2 className="text-xl">How can I help?</h2>
      <Flex className="flex-wrap">
        {content.map((a, i) => (
          <Stack
            key={i}
            className="bg-zinc-100 border-1 border-gray-400 p-4 rounded-xl h-34 min-w-60 max-sm:w-fit flex-1"
          >
            <Flex className={a.iconStyleBox}>
              <a.Icon className={a.iconStyle} />
            </Flex>
            <h1 className="font-semibold">{a.title}</h1>
            <Box className="text-gray-500 text-xs">{a.titleChild}</Box>
          </Stack>
        ))}
      </Flex>
    </Stack>
  );
};

const ChatBox = () => {
  const [input, setInput] = useState("");
  return (
    <Stack className="w-full p-2 rounded-md border border-gray-300 sticky bottom-0 bg-white">
      <Input
        size="lg"
        value={input}
        placeholder="Type Something..."
        onChange={(e) => setInput(e.target.value)}
        className="bg-white border-none outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none shadow-none"
        style={{
          boxShadow: "none !important",
          outline: "none !important",
          border: "none !important",
        }}
      />

      <Flex className="gap-0">
        <Button variant={"ghost"} className="text-sm gap-1 text-gray-400">
          <CirclePlus className="size-4" />
          Upload Document
        </Button>
        <Button variant={"ghost"} className="text-sm gap-1 text-gray-400">
          <Image className="size-4" />
          Use Image
        </Button>
        <Button size="lg" className="ml-auto">
          Send
        </Button>
      </Flex>
    </Stack>
  );
};
