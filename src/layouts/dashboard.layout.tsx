import { HorizontalNavbar } from "@/components/admin/horizontalnavbar/horizontalnavbar";
import { AppSidebar, type NavItem } from "@/components/admin/appsidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { IoCalendarOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuWandSparkles } from "react-icons/lu";
import { TbInvoice, TbReportSearch } from "react-icons/tb";
import type { CSSProperties } from "react";
import { Box } from "@/components/ui/box";
import { LuUsers } from "react-icons/lu";
import { Outlet } from "react-router";
import { SquareKanban, UserPen } from "lucide-react";
import { GroupIcon, TaskManagementIcon } from "@/components/customeIcons";
import { MessageCircleQuestion } from "lucide-react";
// import { SubscriptionGuard } from "@/components/common/subscriptionguard";

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
  {
    url: "/dashboard/user-management",
    title: "User Management",
    icon: <LuUsers />,
  },
  {
    url: "/dashboard/client-management",
    title: "Client Management",
    icon: <UserPen />,
  },
  {
    url: "/dashboard/calender",
    title: "Calender",
    icon: <IoCalendarOutline />,
  },
  {
    url: "/dashboard/ai-assist",
    title: "AI Assistance",
    icon: <LuWandSparkles />,
  },
  {
    url: "/dashboard/payment-links",
    title: "Payment Links",
    icon: <TbReportSearch />,
  },

  {
    url: "/dashboard/invoice",
    title: "Invoices",
    icon: <TbInvoice />,
  },
  {
    url: "/dashboard/subscription",
    title: "My Subscriptions",
    icon: <TbInvoice />,
  },

  {
    url: "/dashboard/support",
    title: "Support",
    icon: <MessageCircleQuestion />,
  },

  {
    url: "/dashboard/settings",
    title: "Settings",
    icon: <IoSettingsOutline />,
  },
];

export const DashboardLayout = () => {
  return (
    // <SubscriptionGuard>
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
    // </SubscriptionGuard>
  );
};
