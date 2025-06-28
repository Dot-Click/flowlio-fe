import { BarChartComponent } from "@/components/admin/dashboard/barchart/barchart";
import { RecentActivities } from "@/components/admin/dashboard/recentactivities";
import { OngoingTasks } from "@/components/admin/dashboard/ongoingtasks";
import { Stats } from "@/components/admin/dashboard/stats";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { ProjectStatusPieChart } from "@/components/admin/dashboard/barchart/piechart";
import TimeModal from "@/components/timemodal";

const DashboardPage = () => {
  return (
    <Stack className="pt-5">
      <Stats />
      <Flex className="max-[950px]:flex-col items-start">
        <Stack className="w-full">
          <BarChartComponent />
          <OngoingTasks />
        </Stack>

        <Stack className="max-[950px]:w-full items-start">
          <ProjectStatusPieChart />
          <RecentActivities className="w-full" />
        </Stack>
      </Flex>

      <TimeModal />
    </Stack>
  );
};

export default DashboardPage;
