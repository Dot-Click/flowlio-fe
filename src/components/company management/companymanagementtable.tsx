import {
  Row,
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "@/components/common/generalmodal";
import { Filter, LogIn, PencilLine, Search, Trash2, Bell } from "lucide-react";
import { CompanyManagementHeaderProps } from "./companymanagementheader";
import { NotificationForm } from "./notificationform";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Center } from "../ui/center";
import { Flex } from "../ui/flex";
import { Box } from "../ui/box";
import * as React from "react";

const data: Data[] = [
  {
    id: "1",
    status: "active",
    companyname: "ken Stack",
    ownername: "ken99",
    email: "example@gmail.com",
    phone: "+11111111",
    logo: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    companyname: "jack Stack",
    status: "inactive",
    ownername: "Abe45",
    email: "example@gmail.com",
    phone: "+222222222",
    logo: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "3",
    companyname: "ken Stack",
    status: "active",
    ownername: "Monserrat44",
    email: "example@gmail.com",
    phone: "+33333333",
    logo: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "4",
    companyname: "silwa Stack",
    status: "inactive",
    ownername: "Silas22",
    email: "example@gmail.com",
    phone: "+44444444",
    logo: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "5",
    companyname: "ken Stack",
    status: "active",
    ownername: "carmella",
    email: "example@gmail.com",
    phone: "+2090078601",
    logo: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "6",
    companyname: "ken Stack",
    status: "inactive",
    ownername: "carmella",
    email: "example@gmail.com",
    phone: "+2090078601",
    logo: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "7",
    companyname: "ken Stack",
    status: "active",
    ownername: "carmella",
    email: "example@gmail.com",
    phone: "+2090078601",
    logo: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "8",
    companyname: "ken Stack",
    status: "inactive",
    ownername: "carmella",
    email: "example@gmail.com",
    phone: "+2090078601",
    logo: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "9",
    companyname: "ken Stack",
    status: "active",
    ownername: "carmella",
    email: "example@gmail.com",
    phone: "+2090078601",
    logo: "https://i.pravatar.cc/150?img=2",
  },
];

export type Data = {
  id: string;
  logo: string;
  status: "inactive" | "active" | "active";
  ownername: string;
  companyname: string;
  email: string;
  phone: string;
};

export const columns = (
  goToStep: (step: CompanyManagementHeaderProps["step"]) => void
): ColumnDef<Data>[] => [
  {
    id: "ID",
    header: () => <Box className="text-center">#</Box>,
    cell: ({ row }) => (
      <Box className="text-center max-sm:p-2">{row.index + 1}</Box>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "logo",
    header: () => <Box className="text-black text-center">Logo</Box>,
    cell: ({ row }) => (
      <Center>
        <img
          src={row.original.logo}
          alt="logo"
          className="w-10 h-10 rounded-full"
        />
      </Center>
    ),
  },
  {
    accessorKey: "companyname",
    header: () => <Box className="text-black text-center">Company Name</Box>,
    cell: ({ row }) => (
      <Box className="lowercase text-center">{row.original.companyname}</Box>
    ),
  },

  {
    accessorKey: "ownername",
    header: () => <Box className="text-center text-black">Owner Name</Box>,
    cell: ({ row }) => (
      <Box className="lowercase text-center">{row.original.ownername}</Box>
    ),
  },

  {
    accessorKey: "email",
    header: () => <Box className="text-center text-black">Email</Box>,
    cell: ({ row }) => {
      return <Box className="text-center">{row.original.email}</Box>;
    },
  },

  {
    accessorKey: "phone",
    header: () => <Box className="text-center text-black">Phone</Box>,
    cell: ({ row }) => {
      return <Box className="text-center">{row.original.phone}</Box>;
    },
  },

  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as "inactive" | "active";
      const statusStyles: Record<typeof status, { text: string; dot: string }> =
        {
          active: {
            text: "text-green-600 bg-green-100 border-green-600",
            dot: "bg-green-600",
          },
          inactive: {
            text: "text-red-600 bg-red-100/50 border-red-600",
            dot: "bg-red-600",
          },
        };

      return (
        <Center>
          <Center
            className={`rounded-md capitalize w-32 h-10 flex items-center gap-2 border ${statusStyles[status].text}`}
          >
            <Box
              className={`w-2 h-2 rounded-full ${statusStyles[status].dot}`}
            />
            {status}
          </Center>
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
          {" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gray-100 cursor-pointer hover:bg-gray-200"
                >
                  <LogIn />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Login To Company</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => goToStep("create new company")}
                  className="bg-green-100 border border-green-200 hover:bg-green-200"
                >
                  <PencilLine className="text-green-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Edit Company</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-200/50 hover:bg-red-200 border border-red-200"
                >
                  <Trash2 className="text-red-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Delete Company</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Center>
      );
    },
  },
];

export const CompanyManagementTable: React.FC<CompanyManagementHeaderProps> = ({
  goToStep,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columnDisplayNames: Record<string, string> = {
    id: "ID",
    logo: "Logo",
    status: "Status",
    ownername: "Owner Name",
    companyname: "Company Name",
    email: "Email",
    phone: "Phone",
  };

  const table = useReactTable({
    data,
    columns: columns(goToStep),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (
      row: Row<Data>,
      _columnId: string,
      filterValue: string
    ) => {
      const search = filterValue.toLowerCase();
      const ownername = row.original.ownername as string;
      const companyname = row.original.companyname as string;
      const phone = row.original.phone as string;
      const email = row.original.email as string;
      const rowIndex = (row.index + 1).toString();
      return (
        ownername.toLowerCase().includes(search) ||
        companyname.toLowerCase().includes(search) ||
        rowIndex.includes(search) ||
        email.toLowerCase().includes(search) ||
        phone.toLowerCase().includes(search)
      );
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const modalProps = useGeneralModalDisclosure({
    contentProps: {
      className: "sm:max-w-[500px]",
    },
  });

  const handleNotificationSubmit = (values: {
    subject: string;
    message: string;
  }) => {
    console.log("Sending notification:", values);
  };

  return (
    <Box className="w-full mt-4">
      <Flex className="justify-between py-4 max-md:flex-col items-start">
        <Flex className="relative w-md max-sm:w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-10 bg-white"
          />
        </Flex>

        <Flex className="max-md:w-full justify-between max-sm:flex-col items-start gap-2">
          <Button
            variant="secondary"
            className="cursor-pointer border border-blue-400 bg-blue-100 hover:bg-blue-200 text-blue-600"
            onClick={() => {
              modalProps.onOpenChange(true);
              modalProps.setContentProps({
                className: "min-w-fit",
                children: (
                  <NotificationForm
                    onClose={() => modalProps.onOpenChange(false)}
                    onSubmit={handleNotificationSubmit}
                  />
                ),
              });
            }}
          >
            <Bell className="mr-2 h-4 w-4" />
            Send Mass Notification
          </Button>

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-md:mr-auto cursor-pointer"
                    >
                      <Filter />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent className="mb-0.5">
                  <p>Filter Company Table</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnDisplayNames[column.id] || column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
      </Flex>

      <Box className="rounded-md border">
        <Table>
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      <GeneralModal {...modalProps} />
    </Box>
  );
};
