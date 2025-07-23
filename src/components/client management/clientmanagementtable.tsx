import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { ReusableTable } from "../reusable/reusabletable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaRegTrashAlt } from "react-icons/fa";
import { Ellipsis, Eye, Pencil, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "../common/generalmodal";
import { useState } from "react";
import { Stack } from "../ui/stack";

const data: Data[] = [
  {
    id: "1",
    status: "New Lead",
    projectname: "Mike Wangi",
    email: "mikewangi@gmail.com",
    phonenumber: "+254722000000",
    cpfcnpj: "000.000.000-00",
    address: "123 Main St, Anytown, USA",
    industry: "Construction",
    projects: [
      {
        id: "p1",
        name: "Building A",
        status: "Completed",
        completionRate: 100,
        contractFile: "Contract-BuildingA.txt",
      },
    ],
  },
  {
    id: "2",
    projectname: "Mike Wangi",
    status: "In Negotiation",
    email: "Abe45@gmail.com",
    phonenumber: "+254722000000",
    cpfcnpj: "000.000.000-00",
    address: "123 Main St, Anytown, USA",
    industry: "Construction",
    projects: [
      {
        id: "p1",
        name: "Building A",
        status: "Completed",
        completionRate: 100,
        contractFile: "Contract-BuildingA.txt",
      },
    ],
  },
  {
    id: "3",
    projectname: "Mike tyson",
    status: "Contract Signed",
    email: "Monserrat44@gmail.com",
    phonenumber: "+254722000000",
    cpfcnpj: "000.000.000-00",
    address: "123 Main St, Anytown, USA",
    industry: "Construction",
  },
  {
    id: "4",
    projectname: "Mike Wangi",
    status: "Project In Progress",
    email: "Silas22@gmail.com",
    phonenumber: "+254722000000",
    cpfcnpj: "000.000.000-00",
    address: "123 Main St, Anytown, USA",
    industry: "Construction",
  },
  {
    id: "5",
    projectname: "Mike Wangi",
    status: "Completed",
    email: "carmella@gmail.com",
    phonenumber: "+254722000000",
    cpfcnpj: "000.000.000-00",
    address: "123 Main St, Anytown, USA",
    industry: "Construction",
  },
  {
    id: "6",
    projectname: "Mike Wangi",
    status: "Inactive Client",
    email: "carmella@gmail.com",
    phonenumber: "+254722000000",
    cpfcnpj: "000.000.000-00",
    address: "123 Main St, Anytown, USA",
    industry: "Construction",
  },
  {
    id: "7",
    projectname: "Mike Wangi",
    status: "New Lead",
    email: "carmella@gmail.com",
    phonenumber: "+254722000000",
    cpfcnpj: "000.000.000-00",
    address: "123 Main St, Anytown, USA",
    industry: "Construction",
  },
  {
    id: "8",
    projectname: "Mike Wangi",
    status: "In Negotiation",
    email: "carmella@gmail.com",
    phonenumber: "+254722000000",
    cpfcnpj: "000.000.000-00",
    address: "123 Main St, Anytown, USA",
    industry: "Construction",
  },
  {
    id: "9",
    projectname: "Mike Wangi",
    status: "Contract Signed",
    email: "carmella@gmail.com",
    phonenumber: "+254722000000",
    cpfcnpj: "000.000.000-00",
    address: "123 Main St, Anytown, USA",
    industry: "Construction",
  },
];
export type Project = {
  id: string;
  name: string;
  status:
    | "New Lead"
    | "In Negotiation"
    | "Contract Signed"
    | "Project In Progress"
    | "Completed"
    | "Inactive Client";
  completionRate: number; // 0-100
  contractFile: string; // file name or URL
};

export type Data = {
  id: string;
  status:
    | "New Lead"
    | "In Negotiation"
    | "Contract Signed"
    | "Project In Progress"
    | "Completed"
    | "Inactive Client";
  email: string;
  phonenumber: string;
  projectname: string;
  cpfcnpj: string;
  address: string;
  industry: string;
  projects?: Project[];
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
    accessorKey: "cpfcnpj",
    header: () => <Box className="text-black text-center">CPF/CNPJ</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.cpfcnpj}</Box>
    ),
  },
  {
    accessorKey: "address",
    header: () => <Box className="text-black text-center">Address</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.address}</Box>
    ),
  },

  {
    id: "social",
    header: () => <Box className="text-center text-black">Social</Box>,
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 flex items-center justify-center cursor-pointer"
          >
            <Ellipsis className="text-gray-600" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <Box className="text-sm font-semibold mb-2">Social Media</Box>
          <Box className="mb-1">
            <span className="font-medium">Email:</span> {row.original.email}
          </Box>
          <Box className="mb-1">
            <span className="font-medium">Phone:</span>{" "}
            {row.original.phonenumber}
          </Box>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    accessorKey: "industry",
    header: () => <Box className="text-black text-center">Industry</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.industry}</Box>
    ),
  },

  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as
        | "New Lead"
        | "In Negotiation"
        | "Contract Signed"
        | "Project In Progress"
        | "Completed"
        | "Inactive Client";

      const statusStyles: Record<typeof status, { text: string; dot: string }> =
        {
          "New Lead": {
            text: "text-white bg-[#00A400] border-none rounded-full",
            dot: "bg-white",
          },
          "In Negotiation": {
            text: "text-white bg-[#640D5F] border-none rounded-full",
            dot: "bg-white",
          },
          "Contract Signed": {
            text: "text-white bg-[#000000] border-none rounded-full",
            dot: "bg-white",
          },
          "Project In Progress": {
            text: "text-white bg-[#EB5B00] border-none rounded-full",
            dot: "bg-white",
          },
          Completed: {
            text: "text-white bg-[#4300FF] border-none rounded-full",
            dot: "bg-white",
          },
          "Inactive Client": {
            text: "text-white bg-[#B12C00] border-none rounded-full",
            dot: "bg-white",
          },
        };

      return (
        <Center>
          <Flex
            className={`rounded-md capitalize w-38 h-10 gap-2 border justify-center items-center ${statusStyles[status].text}`}
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
                  className="bg-[#23B95D] border-none w-9 h-9 hover:bg-[#23B95D]/80 cursor-pointer rounded-md "
                >
                  <Pencil className="text-white size-5 " />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Edit Client</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#2358B9] border-none w-9 h-9 hover:bg-[#2358B9]/80 cursor-pointer rounded-md "
                  onClick={() => {
                    console.log("View Client");
                  }}
                >
                  <Eye className="text-white size-5 " />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>View Client</p>
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
                <p>Delete Client</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Center>
      );
    },
  },
];

