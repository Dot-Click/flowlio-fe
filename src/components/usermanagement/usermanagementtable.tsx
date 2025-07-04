import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { ReusableTable } from "../reusable/reusabletable";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaRegTrashAlt } from "react-icons/fa";

const data: Data[] = [
  {
    id: "1",
    role: "Manager",
    status: "active",
    projectname: "Mike Wangi",
    email: "mikewangi@gmail.com",
    addedon: new Date("2025-03-01T00:00:00"),
    company: "XYZ Corp",
  },
  {
    id: "2",
    role: "Manager",
    projectname: "Mike Wangi",
    status: "invited",
    email: "Abe45@gmail.com",
    addedon: new Date("2025-06-01T00:00:00"),
    company: "XYZ Corp",
  },
  {
    id: "3",
    role: "Manager",
    projectname: "Mike tyson",
    status: "active",
    email: "Monserrat44@gmail.com",
    addedon: new Date("2025-02-01T00:00:00"),
    company: "XYZ Corp",
  },
  {
    id: "4",
    role: "Field Engineer",
    projectname: "Mike Wangi",
    status: "invited",
    email: "Silas22@gmail.com",
    addedon: new Date("2025-06-01T00:00:00"),
    company: "XYZ Corp",
  },
  {
    id: "5",
    role: "Field Engineer",
    projectname: "Mike Wangi",
    status: "active",
    email: "carmella@gmail.com",
    addedon: new Date("2025-04-01T00:00:00"),
    company: "XYZ Corp",
  },
  {
    id: "6",
    role: "Field Engineer",
    projectname: "Mike Wangi",
    status: "deactivated",
    email: "carmella@gmail.com",
    addedon: new Date("2025-05-11T00:00:00"),
    company: "XYZ Corp",
  },
  {
    id: "7",
    role: "Sub Contractor",
    projectname: "Mike Wangi",
    status: "active",
    email: "carmella@gmail.com",
    addedon: new Date("2025-06-01T00:00:00"),
    company: "XYZ Corp",
  },
  {
    id: "8",
    role: "Sub Contractor",
    projectname: "Mike Wangi",
    status: "invited",
    email: "carmella@gmail.com",
    addedon: new Date("2025-06-01T00:00:00"),
    company: "XYZ Corp",
  },
  {
    id: "9",
    role: "Sub Contractor",
    projectname: "Mike Wangi",
    status: "deactivated",
    email: "carmella@gmail.com",
    addedon: new Date("2025-06-01T00:00:00"),
    company: "XYZ Corp",
  },
];

export type Data = {
  id: string;
  role: string;
  status: "active" | "invited" | "deactivated";
  email: string;
  company: string;
  projectname: string;
  addedon: Date;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "projectname",
    header: () => <Box className="text-black pl-4">Name</Box>,
    cell: ({ row }) => (
      <Flex className="capitalize pl-4 w-30 max-sm:w-full">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {row.original.projectname.length > 14
          ? row.original.projectname.slice(0, 14) + "..."
          : row.original.projectname}
      </Flex>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <Box className="text-black text-start w-26 max-lg:w-full font-medium">
        Email
      </Box>
    ),
    cell: ({ row }) => (
      <Flex className="items-start justify-start gap-2  w-26 max-lg:w-full">
        <Box className="text-sm ">{row.original.email}</Box>
      </Flex>
    ),
  },
  {
    accessorKey: "company",
    header: () => <Box className="text-black text-center">Company</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.company}</Box>
    ),
  },

  {
    accessorKey: "role",
    header: () => <Box className="text-center text-black">role</Box>,
    cell: ({ row }) => {
      return <Center className="text-center">{row.original.role} </Center>;
    },
  },
  {
    accessorKey: "addedon",
    header: () => <Box className="text-center text-black">Added On</Box>,
    cell: ({ row }) => {
      const addedon = row.original.addedon;
      try {
        return (
          <Box className="text-center">{format(addedon, "MMM d, yyyy")}</Box>
        );
      } catch (error) {
        console.error("Invalid date:", addedon);
        console.log(error);
        return <Box className="text-center">Invalid Date</Box>;
      }
    },
  },

  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as
        | "active"
        | "invited"
        | "deactivated";

      const statusStyles: Record<typeof status, { text: string; dot: string }> =
        {
          active: {
            text: "text-white bg-[#00A400] border-none rounded-full",
            dot: "bg-white",
          },
          invited: {
            text: "text-white bg-[#005FA4] border-none rounded-full",
            dot: "bg-white",
          },
          deactivated: {
            text: "text-white bg-[#A50403] border-none rounded-full",
            dot: "bg-white",
          },
        };

      return (
        <Center>
          <Flex
            className={`rounded-md capitalize w-30 h-10 gap-2 border justify-center items-center ${statusStyles[status].text}`}
          >
            <Center className="gap-2">
              <Flex
                className={`w-2 h-2 items-start rounded-full ${statusStyles[status].dot}`}
              />
              <h1>{status}</h1>
            </Center>
          </Flex>
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
                <p>Delete User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Center>
      );
    },
  },
];

export const UserManagementTable = () => {
  const handleStepChange = (step: string) => {
    console.log("step:", step);
  };

  return (
    <ReusableTable
      data={data}
      columns={columns}
      searchInput={false}
      enablePaymentLinksCalender={true}
      onRowClick={(row) => console.log("Row clicked:", row.original)}
      goToStep={handleStepChange}
    />
  );
};
