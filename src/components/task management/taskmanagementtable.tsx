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
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { Filter, PencilLine, RecycleIcon, Search, Trash2 } from "lucide-react";
import { CalendarComponent } from "../ui/calendercomp";
import { format, isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { Center } from "../ui/center";
import { Stack } from "../ui/stack";
import { Flex } from "../ui/flex";
import { Box } from "../ui/box";
import * as React from "react";

const data: Data[] = [
  {
    id: "1",
    LookaheadWeeks: 3,
    status: "completed",
    schedulename: "Foundation Plan",
    submittedby: "ken99",
    startDate: new Date("2025-02-21T00:00:00"),
    endDate: new Date("2025-03-01T00:00:00"),
    taskname: "Task 1",
  },
  {
    id: "2",
    LookaheadWeeks: 3,
    schedulename: "Foundation Plan",
    status: "pending",
    submittedby: "Abe45",
    startDate: new Date("2025-04-09T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    taskname: "Task 2",
  },
  {
    id: "3",
    LookaheadWeeks: 3,
    schedulename: "Foundation Plan",
    status: "completed",
    submittedby: "Monserrat44",
    startDate: new Date("2025-01-14T00:00:00"),
    endDate: new Date("2025-02-01T00:00:00"),
    taskname: "Task 3",
  },
  {
    id: "4",
    LookaheadWeeks: 3,
    schedulename: "Foundation Plan",
    status: "pending",
    submittedby: "Silas22",
    startDate: new Date("2025-02-12T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    taskname: "Task 4",
  },
  {
    id: "5",
    LookaheadWeeks: 3,
    schedulename: "Foundation Plan",
    status: "completed",
    submittedby: "carmella",
    startDate: new Date("2025-03-10T00:00:00"),
    endDate: new Date("2025-04-01T00:00:00"),
    taskname: "Task 5",
  },
  {
    id: "6",
    LookaheadWeeks: 3,
    schedulename: "Foundation Plan",
    status: "pending",
    submittedby: "carmella",
    startDate: new Date("2025-04-04T00:00:00"),
    endDate: new Date("2025-05-11T00:00:00"),
    taskname: "Task 6",
  },
  {
    id: "7",
    LookaheadWeeks: 3,
    schedulename: "Foundation Plan",
    status: "completed",
    submittedby: "carmella",
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    taskname: "Task 7",
  },
  {
    id: "8",
    LookaheadWeeks: 3,
    schedulename: "Foundation Plan",
    status: "pending",
    submittedby: "carmella",
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    taskname: "Task 8",
  },
  {
    id: "9",
    LookaheadWeeks: 3,
    schedulename: "Foundation Plan",
    status: "completed",
    submittedby: "carmella",
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    taskname: "Task 9",
  },
];

export type Data = {
  id: string;
  LookaheadWeeks: number;
  status: "pending" | "completed";
  submittedby: string;
  taskname: string;
  schedulename: string;
  startDate: Date;
  endDate: Date;
};

export const TaskManagementTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [range, setRange] = React.useState<{ from?: Date; to?: Date }>({});
  const navigate = useNavigate();

  const columnDisplayNames: Record<string, string> = {
    select: "ID",
    LookaheadWeeks: "Lookahead Weeks",
    schedulename: "Schedule Name",
    status: "Status",
    submittedby: "Submitted By",
    startDate: "Start Date",
    endDate: "End Date",
  };

  React.useEffect(() => {
    if (range.from && range.to) {
      setColumnFilters([
        {
          id: "startDate",
          value: range,
        },
      ]);
    } else {
      setColumnFilters([]); // Clear filters to show all projects
    }
  }, [range]);

  const columns: ColumnDef<Data>[] = [
    {
      id: "select",
      header: () => <Box className="text-center text-black">ID</Box>,
      cell: ({ row }) => <Box className="text-center">{row.index + 1}</Box>,
      enableSorting: false,
      // enableHiding: false,
    },

    {
      accessorKey: "schedulename",
      header: () => <Box className="text-black text-center">Schedule Name</Box>,
      cell: ({ row }) => (
        <Box className="capitalize text-center">
          {row.original.schedulename}
        </Box>
      ),
    },
    {
      accessorKey: "taskname",
      header: () => <Box className="text-black text-center">Task Names</Box>,
      cell: ({ row }) => (
        <Box className="captialize text-center">{row.original.taskname}</Box>
      ),
    },

    {
      accessorKey: "submittedby",
      header: () => <Box className="text-center text-black">Submitted By</Box>,
      cell: ({ row }) => (
        <Box className="lowercase text-center">{row.original.submittedby}</Box>
      ),
    },

    {
      accessorKey: "LookaheadWeeks",
      header: () => (
        <Box className="text-center text-black">Lookahead Weeks</Box>
      ),
      cell: ({ row }) => {
        return (
          <Box className="text-center">
            {row.original.LookaheadWeeks + " weeks"}
          </Box>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: () => <Box className="text-center text-black">Start Date</Box>,
      cell: ({ row }) => {
        const startDate = row.original.startDate;
        try {
          return (
            <Box className="text-center">
              {format(startDate, "MMM d, yyyy")}
            </Box>
          );
        } catch (error) {
          console.error("Invalid date:", startDate);
          console.log(error);
          return <Box className="text-center">Invalid Date</Box>;
        }
      },
      filterFn: (row, __columnId, filterValue: { from?: Date; to?: Date }) => {
        try {
          const { from, to } = filterValue || {};
          if (!from || !to) return true;
          const startDate = row.original.startDate;
          const endDate = row.original.endDate;
          return (
            isWithinInterval(startDate, { start: from, end: to }) ||
            isWithinInterval(endDate, { start: from, end: to }) ||
            (startDate <= from && endDate >= to)
          );
        } catch (error) {
          console.error("Date comparison error:", error);
          return false;
        }
      },
    },

    {
      accessorKey: "endDate",
      header: () => <Box className="text-center text-black">End Date</Box>,
      cell: ({ row }) => {
        const endDate = row.original.endDate;
        try {
          return (
            <Box className="text-center">{format(endDate, "MMM d, yyyy")}</Box>
          );
        } catch (error) {
          console.error("Invalid date:", endDate);
          console.log(error);
          return <Box className="text-center">Invalid Date</Box>;
        }
      },
    },

    {
      accessorKey: "status",
      header: () => <Box className="text-center text-black">Status</Box>,
      cell: ({ row }) => {
        const status = row.original.status as "pending" | "completed";

        const statusStyles: Record<
          typeof status,
          { text: string; dot: string }
        > = {
          completed: {
            text: "text-green-600 bg-green-100 border-green-600",
            dot: "bg-green-600",
          },
          pending: {
            text: "text-yellow-800 bg-yellow-100/40 border-yellow-800",
            dot: "bg-yellow-800",
          },
        };

        return (
          <Center>
            <Flex
              className={`rounded-md capitalize w-32 h-10 gap-2 border items-center ${statusStyles[status].text}`}
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
      cell: () => {
        return (
          <Center className="space-x-2">
            <Dialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border border-yellow-200 bg-amber-100 hover:bg-amber-200/50"
                      >
                        <RecycleIcon className="text-yellow-600" />
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent className="mb-2">
                    <p>View Details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Workforce Summary</DialogTitle>
                  <DialogDescription>
                    Overview of total Task, menpower, number of days, and hours.
                  </DialogDescription>
                </DialogHeader>
                <Stack className="space-y-4">
                  <Center className="justify-between">
                    <Label className="text-sm font-medium">Task Name</Label>
                    <h1>Example Task Name</h1>
                  </Center>
                  <Center className="justify-between">
                    <Label className="text-sm font-medium">Location</Label>
                    <h1>Example Location Name</h1>
                  </Center>
                  <Center className="justify-between">
                    <Label className="text-sm font-medium">Cost Code</Label>
                    <h1>Example Cost Code</h1>
                  </Center>
                  <Center className="justify-between">
                    <Label className="text-sm font-medium">Total Men</Label>
                    <span className="text-sm text-gray-900">{2}</span>
                  </Center>
                  <Center className="justify-between">
                    <Label className="text-sm font-medium">Days</Label>
                    <span className="text-sm text-gray-900">{8}</span>
                  </Center>
                  <Center className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Hours</Label>
                    <span className="text-sm text-gray-900">{12}</span>
                  </Center>
                </Stack>
              </DialogContent>
            </Dialog>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-green-100 border border-green-200 hover:bg-green-200"
                    onClick={() =>
                      navigate("/dashboard/schedule/create-schedule", {
                        state: { step: "add tasks to the schedule" },
                      })
                    }
                  >
                    <PencilLine className="text-green-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Edit Schedule</p>
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
                <TooltipContent className="mb-2">
                  <p>Delete Schedule</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Center>
        );
      },
    },
  ];

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
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (
      row: Row<Data>,
      _columnId: string,
      filterValue: string
    ) => {
      const search = filterValue.toLowerCase();
      const schedulename = row.original.schedulename as string;
      const submittedby = row.original.submittedby as string;
      const status = row.original.status as string;
      const rowIndex = (row.index + 1).toString();
      return (
        schedulename.toLowerCase().includes(search) ||
        status.toLowerCase().includes(search) ||
        submittedby.toLowerCase().includes(search) ||
        rowIndex.includes(search)
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

  return (
    <Box className="w-full mt-4">
      <Flex className="justify-between py-4 max-md:flex-col items-start">
        <Flex className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search ID , Name , Status..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-10 bg-white placeholder:text-sm"
          />
        </Flex>

        <Flex className="max-md:w-full justify-between">
          <CalendarComponent range={range} setRange={setRange} />
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
                <TooltipContent className="mb-2">
                  <p>Filter Task Table</p>
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
    </Box>
  );
};
