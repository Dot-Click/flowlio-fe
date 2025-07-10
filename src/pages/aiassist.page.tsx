import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "@/components/common/generalmodal";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AiAssitSidebar } from "@/components/ai assist/aiassistsidebar";
import { AiAssistChat } from "@/components/ai assist/aiassistchat";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { CSSProperties } from "react";
import { useAiAssistChatStore } from "@/store/aiassistchat.store";
import { Box } from "@/components/ui/box";
import { cn } from "@/lib/utils";

export const AiAssistPage = () => {
  const modalProps = useGeneralModalDisclosure();
  const { addChat, setActiveChat } = useAiAssistChatStore();

  // Handler for New Chat button
  const handleNewChat = () => {
    const newId = addChat({ title: "New Chat", messages: [] });
    setActiveChat(newId);
  };
  const { state } = useSidebar();

  return (
    <>
      <Box className="px-2 w-full max-w-full">
        <ComponentWrapper className="mt-6 shadow-none w-full max-w-full overflow-hidden">
          <SidebarProvider
            className="bg-accent w-full max-w-full"
            style={
              {
                "--sidebar-width-icon": "4rem",
                "--sidebar-width": "16rem",
              } as CSSProperties
            }
          >
            <AiAssitSidebar className="hidden sm:block" />

            <SidebarInset className="bg-gradient-to-r from-[#F2F2F2] to-[#f0f2f7] overflow-auto w-full max-w-full">
              <Stack className="p-3 h-16 justify-between bg-gradient-to-r from-white to-indigo-50 w-full ml-auto">
                <Flex className="justify-end gap-2 flex-wrap sm:flex-nowrap w-full min-w-0">
                  <Button
                    className="rounded-full h-11 sm:w-32 min-w-0"
                    size={"lg"}
                    onClick={handleNewChat}
                  >
                    <img
                      src="/dashboard/newchaticon.svg"
                      alt="plus"
                      className="size-4"
                    />
                    <span>New Chat</span>
                  </Button>

                  <SidebarTrigger
                    className={cn(
                      "text-black bg-gray-100/20 hover:bg-gray-100/30 hidden max-md:block p-2",
                      state === "collapsed" ? " rotate-180" : "ml-auto"
                    )}
                  />
                </Flex>
              </Stack>

              <AiAssistChat />
            </SidebarInset>
          </SidebarProvider>
        </ComponentWrapper>
      </Box>
      <GeneralModal withoutCloseButton {...modalProps} />
    </>
  );
};
