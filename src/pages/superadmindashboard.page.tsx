import { Stat, Stats } from "@/components/admin/dashboard/stats";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { ProjectStatusPieChart } from "@/components/admin/dashboard/barchart/piechart";
import img1 from "/super admin/img2.svg";
import img2 from "/super admin/img3.svg";
import img3 from "/super admin/img4.svg";
import img4 from "/super admin/img1.svg";
import Img1 from "/dashboard/prostat1.svg";
import Img2 from "/dashboard/prostat2.svg";
import Img3 from "/dashboard/projstat3.svg";
import { SuperAdminBarChartComponent } from "@/components/super admin section/super admin barchart/barchart";
import { SuperAdminTable } from "@/components/super admin section/super admin barchart/superadmintable";

const stats: Stat[] = [
  {
    link: "/superadmin",
    title: "Total Companies",
    description: "Companies currently on platform",
    icon: img1,
    count: "122",
  },
  {
    link: "/superadmin",
    title: "Total Projects",
    description: "All projects created by companies",
    icon: img2,
    count: "2,240",
  },
  {
    link: "/superadmin",
    title: "Active Subscriptions",
    description: "Companies on active paid plans",
    icon: img3,
    count: "87",
  },
  {
    link: "/superadmin",
    title: "Total Invoices",
    description: "Invoices created via platform",
    icon: img4,
    count: "1,240",
  },
];

const data = [
  { name: "Projects", value: 65.63, icon: Img1, color: "#3f53b5" },
  { name: "Tasks", value: 18.46, icon: Img2, color: "#FFE000" },
  { name: "Invoices", value: 16.91, icon: Img3, color: "#F50057" },
];

const SuperAdminDashboardPage = () => {
  return (
    <Stack className="pt-5 gap-3">
      <Stats
        stats={stats}
        classNameDescription="text-[13px] leading-4"
        isSuperAdmin={true}
      />
      <Flex className="max-[950px]:flex-col items-start gap-3">
        <Stack className="w-full">
          <SuperAdminBarChartComponent />
        </Stack>

        <Stack className="max-[950px]:w-full items-start">
          <ProjectStatusPieChart data={data} title="Feature Overview" />
        </Stack>
      </Flex>

      <SuperAdminTable />
    </Stack>
  );
};

export default SuperAdminDashboardPage;
