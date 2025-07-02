import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "@/components/common/generalmodal";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AiAssitSidebar } from "@/components/ai assist/aiassistsidebar";
import { AiAssistChat } from "@/components/ai assist/aiassistchat";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { CSSProperties } from "react";
import { useAiAssistChatStore } from "@/store/aiassistchat.store";

export const AiAssistPage = () => {
  const modalProps = useGeneralModalDisclosure();
  const { addChat, setActiveChat } = useAiAssistChatStore();

  // Handler for New Chat button
  const handleNewChat = () => {
    const newId = addChat({ title: "New Chat", messages: [] });
    setActiveChat(newId);
  };

  return (
    <>
      <ComponentWrapper className="mt-6 overflow-hidden shadow-none">
        <SidebarProvider
          className="bg-accent"
          style={
            {
              "--sidebar-width-icon": "4rem",
              "--sidebar-width": "16rem",
            } as CSSProperties
          }
        >
          <AiAssitSidebar />

          <SidebarInset className="bg-gradient-to-r from-[#F2F2F2] to-[#f0f2f7]">
            <Stack className="p-3 h-16 justify-between bg-gradient-to-r from-white to-indigo-50">
              <Flex className="justify-end gap-2">
                <Button
                  className="rounded-full h-11 w-32"
                  size={"lg"}
                  onClick={handleNewChat}
                >
                  <img
                    src="/dashboard/newchaticon.svg"
                    alt="plus"
                    className="size-4"
                  />
                  New Chat
                </Button>

                {/* <Button
                  size={"lg"}
                  variant={"outline"}
                  onClick={() => {
                    modalProps.onOpenChange(true);
                    modalProps.setContentProps({
                      className:
                        "min-w-[70rem] max-lg:min-w-min overflow-auto classic-scroll h-[95vh] p-0",
                      children: (
                        <SidebarProvider
                          className="bg-accent min-h-auto overflow-hidden"
                          style={
                            {
                              "--sidebar-width": "13rem",
                              "--sidebar-width-icon": "4rem",
                            } as CSSProperties
                          }
                        >
                          <AiAssitSidebar className="mt-1 h-[93.5vh]" />

                          <SidebarInset className="gap-0">
                            <Stack className="h-full justify-between p-3 overflow-scroll classic-scroll">
                              <Flex className="justify-end">
                                <Button size={"lg"}>
                                  <Plus className="size-4" />
                                  New Chat
                                </Button>

                                <Button
                                  size={"lg"}
                                  variant={"outline"}
                                  onClick={() => modalProps.onOpenChange(false)}
                                >
                                  <Maximize className="size-4" />
                                  Exit Full Screen
                                </Button>
                              </Flex>

                              <AiAssistChat withoutWelcomeGrids />
                            </Stack>
                          </SidebarInset>
                        </SidebarProvider>
                      ),
                    });
                  }}
                >
                  <Maximize className="size-4" />
                  Full Screen
                </Button> */}
              </Flex>
            </Stack>

            <AiAssistChat />
          </SidebarInset>
        </SidebarProvider>
      </ComponentWrapper>
      <GeneralModal withoutCloseButton {...modalProps} />
    </>
  );
};
