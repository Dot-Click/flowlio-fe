import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "../ui/box";
import { ReusableTable } from "../reusable/reusabletable";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Flex } from "../ui/flex";
import { CircleCheck } from "lucide-react";
import { IoMdDownload } from "react-icons/io";

const data: Data[] = [
  {
    id: "1",
    status: "Paid",
    datepaid: new Date(),
    amount: 150.0,
    clientname: "Mike Wangi",
  },
  {
    id: "2",
    status: "Paid",
    datepaid: new Date(),
    amount: 150.0,
    clientname: "Mike Wangi",
  },
  {
    id: "3",
    status: "Paid",
    datepaid: new Date(),
    amount: 150.0,
    clientname: "Mike Wangi",
  },
  {
    id: "4",
    status: "Paid",
    datepaid: new Date(),
    amount: 150.0,
    clientname: "Mike Wangi",
  },
  {
    id: "5",
    status: "Paid",
    datepaid: new Date(),
    amount: 150.0,
    clientname: "Mike Wangi",
  },
  {
    id: "6",
    status: "Paid",
    datepaid: new Date(),
    amount: 150.0,
    clientname: "Mike Wangi",
  },
  {
    id: "7",
    status: "Paid",
    datepaid: new Date(),
    amount: 150.0,
    clientname: "Mike Wangi",
  },
  {
    id: "8",
    status: "Paid",
    datepaid: new Date(),
    amount: 150.0,
    clientname: "Mike Wangi",
  },
  {
    id: "9",
    status: "Paid",
    datepaid: new Date(),
    amount: 150.0,
    clientname: "Mike Wangi",
  },
];

export type Data = {
  id: string;
  status: string;
  amount: number;
  datepaid: Date;
  clientname: string;
};

export const columns: ColumnDef<Data>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Flex className="py-3 px-3 space-x-2">
        <Checkbox
          className="bg-[#D9D9D9] border-none cursor-pointer"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <Box className="text-center text-black">Invoice Number</Box>
      </Flex>
    ),
    cell: ({ row }) => (
      <Flex className="py-3 px-3 space-x-2">
        <Checkbox
          className="bg-[#D9D9D9] border-none cursor-pointer"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
        <Box className="text-center">S1-123-{row.index + 346}</Box>
      </Flex>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "clientname",
    header: () => <Box className="text-black">Client Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize p-1">{row.original.clientname}</Box>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <Box className="text-center text-black">Amount</Box>,
    cell: ({ row }) => {
      return <Box className="text-center">$ {row.original.amount}</Box>;
    },
  },
  {
    accessorKey: "datepaid",
    header: () => <Box className="text-black text-center">Date Paid</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">
        {row.original.datepaid.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Box>
    ),
  },

  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      return (
        <Center className="text-center space-x-2">
          <CircleCheck className="text-green-500 size-5" />
          <Box className="text-center text-[15px]">{row.original.status}</Box>
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
          <Button
            // variant="outline"
            className="bg-[#1797b9] border-none hover:bg-[#1797b9]/80 cursor-pointer rounded-full border-2 border-red-500 space-x-2 text-white"
          >
            <IoMdDownload className="size-5 text-white" />
            Download
          </Button>
        </Center>
      );
    },
  },
];

export const InvoiceTable = () => {
  return (
    <ReusableTable
      data={data}
      columns={columns}
      // searchInput={false}
      enablePaymentLinksCalender={false}
      searchClassName="rounded-full"
      filterClassName="rounded-full"
      onRowClick={(row) => console.log("Row clicked:", row.original)}
    />
  );
};
