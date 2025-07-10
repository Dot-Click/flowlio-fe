import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/common/pagewrapper";
import { IoEye } from "react-icons/io5";
import { Flex } from "@/components/ui/flex";

const data: Data[] = [
  {
    id: "1",
    status: "Active",
    submittedby: "Abe45",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "2",
    status: "Active",
    submittedby: "Abe45",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "3",
    status: "Active",
    submittedby: "Monserrat44",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "4",
    status: "Active",
    submittedby: "Silas22",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "5",
    status: "Active",
    submittedby: "carmella",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
];

export type Data = {
  id: string;
  status: string;
  submittedby: string;
  companyname: string;
  email: string;
  registrationDate: Date;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "companyname",
    header: () => <Box className="text-black p-4">Company Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize p-4 max-sm:w-full">
        {row.original.companyname.length > 28
          ? row.original.companyname.slice(0, 28) + "..."
          : row.original.companyname}
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
    accessorKey: "registrationDate",
    header: () => (
      <Box className="text-black text-start">Registration Date</Box>
    ),
    cell: ({ row }) => (
      <Box className="captialize text-start">
        {row.original.registrationDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Box>
    ),
  },

  {
    accessorKey: "status",
    header: () => <Center className="text-center text-black">Status</Center>,
    cell: ({ row }) => {
      return (
        <Flex className="capitalize w-18 h-7 gap-2 border justify-center items-center text-white bg-white border-[#00A400] rounded-full">
          <Center className="gap-2">
            <Flex className="w-1.5 h-1.5 items-start rounded-full bg-[#00A400]" />
            <h1 className="text-[#00A400] text-xs">{row.original.status}</h1>
          </Center>
        </Flex>
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
            variant="outline"
            className="bg-[#424242] border-none hover:bg-black/80 cursor-pointer rounded-lg h-11 w-12"
          >
            <IoEye className="size-6 fill-white" />
          </Button>
        </Center>
      );
    },
  },
];

export const ViewTable = () => {
  return (
    <PageWrapper className="bg-white border-none w-full min-h-full p-0">
      <h1 className="text-black text-xl max-sm:text-lg font-medium p-4 pb-0">
        Employees
      </h1>

      <ReusableTable
        data={data}
        columns={columns}
        searchInput={false}
        enablePaymentLinksCalender={false}
        searchClassName="rounded-full"
        filterClassName="rounded-full"
        enableGlobalFilter={false}
        onRowClick={(row) => console.log("Row clicked:", row.original)}
        enableSuperAdminTable={false}
        enableCompanyDetailsTable={true}
      />
    </PageWrapper>
  );
};
