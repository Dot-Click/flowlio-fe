import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { PageWrapper } from "@/components/common/pagewrapper";
import { IoEye } from "react-icons/io5";

const data: Data[] = [
  {
    id: "1",
    plan: "Enterprice",
    country: "USA",
    submittedby: "Abe45",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "2",
    plan: "Enterprice",
    country: "USA",
    submittedby: "Abe45",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "3",
    plan: "Enterprice",
    country: "USA",
    submittedby: "Monserrat44",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "4",
    plan: "Enterprice",
    country: "USA",
    submittedby: "Silas22",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "5",
    plan: "Enterprice",
    country: "USA",
    submittedby: "carmella",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "6",
    submittedby: "carmella",
    plan: "Enterprice",
    country: "USA",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "7",
    plan: "Enterprice",
    country: "USA",
    submittedby: "carmella",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "8",
    plan: "Enterprice",
    country: "USA",
    submittedby: "carmella",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "9",
    plan: "Enterprice",
    country: "USA",
    submittedby: "carmella",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
];

export type Data = {
  id: string;
  plan: string;
  submittedby: string;
  country: string;
  companyname: string;
  email: string;
  registrationDate: Date;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "companyname",
    header: () => <Box className="text-black py-3 px-3">Company Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize py-3 px-3 max-sm:w-full">
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
    accessorKey: "country",
    header: () => <Box className="text-black text-center">Country</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.country}</Box>
    ),
  },

  {
    accessorKey: "plan",
    header: () => <Box className="text-center text-black">Plan</Box>,
    cell: ({ row }) => {
      return <Box className="text-center">{row.original.plan}</Box>;
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

export const SuperAdminTable = () => {
  return (
    <PageWrapper>
      <Center className="justify-between p-4">
        <Stack className="gap-1">
          <h1 className="text-black text-2xl max-sm:text-xl font-medium">
            Recently Registered Companies
          </h1>
        </Stack>
      </Center>

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
