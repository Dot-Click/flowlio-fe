import { HorizontalNavbar } from "@/components/admin/horizontalnavbar/horizontalnavbar";
import { AppSidebar, type NavItem } from "@/components/admin/appsidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuWandSparkles } from "react-icons/lu";
import { GoOrganization } from "react-icons/go";
import { HiOutlineInbox } from "react-icons/hi";
import { TbReportSearch } from "react-icons/tb";
import type { CSSProperties } from "react";
import { Box } from "@/components/ui/box";
import { LuUsers } from "react-icons/lu";
import { Outlet } from "react-router";
import { SquareKanban } from "lucide-react";
import { GroupIcon, TaskManagementIcon } from "@/components/customeIcons";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <SquareKanban />,
  },
  {
    url: "/dashboard/project",
    title: "Projects",
    icon: <GroupIcon />,
  },
  {
    url: "/dashboard/task-management",
    title: "Task Management",
    icon: <TaskManagementIcon />,
  },

  // {
  //   url: "/dashboard/cost-codes",
  //   title: "Cost Codes",
  //   icon: <UserRoundCog />,
  // },
  {
    url: "/dashboard/comments",
    title: "Comments",
    icon: <IoChatboxEllipsesOutline />,
  },
  {
    url: "/dashboard/issues",
    title: "Issues",
    icon: <TbReportSearch />,
  },
  {
    url: "/dashboard/overall-schedule",
    title: "Overall Schedule",
    icon: <IoCalendarOutline />,
  },
  {
    url: "/dashboard/ai-assist",
    title: "AI Assist",
    icon: <LuWandSparkles />,
  },
  {
    url: "/dashboard/company-management",
    title: "Company Management",
    icon: <GoOrganization />,
  },
  {
    url: "/dashboard/user-management",
    title: "User Management",
    icon: <LuUsers />,
  },
  {
    url: "/dashboard/inbox",
    title: "Inbox",
    icon: <HiOutlineInbox />,
  },
  {
    url: "/dashboard/settings",
    title: "Settings",
    icon: <IoSettingsOutline />,
  },
];

export const DashboardLayout = () => {
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
