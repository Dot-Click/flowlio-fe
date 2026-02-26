import { Box } from "@/components/ui/box";
import { ClientPortalHeader } from "@/components/client section/clientportalheader";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { useFetchClientTasks, type ClientTask } from "@/hooks/useFetchClientTasks";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const ClientTasksPage = () => {
  const { data: tasksResponse, isLoading } = useFetchClientTasks();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in_progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "todo": return "bg-gray-100 text-gray-800 border-gray-200";
      case "delay": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const columns: ColumnDef<ClientTask>[] = [
    {
      accessorKey: "title",
      header: "Task Title",
      cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
    },
    {
      accessorKey: "projectName",
      header: "Project",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={getStatusColor(row.original.status)}>
          {row.original.status.replace("_", " ").toUpperCase()}
        </Badge>
      ),
    },
    {
      accessorKey: "endDate",
      header: "Due Date",
      cell: ({ row }) => row.original.endDate ? format(new Date(row.original.endDate), "MMM dd, yyyy") : "N/A",
    },
    {
      accessorKey: "assigneeName",
      header: "Assigned To",
      cell: ({ row }) => row.original.assigneeName || "Unassigned",
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
          data={tasksResponse?.data || []} 
          columns={columns} 
        />
      )}
    </Box>
  );
};

export default ClientTasksPage;
