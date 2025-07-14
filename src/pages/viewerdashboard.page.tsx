import { Stat, Stats } from "@/components/admin/dashboard/stats";
import { Stack } from "@/components/ui/stack";
import img1 from "/viewer/taskicon.svg";
import { ViewerBarChartComponent } from "@/components/viewer section/viewer barchart/viewerbarchart";
import { ViewerTable } from "@/components/viewer section/viewer barchart/viewertable";
import TimeModal from "@/components/timemodal";

const stats: Stat[] = [
  {
    link: "/viewer",
    title: "Total Tasks",
    description: "All tasks assigned to you",
    icon: img1,
    count: "23",
  },
  {
    link: "/viewer",
    title: "Total Projects",
    description: "Tasks yet to be completed",
    icon: img1,
    count: "12",
  },
  {
    link: "/viewer",
    title: "Completed Tasks",
    description: "Tasks you’ve finished",
    icon: img1,
    count: "11",
  },
  {
    link: "/viewer",
    title: "Active Task Hour",
    description: "08:35 AM, 11 March 2025",
    icon: img1,
    count: "1,240",
  },
];

const ViewerDashboardPage = () => {
  return (
    <Stack className="pt-5 gap-3 px-2">
      <Stats
        isViewer={true}
        stats={stats}
        classNameDescription="text-[13px] leading-4"
      />
      <Stack className="w-full">
        <ViewerBarChartComponent />
      </Stack>

      <ViewerTable />
      <TimeModal />
    </Stack>
  );
};

export default ViewerDashboardPage;
