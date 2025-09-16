import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { PageWrapper } from "@/components/common/pagewrapper";

const data: Data[] = [
  {
    id: "1",
    status: "Active",
    submittedby: "Abe45",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    role: "Project Manager",
  },
  {
    id: "2",
    status: "Active",
    submittedby: "Abe45",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    role: "Project Manager",
  },
  {
    id: "3",
    status: "Active",
    submittedby: "Monserrat44",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    role: "Project Manager",
  },
  {
    id: "4",
    status: "Active",
    submittedby: "Silas22",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    role: "Project Manager",
  },
  {
    id: "5",
    status: "Active",
    submittedby: "carmella",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    role: "Project Manager",
  },
];

export type Data = {
  id: string;
  status: string;
  submittedby: string;
  companyname: string;
  email: string;
  role: string;
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
    accessorKey: "role",
    header: () => <Box className="text-black text-start">Role</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-start">{row.original.role}</Box>
    ),
  },

  {
    accessorKey: "status",
    header: () => <Center className="text-black">Status</Center>,
    cell: ({ row }) => {
      return (
        <Center className="capitalize w-20 h-9 gap-2 border text-white bg-[#00A400] border-[#00A400] rounded-full text-center mx-auto">
          <Box className="w-1.5 h-1.5 rounded-full bg-white" />
          <h1 className="text-white text-xs text-center ">
            {row.original.status}
          </h1>
        </Center>
      );
    },
  },

  {
    accessorKey: "actions",
    header: () => <Box className="text-center text-black">Last Active</Box>,
    cell: () => {
      return <Center className="space-x-2">Today</Center>;
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
        // searchInput={false}
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
