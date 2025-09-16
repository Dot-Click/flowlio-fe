import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { ArrowUp } from "lucide-react";
import { ReusableTable } from "@/components/reusable/reusabletable";

const data: Data[] = [
  {
    id: "01",
    progress: 3,
    projectname: "Foundation Plan",
    submittedby: "ken99",
    clientname: "Task 1",
    totaltasks: 10,
    completedtasks: 5,
  },
  {
    id: "02",
    progress: 30,
    projectname: "Foundation Plan",
    submittedby: "Abe45",
    clientname: "Task 2",
    totaltasks: 10,
    completedtasks: 5,
  },
  {
    id: "03",
    progress: 10,
    projectname: "ClientBridge CRM Upgrade",
    submittedby: "Monserrat44",
    clientname: "Task 3",
    totaltasks: 10,
    completedtasks: 5,
  },
  {
    id: "04",
    progress: 3,
    projectname: "ClientBridge CRM Upgrade",
    submittedby: "Silas22",
    clientname: "Task 4",
    totaltasks: 10,
    completedtasks: 5,
  },
  {
    id: "05",
    progress: 3,
    projectname: "ClientBridge CRM Upgrade",
    submittedby: "carmella",
    clientname: "Task 5",
    totaltasks: 10,
    completedtasks: 5,
  },
  {
    id: "06",
    progress: 12,
    projectname: "Foundation Plan",
    submittedby: "carmella",
    clientname: "Task 6",
    totaltasks: 10,
    completedtasks: 5,
  },
  {
    id: "07",
    progress: 3,
    projectname: "Foundation Plan",
    submittedby: "carmella",
    clientname: "Task 7",
    totaltasks: 10,
    completedtasks: 5,
  },
  {
    id: "08",
    progress: 24,
    projectname: "Foundation Plan",
    submittedby: "carmella",
    clientname: "Task 8",
    totaltasks: 10,
    completedtasks: 5,
  },
  {
    id: "09",
    progress: 13,
    projectname: "Foundation Plan",
    submittedby: "carmella",
    clientname: "Task 9",
    totaltasks: 10,
    completedtasks: 5,
  },
];

export type Data = {
  id: string;
  progress: number;
  submittedby: string;
  clientname: string;
  projectname: string;
  totaltasks: number;
  completedtasks: number;
};

export const columns: ColumnDef<Data>[] = [
  {
    id: "select",
    header: () => <Box className="text-center text-black p-2">#</Box>,
    cell: ({ row }) => (
      <Box className="text-center px-2 py-3">0{row.index + 1}</Box>
    ),
    enableSorting: false,
    // enableHiding: false,
  },

  {
    accessorKey: "projectname",
    header: () => <Box className="text-black w-60">Project Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize w-60 max-sm:w-full">
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
    accessorKey: "totaltasks",
    header: () => <Box className="text-black text-center">Total Tasks</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.totaltasks}</Box>
    ),
  },
  {
    accessorKey: "completedtasks",
    header: () => <Box className="text-black text-center">Completed Tasks</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">
        {row.original.completedtasks}
      </Box>
    ),
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
    accessorKey: "actions",
    header: () => <Box className="text-center text-black">Actions</Box>,
    cell: () => {
      return (
        <Center className="space-x-2 underline text-blue-500">
          View Details
        </Center>
      );
    },
  },
];

export const MyProjectsTable = () => {
  return (
    <ReusableTable
      data={data}
      columns={columns}
      // searchInput={false}
      enablePaymentLinksCalender={true}
      onRowClick={(row) => console.log("Row clicked:", row.original)}
    />
  );
};
