import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "../ui/box";
import { ReusableTable } from "../reusable/reusabletable";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Flex } from "../ui/flex";
import { Copy } from "lucide-react";

const data: Data[] = [
  {
    id: "1",
    description: "Lorem Ipsum is simply dummy text of th",
    project: "Foundation Plan",
    submittedby: "Abe45",
    clientname: "Mike Wangi",
  },
  {
    id: "2",
    description: "Lorem Ipsum is simply dummy text of th",
    project: "Foundation Plan",
    submittedby: "Abe45",
    clientname: "Mike Wangi",
  },
  {
    id: "3",
    description: "Lorem Ipsum is simply dummy text of th",
    project: "ClientBridge CRM Upgrade",
    submittedby: "Monserrat44",
    clientname: "Mike Wangi",
  },
  {
    id: "4",
    description: "Lorem Ipsum is simply dummy text of th",
    project: "ClientBridge CRM Upgrade",
    submittedby: "Silas22",
    clientname: "Mike Wangi",
  },
  {
    id: "5",
    description: "Lorem Ipsum is simply dummy text of th",
    project: "ClientBridge CRM Upgrade",
    submittedby: "carmella",
    clientname: "Mike Wangi",
  },
  {
    id: "6",
    description: "Lorem Ipsum is simply dummy text of th",
    project: "Foundation Plan",
    submittedby: "carmella",
    clientname: "Mike Wangi",
  },
  {
    id: "7",
    description: "Lorem Ipsum is simply dummy text of th",
    project: "Foundation Plan",
    submittedby: "carmella",
    clientname: "Mike Wangi",
  },
  {
    id: "8",
    description: "Lorem Ipsum is simply dummy text of th",
    project: "Foundation Plan",
    submittedby: "carmella",
    clientname: "Mike Wangi",
  },
  {
    id: "9",
    description: "Lorem Ipsum is simply dummy text of th",
    project: "Foundation Plan",
    submittedby: "carmella",
    clientname: "Mike Wangi",
  },
];

export type Data = {
  id: string;
  description: string;
  submittedby: string;
  project: string;
  clientname: string;
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
    accessorKey: "clientname",
    header: () => <Box className="text-black p-1">Client Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize p-1 w-24 max-sm:w-full">
        {row.original.clientname.length > 28
          ? row.original.clientname.slice(0, 28) + "..."
          : row.original.clientname}
      </Box>
    ),
  },
  {
    accessorKey: "project",
    header: () => <Box className="text-black text-start">Project</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-start">{row.original.project}</Box>
    ),
  },

  {
    accessorKey: "description",
    header: () => <Box className="text-start text-black">Description</Box>,
    cell: ({ row }) => {
      return (
        <Box className="text-start">
          {row.original.description.length > 50
            ? row.original.description.slice(0, 50) + "..."
            : row.original.description}
        </Box>
      );
    },
  },

  {
    accessorKey: "actions",
    header: () => <Box className="text-center text-black">Actions</Box>,
    cell: () => {
      return (
        <Center className="space-x-2">
          <Button
            // variant="outline"
            className="bg-[#e9eefd] border-none text-black hover:bg-[#e9eefd] cursor-pointer rounded-full border-2 border-red-500"
          >
            <Copy />
            Copy Link
          </Button>
        </Center>
      );
    },
  },
];

export const PaymentLinksTable = () => {
  const handleStepChange = (step: string) => {
    console.log("step:", step);
  };

  return (
    <ReusableTable
      data={data}
      columns={columns}
      searchInput={false}
      enablePaymentLinksCalender={false}
      searchClassName="rounded-full"
      filterClassName="rounded-full"
      onRowClick={(row) => console.log("Row clicked:", row.original)}
      goToStep={handleStepChange}
    />
  );
};
