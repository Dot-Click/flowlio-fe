import { HorizontalNavbar } from "@/components/admin/horizontalnavbar/horizontalnavbar";
import { AppSidebar, type NavItem } from "@/components/admin/appsidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PageWrapper } from "@/components/common/pagewrapper";
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
import { SquareKanban, UserRoundCog } from "lucide-react";
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
    url: "/dashboard/cost-codes",
    title: "Cost Codes",
    icon: <TaskManagementIcon />,
  },

  {
    url: "/dashboard/task-management",
    title: "Task Management",
    icon: <UserRoundCog />,
  },
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
    <PageWrapper className="border-none">
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
    </PageWrapper>
  );
};
