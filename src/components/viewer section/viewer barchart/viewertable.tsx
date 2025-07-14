import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { Stack } from "@/components/ui/stack";
import { PageWrapper } from "@/components/common/pagewrapper";
import Img from "/viewer/tasklistline.svg";
import TasklistIcon from "/viewer/tasklisticon.svg";
import { Flex } from "@/components/ui/flex";
import { Checkbox } from "@/components/ui/checkbox";

const data: Data[] = [
  {
    id: "1",
    trackedon: "on",
    project: "Marketing Website ",
    submittedby: "Abe45",
    taskname: "Mike Wangi",
    status: "to do",
  },
  {
    id: "2",
    trackedon: "on",
    project: "Marketing Website ",
    submittedby: "Abe45",
    taskname: "Mike Wangi",
    status: "in progress",
  },
  {
    id: "3",
    trackedon: "on",
    project: "Marketing Website ",
    submittedby: "Monserrat44",
    taskname: "Mike Wangi",
    status: "in progress",
  },
  {
    id: "4",
    trackedon: "on",
    project: "Marketing Website ",
    submittedby: "Silas22",
    taskname: "Mike Wangi",
    status: "completed",
  },
  {
    id: "5",
    trackedon: "on",
    project: "Marketing Website ",
    submittedby: "carmella",
    taskname: "Mike Wangi",
    status: "completed",
  },
  {
    id: "6",
    trackedon: "on",
    project: "Marketing Website ",
    submittedby: "carmella",
    taskname: "Mike Wangi",
    status: "completed",
  },
  {
    id: "7",
    trackedon: "on",
    project: "Marketing Website ",
    submittedby: "carmella",
    taskname: "Mike Wangi",
    status: "to do",
  },
  {
    id: "8",
    trackedon: "on",
    project: "Marketing Website ",
    submittedby: "carmella",
    taskname: "Mike Wangi",
    status: "in progress",
  },
  {
    id: "9",
    trackedon: "on",
    project: "Marketing Website ",
    submittedby: "carmella",
    taskname: "Mike Wangi",
    status: "completed",
  },
];

export type Data = {
  id: string;
  trackedon: string;
  submittedby: string;
  project: string;
  taskname: string;
  status: "in progress" | "completed" | "to do";
};

export const columns: ColumnDef<Data>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Flex className="py-3 px-3">
        <Checkbox
          className="bg-[#D9D9D9] border-none cursor-pointer"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <Box className="text-center text-black">ID</Box>
      </Flex>
    ),
    cell: ({ row }) => (
      <Flex className="py-3 px-3">
        <Checkbox
          className="bg-[#D9D9D9] border-none cursor-pointer"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
        <Box className="text-center">{row.index + 1234}</Box>
      </Flex>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "taskname",
    header: () => <Box className="text-black py-3">Task Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize py-3 w-24 max-sm:w-full">
        {row.original.taskname.length > 28
          ? row.original.taskname.slice(0, 28) + "..."
          : row.original.taskname}
      </Box>
    ),
  },
  {
    accessorKey: "taskname",
    header: () => <Box className="text-black"></Box>,
    cell: () => <Box className="capitalize w-24 max-sm:w-full"></Box>,
  },

  {
    accessorKey: "project",
    header: () => <Box className="text-black text-start">Project</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-start">{row.original.project}</Box>
    ),
  },

  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as
        | "in progress"
        | "completed"
        | "to do";

      const statusStyles: Record<typeof status, { text: string }> = {
        completed: {
          text: "text-[#3F6B3B] bg-[#DEFFDB] border-none rounded-md",
        },
        "in progress": {
          text: "text-[#6C541F] bg-[#FFF8DB] border-none rounded-md",
        },
        "to do": {
          text: "text-[#FD3995] bg-[#FFDBEC] border-none rounded-md",
        },
      };

      return (
        <Center>
          <Flex
            className={`rounded-sm capitalize w-22 h-9 gap-2 border items-center ${statusStyles[status].text}`}
          >
            <Flex className="mx-auto">
              <span>{status}</span>
            </Flex>
          </Flex>
        </Center>
      );
    },
  },

  {
    accessorKey: "trackedon",
    header: () => <Box className="text-center text-black">Tracked</Box>,
    cell: ({ row }) => {
      return <Box className="text-center">{row.original.trackedon}</Box>;
    },
  },

  {
    accessorKey: "actions",
    header: () => <Box className="text-center text-black">Actions</Box>,
    cell: () => {
      return (
        <Center className="space-x-2 text-blue-500 underline">
          View Details
        </Center>
      );
    },
  },
];

export const ViewerTable = () => {
  return (
    <PageWrapper className="h-full">
      <Stack className="gap-0 w-full p-4">
        <Center className="justify-between">
          <Flex className="gap-1">
            <img src={TasklistIcon} alt="tasklisticon" className="size-8" />
            <h1 className="text-black text-2xl max-sm:text-xl font-medium">
              Task List
            </h1>
          </Flex>
          <h1 className="text-blue-500 text-sm">View Page</h1>
        </Center>
        <img src={Img} alt="tasklistline" className="w-full mt-4" />
      </Stack>

      <ReusableTable
        data={data}
        columns={columns}
        searchInput={false}
        enablePaymentLinksCalender={false}
        searchClassName="rounded-full"
        filterClassName="rounded-full"
        enableGlobalFilter={false}
        onRowClick={(row) => console.log("Row clicked:", row.original)}
        enableSuperAdminTable={true}
      />
    </PageWrapper>
  );
};
