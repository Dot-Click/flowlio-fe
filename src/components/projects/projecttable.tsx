import { ColumnDef } from "@tanstack/react-table";
import { Stack } from "@/components/ui/stack";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Center } from "@/components/ui/center";
import { IoIosArrowDown } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { Ellipsis } from "lucide-react";
import { ReusableTable } from "../reusable/reusabletable";

const data: Data[] = [
  {
    id: "1",
    phonenumber: "+1 234 56789",
    status: "active",
    employeename: "Summit Mfg Ltd",
    registered: "2025-05-12",
    emailaddress: "summitmfg@info",
  },
  {
    id: "2",
    phonenumber: "+1 234 56789",
    employeename: "Summit Mfg Ltd",
    status: "deactive",
    registered: "2025-05-12",
    emailaddress: "summitmfg@info",
  },
  {
    id: "3",
    phonenumber: "+1 234 56789",
    employeename: "App Design",
    status: "active",
    registered: "2025-05-12",
    emailaddress: "summitmfg@info",
  },
  {
    id: "4",
    phonenumber: "+1 234 56789",
    employeename: "ken Stack",
    status: "deactive",
    registered: "2025-05-12",
    emailaddress: "summitmfg@info",
  },
  {
    id: "5",
    phonenumber: "+1 234 56789",
    employeename: "Summit Mfg Ltd",
    status: "active",
    registered: "2025-05-12",
    emailaddress: "summitmfg@info",
  },
  {
    id: "6",
    phonenumber: "+1 234 56789",
    employeename: "ken Stack",
    status: "deactive",
    registered: "2025-05-12",
    emailaddress: "summitmfg@info",
  },
  {
    id: "7",
    phonenumber: "+1 234 56789",
    employeename: "API Dev",
    status: "active",
    registered: "2025-05-12",
    emailaddress: "summitmfg@info",
  },
  {
    id: "8",
    phonenumber: "+1 234 56789",
    employeename: "ken Stack",
    status: "deactive",
    registered: "2025-05-12",
    emailaddress: "summitmfg@info",
  },
  {
    id: "9",
    phonenumber: "+1 234 56789",
    employeename: "Summit Mfg Ltd",
    status: "active",
    registered: "2025-05-12",
    emailaddress: "summitmfg@info",
  },
];

export type Data = {
  id: string;
  phonenumber: string;
  status: "deactive" | "active";
  registered: string;
  employeename: string;
  emailaddress?: string;
};

export const columns = (): ColumnDef<Data>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Box className="text-start text-black flex items-center gap-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border border-gray-300 bg-white"
        />
        <h1 className="text-[#525252]">Employee ID</h1>

        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Box>
    ),
    cell: ({ row }) => (
      <Flex className="text-start items-center gap-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border border-gray-300 bg-white"
        />
        {row.index + 1001}
      </Flex>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "employeename",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Employee Name</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="lowercase text-start">{row.original.employeename}</Box>
    ),
  },
  {
    accessorKey: "emailaddress",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Email Address</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="lowercase text-start">{row.original.emailaddress}</Box>
    ),
  },
  {
    accessorKey: "phonenumber",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Phone Number</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="lowercase text-start">{row.original.phonenumber}</Box>
    ),
  },
  {
    accessorKey: "registered",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Registered On</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="lowercase text-start">{row.original.registered}</Box>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Status</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Center className="bg-[#137fdf] text-white cursor-pointer hover:bg-[#137fdf]/80 hover:text-white rounded-sm w-32 h-9 justify-between items-center">
              <h1 className="text-[14px] px-2">Active</h1>
              <Center className="bg-[#0e66b7] rounded-tr-sm rounded-br-sm h-9 w-10">
                <IoIosArrowDown className="size-4" />
              </Center>
            </Center>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="p-1">
            <DropdownMenuCheckboxItem className="p-2">
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="p-2">
              Deactive
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => (
      <Flex className="text-black text-center gap-1">
        <h1 className="text-[#525252]">Actions</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: () => {
      return (
        <Center>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis className="text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0">
              <DropdownMenuCheckboxItem className="p-2 border-b-1 border-gray-200 rounded-none cursor-pointer">
                View Detils
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="p-2 border-b-1 border-gray-200 rounded-none cursor-pointer">
                Edit
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="p-2 !text-red-500 cursor-pointer">
                Delete
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      columns={columns()}
      headerDescription="Track and manage project efficiently."
      searchInput={false}
      onRowClick={(row) => console.log("Row clicked:", row.original)}
      enableCompanyColumnVisibility={true}
      enableEmployeeColumnVisibility={true}
      enableHospitalColumnVisibility={false}
      enableCompanyEmpManagement={false}
      headerDescriptionWidth="max-w-[600px]"
      goToStep={handleStepChange}
      addemployeelogo={false}
      Filterbutton={false}
      addbuttontext={false}
    />
  );
};
