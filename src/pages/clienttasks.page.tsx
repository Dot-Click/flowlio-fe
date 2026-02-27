import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Center } from "@/components/ui/center";
import { ClientPortalHeader } from "@/components/client section/clientportalheader";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { useFetchClientTasks, type ClientTask } from "@/hooks/useFetchClientTasks";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useUser } from "@/providers/user.provider";

const ClientTasksPage = () => {
  const { data: userData } = useUser();
  const clientId = userData?.user?.clientId;
  const organizationId = userData?.user?.organizationId;

  const { data: tasksResponse, isLoading } = useFetchClientTasks(
    clientId || undefined,
    organizationId || undefined
  );

  const tasks = tasksResponse?.data?.tasks || [];

  const columns: ColumnDef<ClientTask>[] = [
    {
      accessorKey: "title",
      header: () => <Box className="text-center text-black">Task Title</Box>,
      cell: ({ row }) => <Box className="text-center font-medium">{row.original.title}</Box>,
    },
    {
      accessorKey: "projectName",
      header: () => <Box className="text-center text-black">Project Name</Box>,
      cell: ({ row }) => <Box className="text-center">{row.original.projectName}</Box>,
    },
    {
      accessorKey: "assigneeName",
      header: () => <Box className="text-center text-black">Assigned To</Box>,
      cell: ({ row }) => <Box className="text-center">{row.original.assigneeName || "Unassigned"}</Box>,
    },
    {
      accessorKey: "startDate",
      header: () => <Box className="text-center text-black">Start Date</Box>,
      cell: ({ row }) => (
        <Box className="text-center">
          {row.original.startDate ? format(new Date(row.original.startDate), "MMM d, yyyy") : "Not set"}
        </Box>
      ),
    },
    {
      accessorKey: "endDate",
      header: () => <Box className="text-center text-black">End Date</Box>,
      cell: ({ row }) => (
        <Box className="text-center">
          {row.original.endDate ? format(new Date(row.original.endDate), "MMM d, yyyy") : "Not set"}
        </Box>
      ),
    },
    {
      accessorKey: "status",
      header: () => <Box className="text-center text-black">Status</Box>,
      cell: ({ row }) => {
        const status = row.original.status as "pending" | "completed" | "ongoing" | "delayed";
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
            <Box className={`flex rounded-md capitalize w-32 h-10 gap-2 border justify-center items-center ${currentStyle.text}`}>
              <Flex className={`w-2 h-2 items-start rounded-full ${currentStyle.dot}`} />
              <span>{status || "Unknown"}</span>
            </Box>
          </Center>
        );
      },
    },
  ];

  return (
    <Box className="px-4 py-2">
      <ClientPortalHeader 
        title="My Tasks" 
        description="Stay updated with the tasks related to your projects" 
      />
      
      {isLoading ? (
        <Box className="flex justify-center p-10">Loading tasks...</Box>
      ) : (
        <ReusableTable 
          data={tasks} 
          columns={columns} 
        />
      )}
    </Box>
  );
};

export default ClientTasksPage;
