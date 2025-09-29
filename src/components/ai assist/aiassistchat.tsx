import {
  Brain,
  Headset,
  MessageSquareText,
  Send,
  Upload,
  FileText,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Box } from "../ui/box";
import { useState, useRef } from "react";
import { Flex } from "../ui/flex";
import { Stack } from "../ui/stack";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import React from "react";
import { useAiAssistChatStore } from "@/store/aiassistchat.store";
import { useUser } from "@/providers/user.provider";
import { useEffect } from "react";

const content = [
  {
    iconStyleBox: "bg-blue-100 p-1 rounded-full w-fit",
    titleChild: "Ask me anything - from general knowledge to trivia!",
    iconStyle: "text-blue-500 p-1",
    title: "General Questions",
    Icon: MessageSquareText,
  },
  {
    titleChild: "Brainstorm ideas, write content, and solve problems.",
    iconStyleBox: "bg-purple-100 p-1 rounded-full w-fit",
    iconStyle: "text-purple-500 p-1",
    title: "Creative Writing",
    Icon: Headset,
  },
  {
    titleChild: "Get help with productivity, organization, and planning.",
    iconStyleBox: "bg-green-100 p-1 rounded-full w-fit",
    iconStyle: "text-green-500 p-1",
    title: "Productivity",
    Icon: Brain,
  },
];

export const AiAssistChat: React.FC<{ withoutWelcomeGrids?: boolean }> = ({
  withoutWelcomeGrids = false,
}) => {
  const {
    chats,
    activeChatId,
    addChat,
    setActiveChat,
    loadUserChats,
    sendAIRequest,
    isLoading,
    userId,
  } = useAiAssistChatStore();
  const activeChat = chats.find((c) => c.id === activeChatId);
  const { data: session } = useUser();

  // Load user chats when component mounts
  useEffect(() => {
    if (session?.user?.id && !userId) {
      loadUserChats(session.user.id);
    }
  }, [session?.user?.id, userId, loadUserChats]);

  // Only show welcome grid if there are no messages and not explicitly hidden
  const showWelcome =
    !withoutWelcomeGrids && (!activeChat || activeChat.messages.length === 0);

  // Handler to send a message
  const handleSend = async (
    input: string,
    setInput: (v: string) => void,
    attachments?: File[]
  ) => {
    if (
      (!input.trim() && (!attachments || attachments.length === 0)) ||
      isLoading
    )
      return;

    let chatId = activeChatId;
    // If no active chat, create one
    if (!chatId) {
      chatId = addChat({ title: "New Chat", messages: [] });
      setActiveChat(chatId);
    }

    setInput("");

    // Send AI request with attachments
    await sendAIRequest(input, chatId, attachments);
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
      <h2 className="text-xl">What would you like to explore today?</h2>
      <p className="text-gray-600 text-sm text-center max-w-md">
        I'm Flowlio AI, your intelligent assistant. I can help you with
        absolutely anything - from answering questions and solving problems to
        creative writing and brainstorming ideas!
      </p>
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
  messages: {
    role: "user" | "ai";
    text: string;
    isLoading?: boolean;
    timestamp?: Date;
    attachments?: File[];
  }[];
  onSend: (
    input: string,
    setInput: (v: string) => void,
    attachments?: File[]
  ) => void;
  showWelcome: boolean;
}> = ({ messages, onSend, showWelcome }) => {
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // File handling functions
  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).slice(0, 5); // Limit to 5 files
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSendClick = () => {
    if (input.trim() || attachments.length > 0) {
      onSend(input, setInput, attachments);
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
    // Shift+Enter allows new lines (default behavior)

    // Auto-resize on input
    if (e.key === "Enter" && e.shiftKey) {
      setTimeout(() => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = "auto";
        target.style.height = Math.min(target.scrollHeight, 128) + "px";
      }, 0);
    }
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
                <Box
                  className={
                    msg.role === "user"
                      ? "bg-blue-100 text-blue-900 rounded-xl px-4 py-2 m-1 max-w-[70%]"
                      : "bg-gray-100 text-gray-800 rounded-xl px-4 py-2 m-1 max-w-[70%]"
                  }
                >
                  {msg.isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      <span className="text-sm text-gray-500">
                        AI is thinking...
                      </span>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="text-sm w-full max-sm:w-36 overflow-hidden break-words whitespace-pre-wrap">
                        {msg.text}
                      </div>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {msg.attachments.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1 bg-gray-200 rounded px-2 py-1 text-xs"
                            >
                              {file.type.startsWith("image/") ? (
                                <ImageIcon className="w-3 h-3" />
                              ) : (
                                <FileText className="w-3 h-3" />
                              )}
                              <span className="truncate max-w-20">
                                {file.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {msg.timestamp && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  )}
                </Box>
              </Flex>
            ))
          )}
        </Stack>
      )}

      {/* Input area */}
      <Stack
        className={`w-full max-w-3xl mx-auto p-2 mb-4 rounded-md border sticky bottom-0 bg-white ${
          dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Attachments preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-xs"
              >
                {file.type.startsWith("image/") ? (
                  <ImageIcon className="w-3 h-3" />
                ) : (
                  <FileText className="w-3 h-3" />
                )}
                <span className="truncate max-w-20">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <textarea
          value={input}
          placeholder="Ask me anything... (Shift+Enter for new line)"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 bg-white border-none outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none shadow-none resize-none min-h-[44px] max-h-32 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-200"
          style={{
            boxShadow: "none !important",
            outline: "none !important",
            border: "none !important",
            fontFamily: "inherit",
            fontSize: "14px",
            lineHeight: "1.4",
          }}
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = Math.min(target.scrollHeight, 128) + "px";
          }}
        />

        <Flex className="gap-0 flex-wrap">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <Button
            variant={"ghost"}
            className="text-sm gap-1 text-gray-400"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="size-4" />
            Upload Files
          </Button>
          <Button
            size="lg"
            className="ml-auto bg-[#0c89af] rounded-full h-9 w-9 cursor-pointer"
            onClick={handleSendClick}
            aria-label="Send"
            disabled={!input.trim() && attachments.length === 0}
          >
            <Send className="text-white" />
          </Button>
        </Flex>
      </Stack>

      <p className="text-sm text-gray-500 text-center w-full">
        Press{" "}
        <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
          Shift + Enter
        </kbd>{" "}
        for new line,{" "}
        <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> to
        send
      </p>
    </Center>
  );
};