export const ClientManagementTable = () => {
  const props = useGeneralModalDisclosure();
  const [selectedClient, setSelectedClient] = useState<Data | null>(null);
  const openViewClientModal = (client: Data) => {
    setSelectedClient(client);
    props.onOpenChange(true);
  };

  const patchedColumns = columns.map((col) => {
    if ((col as any).accessorKey === "actions") {
      return {
        ...col,
        cell: ({ row }: any) => (
          <Center className="space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#23B95D] border-none w-9 h-9 hover:bg-[#23B95D]/80 cursor-pointer rounded-md "
                  >
                    <Pencil className="text-white size-5 " />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Edit Client</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#2358B9] border-none w-9 h-9 hover:bg-[#2358B9]/80 cursor-pointer rounded-md "
                    onClick={() => {
                      openViewClientModal(row.original);
                    }}
                  >
                    <Eye className="text-white size-5 " />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>View Client</p>
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
                  <p>Delete Client</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Center>
        ),
      };
    }
    return col;
  });

  return (
    <>
      <ReusableTable
        data={data}
        columns={patchedColumns}
        searchInput={false}
        enablePaymentLinksCalender={true}
        onRowClick={(row) => console.log("Row clicked:", row.original)}
      />
      <GeneralModal {...props} contentProps={{ className: "p-0" }}>
        {selectedClient ? (
          <Stack className="w-full bg-white rounded-xl shadow-lg p-6 gap-4">
            <Stack className="items-center">
              <Box className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <User className="text-blue-400 w-10 h-10" />
              </Box>
              <span className="text-2xl font-bold text-gray-800">
                {selectedClient.projectname}
              </span>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 mb-2"
                style={{ background: "#F3F4F6", color: "#1797B9" }}
              >
                {selectedClient.status}
              </span>
            </Stack>

            <Box className="mt-6">
              <span className="text-lg font-semibold text-gray-800 mb-2 block">
                Projects
              </span>
              {selectedClient.projects?.length !== 1 ? (
                <Box className="text-center text-gray-500">
                  No projects found
                </Box>
              ) : (
                <Stack className="gap-4">
                  {selectedClient.projects?.map((project) => (
                    <Box
                      key={project.id}
                      className="border rounded-lg p-4 shadow-sm bg-gray-50"
                    >
                      <Flex className="justify-between items-center mb-2">
                        <span className="font-bold text-gray-700">
                          {project.name}
                        </span>
                        {project.status === "Completed" && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                            Completed
                          </span>
                        )}
                      </Flex>
                      <Flex className="items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-gray-600">
                          Status:
                        </span>
                        <span
                          className="text-xs font-semibold"
                          style={{
                            color:
                              project.status === "Completed"
                                ? "#23B95D"
                                : "#1797B9",
                          }}
                        >
                          {project.status}
                        </span>
                      </Flex>
                      <Flex className="items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-gray-600">
                          Completion:
                        </span>
                        <Box className="w-32 h-2 bg-gray-200 rounded">
                          <Box
                            className="h-2 bg-blue-500 rounded"
                            style={{ width: `${project.completionRate}%` }}
                          />
                        </Box>
                        <span className="text-xs font-semibold">
                          {project.completionRate}%
                        </span>
                      </Flex>
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-1 px-4 rounded font-semibold shadow hover:from-blue-600 hover:to-cyan-500 transition cursor-pointer mt-2"
                        onClick={() => {
                          // Simulate contract download
                          const blob = new Blob(
                            [
                              `Contract for ${selectedClient.projectname} - ${project.name}`,
                            ],
                            { type: "text/plain" }
                          );
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = project.contractFile;
                          a.click();
                          window.URL.revokeObjectURL(url);
                        }}
                      >
                        Download Contract
                      </Button>
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
          </Stack>
        ) : (
          <Box>No client selected.</Box>
        )}
      </GeneralModal>
    </>
  );
};
