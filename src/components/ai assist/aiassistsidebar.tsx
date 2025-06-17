import {
  Sidebar,
  useSidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
} from "../ui/sidebar";
import { AiAssistLogo } from "./aiassistlogo";
import { Flex } from "../ui/flex";
import { cn } from "@/lib/utils";

export const AiAssitSidebar: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { state } = useSidebar();

  return (
    <Sidebar
      className={cn(
        "**:data-[sidebar=sidebar]:bg-black **:data-[sidebar=sidebar]:border-4 **:data-[sidebar=sidebar]:border-black **:data-[sidebar=sidebar]:text-white absolute mt-24 z-[1] **:data-[sidebar=sidebar]:rounded-l-lg  **:data-[sidebar=sidebar]:overflow-hidden inset-y-0 mb-1 ml-1",
        className
      )}
      collapsible="icon"
    >
      <SidebarHeader className="relative mt-4 p-4">
        <Flex className="justify-between items-center gap-2">
          <AiAssistLogo
            isCompact={state === "collapsed"}
            className={cn(
              state === "collapsed" ? "hidden" : "max-w-[80%]",
              "min-w-0"
            )}
          />
          <SidebarTrigger
            className={cn(
              "text-white bg-gray-100/20 hover:bg-gray-100/30",
              state === "collapsed" ? "-ml-3 rotate-180" : "ml-auto"
            )}
          />
        </Flex>

        <p
          className={cn(
            "text-gray-300 text-sm mt-2",
            state === "collapsed" && "hidden"
          )}
        >
          Your Smart Virtual Assistant
        </p>
        <hr className="border border-gray-700/70 mt-2" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="cursor-pointer"
                  tooltip={{ children: "Chat Title" }}
                >
                  <span
                    className={state === "collapsed" ? "hidden" : undefined}
                  >
                    Chat Title
                  </span>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className="cursor-pointer"
                  tooltip={{ children: "Chat Title" }}
                >
                  <span
                    className={state === "collapsed" ? "hidden" : undefined}
                  >
                    Previous Chat
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
