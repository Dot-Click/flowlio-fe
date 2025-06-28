import {
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
  SortingState,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Stack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Center } from "@/components/ui/center";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { ArrowDownUp, ListFilter, Search, PlusIcon } from "lucide-react";
import { Input } from "../ui/input";

// Define the props interface for the reusable table
export interface ReusableTableProps<TData> {
  data: TData[];
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  columns: ColumnDef<TData>[];
  headerDescriptionWidth?: string;
  headerDescription?: string;
  searchInput?: boolean;
  addbuttontext?: boolean;
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  defaultSorting?: SortingState;
  enableCompanyColumnVisibility?: boolean;
  enableHospitalColumnVisibility?: boolean;
  enableEmployeeColumnVisibility?: boolean;
  enableInvoiceActiveVisibility?: boolean;
  enableReportAnalyticsVisibility?: boolean;
  enableActiveExportColumnVisibility?: boolean;
  enableCompanyEmpManagement?: boolean;
  addemployeelogo?: boolean;
  Filterbutton?: boolean;
  onRowClick?: (row: Row<TData>) => void;
  defaultColumnVisibility?: VisibilityState;
  defaultColumnFilters?: ColumnFiltersState;
  goToStep?: (step: string) => void;
}

export const ReusableTable = <TData,>({
  data,
  columns,
  headerDescriptionWidth = "w-full",
  headerDescription = "Manage your data",
  searchInput = true,
  enableGlobalFilter = true,
  //   enableColumnFilters = true,
  enableSorting = true,
  //   enableRowSelection = true,
  enableHospitalColumnVisibility = true,
  enableActiveExportColumnVisibility = true,
  enableReportAnalyticsVisibility = true,
  enableCompanyEmpManagement = true,
  addemployeelogo = true,
  Filterbutton = true,
  goToStep,
  onRowClick,
  defaultColumnVisibility = {},
  defaultSorting = [],
  defaultColumnFilters = [],
}: ReusableTableProps<TData>) => {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(defaultColumnFilters);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(defaultColumnVisibility);

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
      row: Row<TData>,
      _columnId: string,
      filterValue: string
    ) => {
      const search = filterValue.toLowerCase();
      return Object.values(row.original as Record<string, unknown>).some(
        (value) => String(value).toLowerCase().includes(search)
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
    <Box className="bg-gray-100 rounded-xl w-full p-2">
      <Stack className="gap-4">
        {enableReportAnalyticsVisibility && (
          <Flex
            className={cn(
              "justify-between w-full py-2 gap-3 flex-col lg:flex-row lg:items-center"
            )}
          >
            <Stack>
              <h1>Projects</h1>
              <h1 className={`${headerDescriptionWidth}`}>
                {headerDescription}
              </h1>
            </Stack>

            {enableActiveExportColumnVisibility && data.length > 0 && (
              <Flex>
                <h1> here will be add employe page redirect</h1>
              </Flex>
            )}
          </Flex>
        )}

        {enableGlobalFilter && (
          <Flex className="justify-between flex-col lg:flex-row items-center w-full">
            {enableCompanyEmpManagement && (
              <p className="text-nowrap mt-2">All Users(0)</p>
            )}
            <Flex className={cn("relative", searchInput && "md:ml-auto")}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5.5 w-5.5 text-gray-400 font-light" />
              <Input
                type="search"
                placeholder="Search"
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="w-72 md:w-115 lg:w-80 xl:w-[400px] py-6 pl-10 bg-white h-11  placeholder:text-gray-400 placeholder:text-[15px] border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#0aafba] active:border-gray-200 focus:ring-0 focus:ring-offset-0"
              />
            </Flex>
            <Flex>
              <Stack className="lg:flex-row">
                {enableHospitalColumnVisibility && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Center className="gap-2 rounded-md cursor-pointer bg-white border-2 border-gray-200 w-28 h-10">
                        <ArrowDownUp className="size-4.5" />
                        <h1>Type</h1>
                      </Center>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuCheckboxItem>
                        Hospital
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Pharmacy
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      aria-haspopup="dialog"
                      className={cn(
                        "cursor-pointer bg-white border-2 border-gray-200 lg:w-32 md:w-[460px] w-72 h-13",
                        Filterbutton && "mr-4"
                      )}
                    >
                      <ListFilter />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
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
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Stack>
            </Flex>
          </Flex>
        )}
      </Stack>

      <Box className="mt-6 rounded-md border">
        <Table>
          <TableHeader className="bg-accent ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" cursor-pointer">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn("text-black font-semibold py-4 px-5")}
                    onClick={
                      enableSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className=" cursor-pointer"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={cn("bg-white py-4 px-5")}
                      key={cell.id}
                    >
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
                  {addemployeelogo ? (
                    <Flex className="justify-center items-center h-screen">
                      <Stack className="justify-center items-center gap-4">
                        <Stack className="gap-1">
                          <h3 className="font-semibold text-md">
                            Manage Your Employees Seamlessly
                          </h3>
                          <p>
                            Add employees to assign benefits and track
                            healthcare usage.
                          </p>
                        </Stack>
                        <Button
                          onClick={() => goToStep?.("add employee")}
                          className="w-40 h-12 bg-[#0A51BA] hover:bg-[#0a50bad8] cursor-pointer"
                        >
                          <PlusIcon />
                          Add Employee
                        </Button>
                      </Stack>
                    </Flex>
                  ) : (
                    "No Result"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
