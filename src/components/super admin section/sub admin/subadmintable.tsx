import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { ReusableTable } from "@/components/reusable/reusabletable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data: Data[] = [
  {
    id: "1",
    contact: "+ 1 3452 12213",
    name: "Foundation Plan",
    submittedby: "ken99",
    email: "ken99@gmail.com",
    permission: "Admin",
  },
  {
    id: "2",
    name: "Foundation Plan",
    contact: "+ 1 3452 12213",
    submittedby: "Abe45",
    email: "Abe45@gmail.com",
    permission: "Admin",
  },
  {
    id: "3",
    name: "ClientBridge CRM Upgrade",
    contact: "+ 1 3452 12213",
    submittedby: "Monserrat44",
    email: "Monserrat44@gmail.com",
    permission: "Admin",
  },
  {
    id: "4",
    name: "ClientBridge CRM Upgrade",
    contact: "+ 1 3452 12213",
    submittedby: "Silas22",
    email: "Silas22@gmail.com",
    permission: "Admin",
  },
  {
    id: "5",
    name: "ClientBridge CRM Upgrade",
    contact: "+ 1 3452 12213",
    submittedby: "carmella",
    email: "carmella@gmail.com",
    permission: "Admin",
  },
  {
    id: "6",
    name: "Foundation Plan",
    contact: "+ 1 3452 12213",
    submittedby: "carmella",
    email: "carmella@gmail.com",
    permission: "Admin",
  },
  {
    id: "7",
    name: "Foundation Plan",
    contact: "+ 1 3452 12213",
    submittedby: "carmella",
    email: "carmella@gmail.com",
    permission: "Admin",
  },
  {
    id: "8",
    name: "Foundation Plan",
    contact: "+ 1 3452 12213",
    submittedby: "carmella",
    email: "carmella@gmail.com",
    permission: "Admin",
  },
  {
    id: "9",
    name: "Foundation Plan",
    contact: "+ 1 3452 12213",
    submittedby: "carmella",
    email: "carmella@gmail.com",
    permission: "Admin",
  },
];

export type Data = {
  id: string;
  contact: string;
  name: string;
  submittedby: string;
  email: string;
  permission: string;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "name",
    header: () => <Box className="text-black p-3">Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize p-3 max-sm:w-full">
        {row.original.name.length > 28
          ? row.original.name.slice(0, 28) + "..."
          : row.original.name}
      </Box>
    ),
  },
  {
    accessorKey: "email",
    header: () => <Box className="text-black text-start">Email</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-start">{row.original.email}</Box>
    ),
  },

  {
    accessorKey: "contact",
    header: () => <Box className="text-black text-center">Contact</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.contact}</Box>
    ),
  },

  {
    accessorKey: "permission",
    header: () => (
      <Box className="text-black text-center ml-12 max-sm:ml-4 w-44">
        Permission
      </Box>
    ),
    cell: () => {
      return (
        <Select>
          <SelectTrigger className="border rounded-md p-3 text-center bg-[#F3F5F5] ml-12 max-sm:ml-4 w-44">
            <SelectValue
              className="text-black"
              placeholder="Select Permission"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Sub Admin">Sub Admin</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectContent>
        </Select>
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
                  className="bg-[#A50403] border-none w-30 h-10 hover:bg-[#A50403]/80 cursor-pointer rounded-md text-white hover:text-white"
                >
                  <FaRegTrashAlt className="text-white fill-white size-4 " />
                  Delete
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Delete Sub Admin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Center>
      );
    },
  },
];

export const SubAdminTable = () => {
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
