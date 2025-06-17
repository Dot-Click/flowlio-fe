import { CalendarWithFilter } from "@/components/admin/dashboard/calendarwithfilter";
import { BarChartComponent } from "@/components/admin/dashboard/barchart/barchart";
import { RecentActivities } from "@/components/admin/dashboard/recentactivities";
import { OngoingTasks } from "@/components/admin/dashboard/ongoingtasks";
import { Stats } from "@/components/admin/dashboard/stats";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";

const DashboardPage = () => {
  return (
    <Stack className="pt-5">
      <Stats />
      <Flex className="max-[950px]:flex-col items-start">
        <Stack className="max-w-full">
          <BarChartComponent />
          <OngoingTasks />
        </Stack>

        <Stack className="max-[950px]:w-full min-w-[20rem] items-start">
          <CalendarWithFilter className="p-5 w-full flex flex-col max-[950px]:hidden" />
          <RecentActivities className="w-full" />
        </Stack>
      </Flex>
    </Stack>
  );
};

export default DashboardPage;
