import { HorizontalNavbar } from "@/components/admin/horizontalnavbar/horizontalnavbar";
import { AppSidebar, type NavItem } from "@/components/admin/appsidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PageWrapper } from "@/components/common/pagewrapper";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCalendarClearOutline } from "react-icons/io5";
import { PiCalendarPlusLight } from "react-icons/pi";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoBarChartOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineListAlt } from "react-icons/md";
import { LuWandSparkles } from "react-icons/lu";
import { GoOrganization } from "react-icons/go";
import { HiOutlineInbox } from "react-icons/hi";
import { TbReportSearch } from "react-icons/tb";
import { IoListOutline } from "react-icons/io5";
import { RiCouponLine } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";
import type { CSSProperties } from "react";
import { Box } from "@/components/ui/box";
import { LuUsers } from "react-icons/lu";
import { GrTask } from "react-icons/gr";
import { Outlet } from "react-router";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <IoBarChartOutline />,
  },
  {
    url: "/dashboard/project",
    title: "Projects",
    icon: <MdOutlineListAlt />,
  },
  {
    url: "/dashboard/cost-codes",
    title: "Cost Codes",
    icon: <RiCouponLine />,
  },
  {
    title: "Schedules",
    icon: <IoCalendarClearOutline />,
    url: "/dashboard/schedule/create-schedule",
    subItems: [
      {
        url: "/dashboard/schedule/create-schedule",
        title: "Create Schedule",
        icon: <PiCalendarPlusLight />,
      },
      {
        url: "/dashboard/schedule/pending-schedule",
        title: "Pending Schedule",
        icon: <MdOutlineAccessTime />,
      },
      {
        url: "/dashboard/schedule/current-schedule",
        title: "Current Schedule",
        icon: <GoTasklist />,
      },
    ],
  },

  {
    title: "Task Management",
    icon: <IoListOutline />,
    url: "/dashboard/task-management",
    subItems: [
      {
        url: "/dashboard/task-management/my-task",
        title: "My Tasks",
        icon: <GrTask />,
      },
    ],
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
            "--sidebar-width": "15.7rem",
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
