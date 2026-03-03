import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Center } from "@/components/ui/center";
import { Stack } from "@/components/ui/stack";
import { PageWrapper } from "@/components/common/pagewrapper";
import { ReusableTable } from "@/components/reusable/reusabletable";
import {
  useFetchClientTasks,
  type ClientTask,
} from "@/hooks/useFetchClientTasks";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useUser } from "@/providers/user.provider";

const ClientTasksPage = () => {
  const { data: userData } = useUser();
  const clientId = userData?.user?.clientId;
  const organizationId = userData?.user?.organizationId;

  const { data: tasksResponse, isLoading } = useFetchClientTasks(
    clientId || undefined,
    organizationId || undefined,
  );

  const tasks = tasksResponse?.data?.tasks || [];

  const columns: ColumnDef<ClientTask>[] = [
    {
      accessorKey: "title",
      header: () => <Box className="text-center text-black">Task Title</Box>,
      cell: ({ row }) => (
        <Box className="text-center font-medium">{row.original.title}</Box>
      ),
    },
    {
      accessorKey: "projectName",
      header: () => <Box className="text-center text-black">Project Name</Box>,
      cell: ({ row }) => (
        <Box className="text-center">{row.original.projectName}</Box>
      ),
    },
    {
      accessorKey: "assigneeName",
      header: () => <Box className="text-center text-black">Assigned To</Box>,
      cell: ({ row }) => (
        <Box className="text-center">
          {row.original.assigneeName || "Unassigned"}
        </Box>
      ),
    },
    {
      accessorKey: "startDate",
      header: () => <Box className="text-center text-black">Start Date</Box>,
      cell: ({ row }) => (
        <Box className="text-center">
          {row.original.startDate
            ? format(new Date(row.original.startDate), "MMM d, yyyy")
            : "Not set"}
        </Box>
      ),
    },
    {
      accessorKey: "endDate",
      header: () => <Box className="text-center text-black">End Date</Box>,
      cell: ({ row }) => (
        <Box className="text-center">
          {row.original.endDate
            ? format(new Date(row.original.endDate), "MMM d, yyyy")
            : "Not set"}
        </Box>
      ),
    },
    {
      accessorKey: "status",
      header: () => <Box className="text-center text-black">Status</Box>,
      cell: ({ row }) => {
        const status = row.original.status as
          | "pending"
          | "completed"
          | "ongoing"
          | "delayed";
        const statusStyles: Record<string, { text: string; dot: string }> = {
          completed: {
            text: "text-white bg-[#00A400] border-none rounded-full",
            dot: "bg-white",
          },
          pending: {
            text: "text-white bg-[#F98618] border-none rounded-full",
            dot: "bg-white",
          },
          ongoing: {
            text: "text-white bg-[#005FA4] border-none rounded-full",
            dot: "bg-white",
          },
          delayed: {
            text: "text-white bg-[#EF5350] border-none rounded-full",
            dot: "bg-white",
          },
        };

        const currentStyle = statusStyles[status] || {
          text: "text-white bg-gray-500 border-none rounded-full",
          dot: "bg-white",
        };

        return (
          <Center>
            <Box
              className={`flex rounded-md capitalize w-32 h-10 gap-2 border justify-center items-center ${currentStyle.text}`}
            >
              <Flex
                className={`w-2 h-2 items-start rounded-full ${currentStyle.dot}`}
              />
              <span>{status || "Unknown"}</span>
            </Box>
          </Center>
        );
      },
    },
  ];

  return (
    <PageWrapper className="mt-6">
      <Stack className="gap-1 p-6 mb-6">
        <h1 className="text-2xl font-medium text-black">My Tasks</h1>
        <p className="text-gray-500">
          Stay updated with the tasks related to your projects
        </p>
      </Stack>
      {isLoading ? (
        <Box className="flex justify-center p-10">Loading tasks...</Box>
      ) : (
        <Box className=" rounded-xl   border border-gray-100 overflow-hidden">
          <ReusableTable
            data={tasks}
            columns={columns}
            searchClassName="rounded-full"
            filterClassName="rounded-full"
          />
        </Box>
      )}
    </PageWrapper>
  );
};

export default ClientTasksPage;
