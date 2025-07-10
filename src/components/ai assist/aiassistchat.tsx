import {
  Brain,
  Image,
  Headset,
  CirclePlus,
  MessageSquareText,
  Send,
} from "lucide-react";
import { Box } from "../ui/box";
import { useState } from "react";
import { Flex } from "../ui/flex";
import { Stack } from "../ui/stack";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import React from "react";
import { useAiAssistChatStore } from "@/store/aiassistchat.store";

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
  const { chats, activeChatId, addChat, addMessage, setActiveChat } =
    useAiAssistChatStore();
  const activeChat = chats.find((c) => c.id === activeChatId);

  // Only show welcome grid if there are no messages and not explicitly hidden
  const showWelcome =
    !withoutWelcomeGrids && (!activeChat || activeChat.messages.length === 0);

  // Handler to send a message
  const handleSend = (input: string, setInput: (v: string) => void) => {
    if (!input.trim()) return;
    let chatId = activeChatId;
    // If no active chat, create one
    if (!chatId) {
      chatId = addChat({ title: "New Chat", messages: [] });
      setActiveChat(chatId);
    }
    addMessage(chatId, { role: "user", text: input });
    setInput("");
    setTimeout(() => {
      addMessage(chatId!, {
        role: "ai",
        text: `AI: You said, "${input}". (This is a demo response.)`,
      });
    }, 600);
  };

  return (
    <Center className="flex-col h-full min-h-[300px] w-full max-w-full p-2">
      {showWelcome ? <WelcomeContent /> : null}
      <ChatBox
        messages={activeChat?.messages || []}
        onSend={handleSend}
        showWelcome={showWelcome}
      />
    </Center>
  );
};

const WelcomeContent = () => {
  return (
    <Stack className="w-full max-w-3xl mx-auto items-center justify-center bg-gradient-to-r from-[#F2F2F2] to-[#f0f2f7] h-full p-2">
      <img
        src="/dashboard/ailogocircleicon.svg"
        alt="frame"
        className="size-20"
      />
      <h2 className="text-gray-500 text-sm mt-6">Hi there, 👋</h2>
      <h2 className="text-xl">How can I help?</h2>
      <Flex className="flex-wrap w-full gap-2 justify-center max-sm:flex-col overflow-hidden">
        {content.map((a, i) => (
          <Stack
            key={i}
            className="bg-zinc-100 border-1 border-gray-400 p-4 rounded-xl h-34  flex-1 w-56"
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

const ChatBox: React.FC<{
  messages: { role: "user" | "ai"; text: string }[];
  onSend: (input: string, setInput: (v: string) => void) => void;
  showWelcome: boolean;
}> = ({ messages, onSend, showWelcome }) => {
  const [input, setInput] = useState("");
  const chatRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendClick = () => onSend(input, setInput);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendClick();
  };
  return (
    <Center
      className={`flex-col w-full max-w-3xl mx-auto mb-4 max-md:p-2 ${
        showWelcome ? "" : "flex-1 h-full"
      }`}
    >
      {/* Chat history */}
      {messages.length === 0 ? (
        <></>
      ) : (
        <Stack
          ref={chatRef}
          className={`w-full max-w-3xl mx-auto p-2 mb-4 rounded-md border border-gray-300 bg-white ${
            showWelcome
              ? "min-h-[200px] max-h-[400px]"
              : "flex-1 h-full min-h-[300px] max-h-[60vh]"
          } overflow-y-auto`}
          style={{ transition: "max-height 0.2s" }}
        >
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center w-full">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg, idx) => (
              <Flex
                key={idx}
                className={
                  msg.role === "user" ? "justify-end" : "justify-start"
                }
              >
                <div
                  className={
                    msg.role === "user"
                      ? "bg-blue-100 text-blue-900 rounded-xl px-4 py-2 m-1 max-w-[70%]"
                      : "bg-gray-100 text-gray-800 rounded-xl px-4 py-2 m-1 max-w-[70%]"
                  }
                >
                  {msg.text}
                </div>
              </Flex>
            ))
          )}
        </Stack>
      )}

      {/* Input area */}
      <Stack className="w-full max-w-3xl mx-auto p-2 mb-4 rounded-md border border-gray-300 sticky bottom-0 bg-white">
        <Input
          size="lg"
          value={input}
          placeholder="Ask me anything..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-white border-none outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none shadow-none"
          style={{
            boxShadow: "none !important",
            outline: "none !important",
            border: "none !important",
          }}
        />
        <Flex className="gap-0 flex-wrap">
          <Button variant={"ghost"} className="text-sm gap-1 text-gray-400">
            <CirclePlus className="size-4" />
            Upload Document
          </Button>
          <Button variant={"ghost"} className="text-sm gap-1 text-gray-400">
            <Image className="size-4" />
            Use Image
          </Button>
          <Button
            size="lg"
            className="ml-auto bg-[#0c89af] rounded-full h-9 w-9 cursor-pointer"
            onClick={handleSendClick}
            aria-label="Send"
          >
            <Send className="text-white" />
          </Button>
        </Flex>
      </Stack>

      <p className="text-sm text-black text-center w-full">
        Check our
        <span className="text-blue-500 cursor-pointer underline">
          {" "}
          Help Center{" "}
        </span>
        contact support for assistance.
      </p>
    </Center>
  );
};
