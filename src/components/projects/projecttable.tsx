import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { ArrowUp, Eye, PencilLine } from "lucide-react";
import { ReusableTable } from "../reusable/reusabletable";
import { format, isWithinInterval } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

const data: Data[] = [
  {
    id: "1",
    progress: 3,
    status: "completed",
    projectname: "Foundation Plan",
    submittedby: "ken99",
    startDate: new Date("2025-02-21T00:00:00"),
    endDate: new Date("2025-03-01T00:00:00"),
    clientname: "Task 1",
  },
  {
    id: "2",
    progress: 30,
    projectname: "Foundation Plan",
    status: "pending",
    submittedby: "Abe45",
    startDate: new Date("2025-04-09T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 2",
  },
  {
    id: "3",
    progress: 10,
    projectname: "ClientBridge CRM Upgrade",
    status: "completed",
    submittedby: "Monserrat44",
    startDate: new Date("2025-01-14T00:00:00"),
    endDate: new Date("2025-02-01T00:00:00"),
    clientname: "Task 3",
  },
  {
    id: "4",
    progress: 3,
    projectname: "ClientBridge CRM Upgrade",
    status: "pending",
    submittedby: "Silas22",
    startDate: new Date("2025-02-12T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 4",
  },
  {
    id: "5",
    progress: 3,
    projectname: "ClientBridge CRM Upgrade",
    status: "completed",
    submittedby: "carmella",
    startDate: new Date("2025-03-10T00:00:00"),
    endDate: new Date("2025-04-01T00:00:00"),
    clientname: "Task 5",
  },
  {
    id: "6",
    progress: 12,
    projectname: "Foundation Plan",
    status: "ongoing",
    submittedby: "carmella",
    startDate: new Date("2025-04-04T00:00:00"),
    endDate: new Date("2025-05-11T00:00:00"),
    clientname: "Task 6",
  },
  {
    id: "7",
    progress: 3,
    projectname: "Foundation Plan",
    status: "completed",
    submittedby: "carmella",
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 7",
  },
  {
    id: "8",
    progress: 24,
    projectname: "Foundation Plan",
    status: "pending",
    submittedby: "carmella",
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 8",
  },
  {
    id: "9",
    progress: 13,
    projectname: "Foundation Plan",
    status: "ongoing",
    submittedby: "carmella",
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 9",
  },
];

export type Data = {
  id: string;
  progress: number;
  status: "pending" | "completed" | "ongoing";
  submittedby: string;
  clientname: string;
  projectname: string;
  startDate: Date;
  endDate: Date;
};

export const columns: ColumnDef<Data>[] = [
  {
    id: "select",
    header: () => <Box className="text-center text-black">#</Box>,
    cell: ({ row }) => <Box className="text-center">{row.index + 1}</Box>,
    enableSorting: false,
    // enableHiding: false,
  },

  {
    accessorKey: "projectname",
    header: () => <Box className="text-black p-1">Project Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize p-1 w-30 max-sm:w-full">
        {row.original.projectname.length > 28
          ? row.original.projectname.slice(0, 28) + "..."
          : row.original.projectname}
      </Box>
    ),
  },
  {
    accessorKey: "clientname",
    header: () => <Box className="text-black text-center">Client</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.clientname}</Box>
    ),
  },

  {
    accessorKey: "startDate",
    header: () => <Box className="text-center text-black">Start Date</Box>,
    cell: ({ row }) => {
      const startDate = row.original.startDate;
      try {
        return (
          <Box className="text-center">{format(startDate, "MMM d, yyyy")}</Box>
        );
      } catch (error) {
        console.error("Invalid date:", startDate);
        console.log(error);
        return <Box className="text-center">Invalid Date</Box>;
      }
    },
    filterFn: (row, __columnId, filterValue: { from?: Date; to?: Date }) => {
      try {
        const { from, to } = filterValue || {};
        if (!from || !to) return true;
        const startDate = row.original.startDate;
        const endDate = row.original.endDate;
        return (
          isWithinInterval(startDate, { start: from, end: to }) ||
          isWithinInterval(endDate, { start: from, end: to }) ||
          (startDate <= from && endDate >= to)
        );
      } catch (error) {
        console.error("Date comparison error:", error);
        return false;
      }
    },
  },

  {
    accessorKey: "endDate",
    header: () => <Box className="text-center text-black">End Date</Box>,
    cell: ({ row }) => {
      const endDate = row.original.endDate;
      try {
        return (
          <Box className="text-center">{format(endDate, "MMM d, yyyy")}</Box>
        );
      } catch (error) {
        console.error("Invalid date:", endDate);
        console.log(error);
        return <Box className="text-center">Invalid Date</Box>;
      }
    },
  },

  {
    accessorKey: "progress",
    header: () => <Box className="text-center text-black">Progress</Box>,
    cell: ({ row }) => {
      return (
        <Center className="text-center">
          {row.original.progress + "%"}{" "}
          <ArrowUp className="size-4 text-green-600 font-semibold" />
        </Center>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as "pending" | "completed" | "ongoing";

      const statusStyles: Record<typeof status, { text: string; dot: string }> =
        {
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
        };

      return (
        <Center>
          <Flex
            className={`rounded-md capitalize w-32 h-10 gap-2 border items-center ${statusStyles[status].text}`}
          >
            <Flex className="ml-5.5">
              <Flex
                className={`w-2 h-2 rounded-full ${statusStyles[status].dot}`}
              />
              <span>{status}</span>
            </Flex>
          </Flex>
        </Center>
      );
    },
  },

  {
    accessorKey: "actions",
    header: () => <Box className="text-center text-black">Actions</Box>,
    cell: () => {
      return (
        <Center className="space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-black border-none w-10 h-9 hover:bg-black cursor-pointer rounded-md "
                >
                  <Eye className="fill-white size-7 " />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Delete Schedule</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#23B95D] hover:bg-[#23B95D]/80 rounded-md border-none cursor-pointer"
                >
                  <PencilLine className="fill-white text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Edit Schedule</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Center>
      );
    },
  },
];

export const ProjectTable = () => {
  const handleStepChange = (step: string) => {
    console.log("step:", step);
  };

  return (
    <ReusableTable
      data={data}
      columns={columns}
      searchInput={false}
      headerDescription="Track and manage project efficiently."
      onRowClick={(row) => console.log("Row clicked:", row.original)}
      headerDescriptionWidth="max-w-[600px] text-gray-500"
      goToStep={handleStepChange}
    />
  );
};
