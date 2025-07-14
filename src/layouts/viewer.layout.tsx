import { HorizontalNavbar } from "@/components/admin/horizontalnavbar/horizontalnavbar";
import { AppSidebar, type NavItem } from "@/components/admin/appsidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { CSSProperties } from "react";
import { Box } from "@/components/ui/box";
import { Outlet } from "react-router";
import { MessageCircleQuestion, SquareKanban } from "lucide-react";
import { GroupIcon, TaskManagementIcon } from "@/components/customeIcons";
import { IoSettingsOutline } from "react-icons/io5";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/viewer",
    icon: <SquareKanban />,
  },
  {
    url: "/viewer/project",
    title: "Projects",
    icon: <GroupIcon />,
  },
  {
    url: "/viewer/my-tasks",
    title: "My Tasks",
    icon: <TaskManagementIcon />,
  },
  {
    url: "/viewer/support",
    title: "Support",
    icon: <MessageCircleQuestion />,
  },

  {
    url: "/viewer/settings",
    title: "Settings",
    icon: <IoSettingsOutline />,
  },
];

export const ViewerLayout = () => {
  return (
    <Box className="bg-gradient-to-l from-indigo-50 via-slate-50 to-indigo-50 border-[2px] rounded-none border-white p-1 min-h-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "14.6rem",
            "--sidebar-width-icon": "4rem",
          } as CSSProperties
        }
      >
        <AppSidebar navItems={navItems} />
        <SidebarInset className="bg-transparent overflow-auto">
          <HorizontalNavbar />
          <Box className="pb-2">
            <Outlet />
          </Box>
        </SidebarInset>
      </SidebarProvider>
    </Box>
  );
};
