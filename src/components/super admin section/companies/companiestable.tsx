import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Eye } from "lucide-react";
import { ReusableTable } from "@/components/reusable/reusabletable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const data: Data[] = [
  {
    id: "1",
    progress: 3,
    status: "active",
    subscription: "Enterprise",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "2",
    progress: 30,
    status: "active",
    subscription: "Enterprise",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "3",
    progress: 10,
    status: "inActive",
    subscription: "Enterprise",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "4",
    progress: 3,
    status: "active",
    subscription: "Enterprise",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "5",
    progress: 3,
    status: "active",
    subscription: "Enterprise",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "6",
    progress: 12,
    status: "inActive",
    subscription: "Enterprise",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "7",
    progress: 3,
    status: "active",
    subscription: "Enterprise",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "8",
    progress: 24,
    status: "active",
    subscription: "Enterprise",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
  {
    id: "9",
    progress: 13,
    status: "inActive",
    subscription: "Enterprise",
    companyname: "Mike Wangi",
    email: "hello@novatech.com",
    registrationDate: new Date(),
  },
];

export type Data = {
  id: string;
  progress: number;
  status: "active" | "inActive";
  subscription: string;
  companyname: string;
  email: string;
  registrationDate: Date;
};

export const getColumns = (
  navigate: ReturnType<typeof useNavigate>
): ColumnDef<Data>[] => [
  {
    id: "select",
    header: () => <Box className="text-center text-black">ID</Box>,
    cell: ({ row }) => <Box className="text-center">#{row.original.id}</Box>,
    enableSorting: false,
    // enableHiding: false,
  },

  {
    accessorKey: "companyname",
    header: () => <Box className="text-black py-3 px-3">Company Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize py-3 px-3 max-sm:w-full">
        {row.original.companyname}
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
    header: () => <Box className="text-black text-center">Registration On</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">
        {row.original.registrationDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Box>
    ),
  },

  {
    accessorKey: "subscription",
    header: () => <Box className="text-center text-black">Subscription</Box>,
    cell: ({ row }) => {
      return <Box className="text-center">{row.original.subscription}</Box>;
    },
  },

  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as "active" | "inActive";

      const statusStyles: Record<typeof status, { text: string; dot: string }> =
        {
          active: {
            text: "text-white bg-[#00A400] border-none rounded-full",
            dot: "bg-white",
          },
          inActive: {
            text: "text-white bg-[#F98618] border-none rounded-full",
            dot: "bg-white",
          },
        };

      return (
        <Center>
          <Flex
            className={`rounded-md capitalize w-28 h-10 gap-2 border items-center ${statusStyles[status].text}`}
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
    cell: ({ row }) => {
      return (
        <Center className="space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    navigate(
                      `/superadmin/companies/details/${row.original.id}`
                    );
                  }}
                  variant="outline"
                  className="bg-black border-none w-10 h-9 hover:bg-black cursor-pointer rounded-md "
                >
                  <Eye className="fill-white size-7 " />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>View Details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#A50403] border-none w-9 h-9 hover:bg-[#A50403]/80 cursor-pointer rounded-md "
                >
                  <FaRegTrashAlt className="text-white fill-white size-4 " />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Trash</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Center>
      );
    },
  },
];

export const CompaniesTable = () => {
  const navigate = useNavigate();
  return (
    <ReusableTable
      data={data}
      columns={getColumns(navigate)}
      searchInput={false}
      enablePaymentLinksCalender={true}
      onRowClick={(row) => console.log("Row clicked:", row.original)}
    />
  );
};
