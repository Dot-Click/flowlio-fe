import {
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  VisibilityState,
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
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";
import * as React from "react";
import { Box } from "@/components/ui/box";
import { format } from "date-fns/format";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Eye, Filter, Search } from "lucide-react";
import { CalendarComponent } from "../ui/calendercomp";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export const data: Data[] = [
  {
    issuename: "ken Stack",
    status: "pending",
    issuedescription: "ken99",
    date: new Date(),
    resolvedbydate: new Date(),
  },
  {
    issuename: "ken Stack",
    status: "pending",
    issuedescription: "Abe45",
    date: new Date(),
    resolvedbydate: new Date(),
  },
  {
    issuename: "ken Stack",
    status: "pending",
    issuedescription: "Monserrat44",
    date: new Date(),
    resolvedbydate: new Date(),
  },
  {
    issuename: "ken Stack",
    status: "pending",
    issuedescription: "Silas22",
    date: new Date(),
    resolvedbydate: new Date(),
  },
  {
    issuename: "ken Stack",
    status: "pending",
    issuedescription: "carmella",
    date: new Date(),
    resolvedbydate: new Date(),
  },
  {
    issuename: "ken Stack",
    status: "pending",
    issuedescription: "carmella",
    date: new Date(),
    resolvedbydate: new Date(),
  },
  {
    issuename: "ken Stack",
    status: "pending",
    issuedescription: "carmella",
    date: new Date(),
    resolvedbydate: new Date(),
  },
  {
    issuename: "ken Stack",
    status: "pending",
    issuedescription: "carmella",
    date: new Date(),
    resolvedbydate: new Date(),
  },
  {
    issuename: "ken Stack",
    status: "pending",
    issuedescription: "carmella",
    date: new Date(),
    resolvedbydate: new Date(),
  },
];

export type Data = {
  status: "pending" | "completed";
  issuedescription: string;
  issuename: string;
  date: Date;
  resolvedbydate: Date;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "issuename",
    header: () => <Box className="text-black text-center">Issue Name</Box>,
    cell: ({ row }) => (
      <Box className="lowercase text-center">{row.original.issuename}</Box>
    ),
  },

  {
    accessorKey: "issuedescription",
    header: () => (
      <Box className="text-center text-black">Issue Description</Box>
    ),
    cell: ({ row }) => (
      <Box className="lowercase text-center">
        {row.original.issuedescription}
      </Box>
    ),
  },

  {
    accessorKey: "date",
    header: () => <Box className="text-center text-black">Date</Box>,
    cell: ({ row }) => {
      const date = row.original.date as Date;
      return (
        <Box className="text-center">{format(new Date(date), "MMM d, yy")}</Box>
      );
    },
  },

  {
    accessorKey: "resolvedbydate",
    header: () => <Box className="text-center text-black">Resolved by</Box>,
    cell: ({ row }) => {
      const date = row.original.date as Date;

      return (
        <Center className="text-center">
          {format(new Date(date), "MMM d, yy")}
        </Center>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as "pending" | "completed";
      const statusStyles: Record<typeof status, { text: string; dot: string }> =
        {
          pending: {
            text: "text-yellow-700 bg-yellow-100/50 border-yellow-700",
            dot: "bg-yellow-700",
          },
          completed: {
            text: "text-green-700 bg-green-100/50 border-green-700",
            dot: "bg-green-700",
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
    header: () => <Box className="text-center text-black">Image</Box>,
    cell: () => {
      return (
        <Center>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="space-x-1 border border-gray-400 rounded-full bg-white h-12 w-20 hover:bg-white cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Eye className="size-5 text-black" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Image</DialogTitle>
                <Center>
                  <Avatar className="size-60">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Center>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Center>
      );
    },
  },
];

export const IssuesTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
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
              (table.getColumn("issuename")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("issuename")?.setFilterValue(event.target.value)
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
                      aria-haspopup="dialog"
                      className="ml-auto cursor-pointer"
                    >
                      <Filter />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Filter Issues Table</p>
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
