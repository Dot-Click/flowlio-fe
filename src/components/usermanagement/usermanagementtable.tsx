import {
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
import * as React from "react";
import { UserManagementHeaderProps } from "./usermanagementheader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Filter, Search, Send, Trash2 } from "lucide-react";
import { CalendarComponent } from "../ui/calendercomp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Center } from "../ui/center";
import { Switch } from "../ui/switch";
import { Flex } from "../ui/flex";
import { format } from "date-fns";
import { Box } from "../ui/box";

const data: Data[] = [
  {
    email: "mikewing@gmail.com",
    status: "inactived",
    name: "ken Stack",
    company: "ken99",
    role: "Manager",
    addedon: new Date(),
  },
  {
    email: "mikewing@gmail.com",
    name: "ken Stack",
    status: "active",
    company: "Abe45",
    role: "Manager",
    addedon: new Date(),
  },
  {
    email: "mikewing@gmail.com",
    name: "ken Stack",
    status: "deactivated",
    company: "Monserrat44",
    role: "Manager",
    addedon: new Date(),
  },
  {
    email: "mikewing@gmail.com",
    name: "ken Stack",
    status: "active",
    company: "Silas22",
    role: "Manager",
    addedon: new Date(),
  },
  {
    email: "mikewing@gmail.com",
    name: "ken Stack",
    status: "inactived",
    company: "carmella",
    role: "Manager",
    addedon: new Date(),
  },
  {
    email: "mikewing@gmail.com",
    name: "ken Stack",
    status: "active",
    company: "carmella",
    role: "Manager",
    addedon: new Date(),
  },
  {
    email: "mikewing@gmail.com",
    name: "ken Stack",
    status: "deactivated",
    company: "carmella",
    role: "Manager",
    addedon: new Date(),
  },
  {
    email: "mikewing@gmail.com",
    name: "ken Stack",
    status: "active",
    company: "carmella",
    role: "Manager",
    addedon: new Date(),
  },
  {
    email: "mikewing@gmail.com",
    name: "ken Stack",
    status: "inactived",
    company: "carmella",
    role: "Manager",
    addedon: new Date(),
  },
];

export type Data = {
  email: string;
  status: "active" | "inactived" | "deactivated";
  company: string;
  name: string;
  role: string;
  addedon: Date;
};

export const columns = (
  goToStep: (step: UserManagementHeaderProps["step"]) => void
): ColumnDef<Data>[] => [
  {
    accessorKey: "name",
    header: () => <Box className="text-black text-center">Name</Box>,
    cell: ({ row }) => (
      <Center className="lowercase text-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {row.original.name}
      </Center>
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
    accessorKey: "company",
    header: () => <Box className="text-center text-black">Company</Box>,
    cell: ({ row }) => (
      <Box className="lowercase text-center">{row.original.company}</Box>
    ),
  },

  {
    accessorKey: "role",
    header: () => <Box className="text-center text-black">Role</Box>,
    cell: ({ row }) => {
      return <Box className="text-center">{row.original.role}</Box>;
    },
  },

  {
    accessorKey: "addedon",
    header: () => <Box className="text-center text-black">Added On</Box>,
    cell: ({ row }) => {
      const addedon = row.original.addedon as Date;
      return (
        <Box className="text-center">
          {format(new Date(addedon), "MMM d,yyyy")}
        </Box>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as
        | "active"
        | "inactived"
        | "deactivated";

      const statusStyles: Record<typeof status, { text: string; dot: string }> =
        {
          deactivated: {
            text: "text-red-800 bg-red-100 border-red-800",
            dot: "bg-red-600",
          },
          inactived: {
            text: "text-blue-600 bg-blue-100 border-blue-600",
            dot: "bg-blue-600",
          },
          active: {
            text: "text-green-600 bg-green-100/50 border-green-600",
            dot: "bg-green-600",
          },
        };

      return (
        <Center>
          <Center
            className={`rounded-md capitalize w-32 h-10 flex items-center text-center gap-2 border ${statusStyles[status].text}`}
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
    accessorKey: "project hours",
    header: () => <Box className="text-center text-black">Project Hours</Box>,
    cell: () => {
      return (
        <Center>
          <Switch defaultChecked className="cursor-pointer" />
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
                  className="bg-accent cursor-pointer hover:bg-gray-200"
                  onClick={() => goToStep("user management")}
                >
                  <Send />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-1.5">
                <p>Go To User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-red-100 border border-red-200 hover:bg-red-200"
                >
                  <Trash2 className="text-red-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-1.5">
                <p>Delete User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Center>
      );
    },
  },
];

export const UserManagementTable: React.FC<UserManagementHeaderProps> = ({
  goToStep,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Box className="w-full mt-4">
      <Flex className="justify-between py-4 max-md:flex-col items-start">
        <Flex className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            value={
              (table.getColumn("company")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("company")?.setFilterValue(event.target.value)
            }
            className="pl-10 bg-white"
          />
        </Flex>

        <Flex className="max-md:w-full justify-between">
          <CalendarComponent />
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="ml-auto cursor-pointer"
                    >
                      <Filter />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent className="mb-0.5">
                  <p>Filter User Table</p>
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
                      {column.id}
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
    </Box>
  );
};
