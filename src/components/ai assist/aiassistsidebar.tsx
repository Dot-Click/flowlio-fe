import {
  Sidebar,
  useSidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  // SidebarTrigger,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarTrigger,
} from "../ui/sidebar";
import { AiAssistLogo } from "./aiassistlogo";
import { Flex } from "../ui/flex";
import { cn } from "@/lib/utils";
import { Stack } from "../ui/stack";
import { Pencil, Trash, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useAiAssistChatStore } from "@/store/aiassistchat.store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

export const AiAssitSidebar: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { state } = useSidebar();
  const { chats, activeChatId, setActiveChat, deleteChat, editChatTitle } =
    useAiAssistChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditValue(currentTitle);
  };
  const handleEditSave = (id: string) => {
    editChatTitle(id, editValue.trim() || "Untitled Chat");
    setEditingId(null);
    setEditValue("");
  };
  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <Sidebar
      // **:data-[sidebar=sidebar]:bg-red-400
      className={cn(
        "**:data-[sidebar=sidebar]:bg-[url('/dashboard/aisidebarimg.png')]  **:data-[sidebar=sidebar]:bg-center **:data-[sidebar=sidebar]:bg-cover **:data-[sidebar=sidebar]:text-white absolute mt-24 z-[1] **:data-[sidebar=sidebar]:rounded-l-lg  **:data-[sidebar=sidebar]:overflow-hidden inset-y-0 mb-1 ml-2 h-screen",
        className
      )}
      collapsible="icon"
    >
      <SidebarHeader className="relative p-6">
        <Flex className="justify-between items-center gap-2">
          <AiAssistLogo
            isCompact={state === "collapsed"}
            className={cn(
              state === "collapsed" ? "hidden" : "max-w-[70%]",
              "min-w-0"
            )}
          />
          <SidebarTrigger
            className={cn(
              "text-white max-md:text-black bg-gray-100/20 hover:bg-gray-100/30",
              state === "collapsed" ? "-ml-4 rotate-180" : "ml-auto"
            )}
          />
        </Flex>

        <Stack
          className={cn(
            "text-gray-300 text-sm mt-2 gap-0",
            state === "collapsed" && "hidden"
          )}
        >
          <h1 className="text-lg font-semibold text-white max-md:text-black">
            AI Assistance
          </h1>
          <h1 className="text-xs font-light text-white/90 max-md:text-black">
            Your Smart Virtual Assistant
          </h1>
        </Stack>
        <hr className="border border-gray-700/70 mt-2" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-6">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="items-center flex-col gap-2">
                <p
                  className={cn(
                    "bg-white/30 border border-white/80 text-white/90 rounded-full p-1 h-7 w-18 text-center cursor-pointer hover:bg-white/30 text-[12px] max-md:text-black",
                    state === "collapsed" && "hidden"
                  )}
                >
                  Today
                </p>
                {chats.length === 0 ? (
                  <p
                    className={cn(
                      "text-white/70 text-xs text-center mt-4 max-md:text-black",
                      state === "collapsed" && "hidden"
                    )}
                  >
                    No chats yet.
                  </p>
                ) : (
                  chats.map((chat) => (
                    <Flex key={chat.id} className="items-center w-full group">
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "flex-1 cursor-pointer hover:bg-white/30 hover:text-white max-sm:hover:text-black my-1 py-1 px-2 rounded-lg",
                          chat.id === activeChatId &&
                            " text-white font-semibold",
                          state === "collapsed" && "hidden"
                        )}
                        tooltip={{ children: chat.title }}
                        onClick={() => setActiveChat(chat.id)}
                      >
                        {editingId === chat.id ? (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleEditSave(chat.id);
                            }}
                            className="flex items-center w-full"
                          >
                            <input
                              className="bg-white/80 text-black rounded px-2 py-1 w-full text-xs outline-none"
                              value={editValue}
                              autoFocus
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleEditSave(chat.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Escape") handleEditCancel();
                              }}
                            />
                          </form>
                        ) : (
                          <span className="truncate text-xs">{chat.title}</span>
                        )}
                      </SidebarMenuButton>
                      {state !== "collapsed" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="hover:bg-white/30 rounded p-1 ml-1"
                              title="More actions"
                            >
                              <EllipsisVertical className="size-4 text-white" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(chat.id, chat.title)}
                            >
                              <Pencil className="size-4 mr-2" /> Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteChat(chat.id)}
                              variant="destructive"
                            >
                              <Trash className="size-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </Flex>
                  ))
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
