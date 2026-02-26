import { Box } from "@/components/ui/box";
import { ClientPortalHeader } from "@/components/client section/clientportalheader";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { useFetchClientProjects } from "@/hooks/useFetchClientProjects";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "@/providers/user.provider";

const ClientProjectsPage = () => {
  const { data: userData } = useUser();
  const clientId = userData?.user?.clientId;
  const organizationId = userData?.user?.organizationId;

  const { data: projectsResponse, isLoading } = useFetchClientProjects(
    clientId || undefined,
    organizationId || undefined
  );
  
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "ongoing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const projects = projectsResponse?.data?.projects || [];

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "projectNumber",
      header: "Project #",
      cell: ({ row }) => <span className="font-medium">{row.original.projectNumber}</span>,
    },
    {
      accessorKey: "projectName",
      header: "Project Name",
      cell: ({ row }) => <span className="font-semibold">{row.original.projectName}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={getStatusColor(row.original.status)}>
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </Badge>
      ),
    },
    {
      accessorKey: "progress",
      header: "Progress",
      cell: ({ row }) => (
        <Box className="w-full min-w-[100px]">
          <div className="flex justify-between text-xs mb-1">
            <span>{row.original.progress}%</span>
          </div>
          <Progress value={row.original.progress} className="h-2" />
        </Box>
      ),
    },
    {
      accessorKey: "endDate",
      header: "Due Date",
      cell: ({ row }) => row.original.endDate ? format(new Date(row.original.endDate), "MMM dd, yyyy") : "N/A",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/clients/projects/view/${row.original.id}`)}
            className="hover:bg-blue-50 text-blue-600"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          {row.original.contractfile && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open(row.original.contractfile, "_blank")}
              className="hover:bg-green-50 text-green-600"
            >
              <Download className="h-4 w-4 mr-1" />
              File
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Box className="px-4 py-2">
      <ClientPortalHeader 
        title="My Projects" 
        description="View and track the progress of your projects" 
      />
      
      {isLoading ? (
        <Box className="flex justify-center p-10">Loading projects...</Box>
      ) : (
        <ReusableTable 
          data={projects} 
          columns={columns} 
        />
      )}
    </Box>
  );
};

export default ClientProjectsPage;
