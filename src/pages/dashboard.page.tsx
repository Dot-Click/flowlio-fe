import { BarChartComponent } from "@/components/admin/dashboard/barchart/barchart";
import { RecentActivities } from "@/components/admin/dashboard/recentactivities";
import { OngoingTasks } from "@/components/admin/dashboard/ongoingtasks";
import { Stat, Stats } from "@/components/admin/dashboard/stats";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { ProjectStatusPieChart } from "@/components/admin/dashboard/barchart/piechart";
import TimeModal from "@/components/timemodal";
import img1 from "/dashboard/1.svg";
import img2 from "/dashboard/2.svg";
import img3 from "/dashboard/3.svg";
import img4 from "/dashboard/4.svg";
import Img1 from "/dashboard/prostat1.svg";
import Img2 from "/dashboard/prostat2.svg";
import Img3 from "/dashboard/projstat3.svg";
const stats: Stat[] = [
  {
    link: "/dashboard",
    title: "Total Clients",
    description: "Active users on the platform",
    icon: img1,
    count: "22",
  },
  {
    link: "/dashboard",
    title: "Active Projects",
    description: "Ongoing client projects",
    icon: img2,
    count: "20",
  },
  {
    link: "/dashboard",
    title: "Hours Tracked",
    description: "Time logged this week",
    icon: img3,
    count: "45",
  },
  {
    link: "/dashboard",
    title: "Pending Tasks",
    description: "Tasks in progress",
    icon: img4,
    count: "48",
  },
];

const data = [
  { name: "Ongoing", value: 10.61, icon: Img2, color: "#FFE000" },
  { name: "Delayed", value: 18.46, icon: Img3, color: "#F50057" },
  { name: "Finished", value: 70.93, icon: Img1, color: "#3f53b5" },
];

const DashboardPage = () => {
  return (
    <Stack className="pt-5 gap-3">
      <Stats stats={stats} />
      <Flex className="max-[950px]:flex-col items-start gap-3">
        <Stack className="w-full gap-3">
          <BarChartComponent />
          <OngoingTasks />
        </Stack>

        <Stack className="max-[950px]:w-full items-start gap-3">
          <ProjectStatusPieChart data={data} title="Project Status" />
          <RecentActivities className="w-full" />
        </Stack>
      </Flex>

      <TimeModal />
    </Stack>
  );
};

export default DashboardPage;
