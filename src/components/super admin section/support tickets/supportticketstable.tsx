import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Eye } from "lucide-react";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import CheckSvg from "/super admin/check.svg";

const data: Data[] = [
  {
    id: "1",
    priority: "High",
    status: "closed",
    subject: "Login issue on platform",
    submittedby: "ken99",
    createdon: new Date("2025-03-01T00:00:00"),
    client: "Innovate Labs",
    assignedto: "ken99",
  },
  {
    id: "2",
    priority: "Medium",
    subject: "Login issue on platform",
    status: "open",
    submittedby: "Abe45",
    createdon: new Date("2025-06-01T00:00:00"),
    client: "Innovate Labs",
    assignedto: "Abe45",
  },
  {
    id: "3",
    priority: "Low",
    subject: "Login issue on platform",
    status: "closed",
    submittedby: "Monserrat44",
    createdon: new Date("2025-02-01T00:00:00"),
    client: "Innovate Labs",
    assignedto: "Monserrat44",
  },
  {
    id: "4",
    priority: "High",
    subject: "Login issue on platform",
    status: "open",
    submittedby: "Silas22",
    createdon: new Date("2025-06-01T00:00:00"),
    client: "Innovate Labs",
    assignedto: "Silas22",
  },
  {
    id: "5",
    priority: "Medium",
    subject: "Login issue on platform",
    status: "closed",
    submittedby: "carmella",
    createdon: new Date("2025-04-01T00:00:00"),
    client: "Innovate Labs",
    assignedto: "carmella",
  },
  {
    id: "6",
    priority: "Low",
    subject: "Login issue on platform",
    status: "open",
    submittedby: "carmella",
    createdon: new Date("2025-05-11T00:00:00"),
    client: "Innovate Labs",
    assignedto: "carmella",
  },
  {
    id: "7",
    priority: "High",
    subject: "Login issue on platform",
    status: "closed",
    submittedby: "carmella",
    createdon: new Date("2025-06-01T00:00:00"),
    client: "Task 7",
    assignedto: "carmella",
  },
  {
    id: "8",
    priority: "Medium",
    subject: "Login issue on platform",
    status: "open",
    submittedby: "carmella",
    createdon: new Date("2025-06-01T00:00:00"),
    client: "Task 8",
    assignedto: "carmella",
  },
  {
    id: "9",
    priority: "Low",
    subject: "Login issue on platform",
    status: "closed",
    submittedby: "carmella",
    createdon: new Date("2025-06-01T00:00:00"),
    client: "Task 9",
    assignedto: "carmella",
  },
];

export type Data = {
  id: string;
  priority: "High" | "Medium" | "Low";
  status: "open" | "closed";
  submittedby: string;
  client: string;
  subject: string;
  createdon: Date;
  assignedto: string;
};

export const columns: ColumnDef<Data>[] = [
  {
    id: "select",
    header: () => <Box className="text-center text-black p-3">Ticket ID</Box>,
    cell: ({ row }) => (
      <Box className="text-center p-3">#TK{row.index + 100}</Box>
    ),
    enableSorting: false,
    // enableHiding: false,
  },

  {
    accessorKey: "subject",
    header: () => <Box className="text-black ">Subject</Box>,
    cell: ({ row }) => (
      <Box className="capitalize w-30 max-sm:w-full">
        {row.original.subject.length > 28
          ? row.original.subject.slice(0, 28) + "..."
          : row.original.subject}
      </Box>
    ),
  },

  {
    accessorKey: "client",
    header: () => <Box className="text-black text-center">Client</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.client}</Box>
    ),
  },
  {
    accessorKey: "assignedto",
    header: () => <Box className="text-black text-center">Assigned To</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.assignedto}</Box>
    ),
  },

  {
    accessorKey: "priority",
    header: () => <Box className="text-center text-black">priority</Box>,
    cell: ({ row }) => {
      return (
        <Center className="text-center font-semibold">
          {row.original.priority}
        </Center>
      );
    },
  },

  {
    accessorKey: "createdon",
    header: () => <Box className="text-center text-black">Created On</Box>,
    cell: ({ row }) => {
      const createdon = row.original.createdon;
      try {
        return (
          <Box className="text-center">{format(createdon, "d MMM yyyy")}</Box>
        );
      } catch (error) {
        console.error("Invalid date:", createdon);
        console.log(error);
        return <Box className="text-center">Invalid Date</Box>;
      }
    },
  },

  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as "open" | "closed";

      const statusStyles: Record<typeof status, { text: string; dot: string }> =
        {
          open: {
            text: "text-white bg-[#00A400] border-none rounded-full",
            dot: "bg-white",
          },
          closed: {
            text: "text-white bg-[#F98618] border-none rounded-full",
            dot: "bg-white",
          },
        };

      return (
        <Center>
          <Flex
            className={`rounded-md capitalize w-26 h-10 gap-2 border items-center ${statusStyles[status].text}`}
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
                <p>View Ticket</p>
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
                  <img src={CheckSvg} alt="check" className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Close Ticket</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#A50403] hover:bg-[#A50403]/80 rounded-md border-none cursor-pointer text-white hover:text-white"
                >
                  X
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Delete Ticket</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Center>
      );
    },
  },
];

export const SupportTicketTable = () => {
  return (
    <ReusableTable
      data={data}
      columns={columns}
      searchInput={false}
      enablePaymentLinksCalender={true}
      onRowClick={(row) => console.log("Row clicked:", row.original)}
    />
  );
};
