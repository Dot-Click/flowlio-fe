import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "@/components/common/generalmodal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";

export type Data = {
  id: string;
  status: "on going" | "completed" | "to do";
  submittedby: string;
  minutes: string;
  projectname: string;
  taskname: string;
  duedate: Date;
};

const initialData: Data[] = [
  {
    id: "01",
    status: "on going",
    projectname: "Foundation Plan",
    submittedby: "ken99",
    minutes: "5hr 30 mints",
    taskname: "Design Mockup",
    duedate: new Date(),
  },
  {
    id: "02",
    status: "completed",
    projectname: "Foundation Plan",
    submittedby: "Abe45",
    minutes: "5hr 30 mints",
    taskname: "Design Mockup",
    duedate: new Date(),
  },
  {
    id: "03",
    status: "on going",
    projectname: "ClientBridge CRM Upgrade",
    submittedby: "Monserrat44",
    minutes: "5hr 30 mints",
    taskname: "Design Mockup",
    duedate: new Date(),
  },
  {
    id: "04",
    status: "completed",
    projectname: "ClientBridge CRM Upgrade",
    submittedby: "Silas22",
    minutes: "5hr 30 mints",
    taskname: "Design Mockup",
    duedate: new Date(),
  },
  {
    id: "05",
    status: "on going",
    projectname: "ClientBridge CRM Upgrade",
    submittedby: "carmella",
    minutes: "5hr 30 mints",
    taskname: "Design Mockup",
    duedate: new Date(),
  },
  {
    id: "06",
    status: "completed",
    projectname: "Foundation Plan",
    submittedby: "carmella",
    minutes: "5hr 30 mints",
    taskname: "Design Mockup",
    duedate: new Date(),
  },
  {
    id: "07",
    status: "on going",
    projectname: "Foundation Plan",
    submittedby: "carmella",
    minutes: "5hr 30 mints",
    taskname: "Design Mockup",
    duedate: new Date(),
  },
  {
    id: "08",
    status: "completed",
    projectname: "Foundation Plan",
    submittedby: "carmella",
    minutes: "5hr 30 mints",
    taskname: "Design Mockup",
    duedate: new Date(),
  },
  {
    id: "09",
    status: "on going",
    projectname: "Foundation Plan",
    submittedby: "carmella",
    minutes: "5hr 30 mints",
    taskname: "Design Mockup",
    duedate: new Date(),
  },
];

const viewDetails = [
  {
    title: "Due Date",
    description: "Aug, 10, 2025",
  },
  {
    title: "Status",
    description: "On Going",
  },
  {
    title: "Time",
    description: "5hr 30 mints",
  },
  {
    title: "Progress",
    description: "50%",
  },
];

const formSchema = z.object({
  task: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
});

export const MyTaskTable = () => {
  const [data, setData] = useState<Data[]>(initialData);
  const modalProps = useGeneralModalDisclosure();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // Handler to update status
  const handleStatusChange = (rowId: string, newStatus: Data["status"]) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, status: newStatus } : row
      )
    );
  };

  // Columns with status cell using handler
  const columns: ColumnDef<Data>[] = [
    {
      id: "select",
      header: () => <Box className="text-center text-black p-3">#</Box>,
      cell: ({ row }) => (
        <Box className="text-center px-2 py-3">0{row.index + 1}</Box>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "projectname",
      header: () => <Box className="text-black">Project Name</Box>,
      cell: ({ row }) => (
        <Box className="capitalize max-sm:w-full">
          {row.original.projectname.length > 28
            ? row.original.projectname.slice(0, 28) + "..."
            : row.original.projectname}
        </Box>
      ),
    },
    {
      accessorKey: "minutes",
      header: () => (
        <Box className="text-black text-start w-40">Time Spent</Box>
      ),
      cell: ({ row }) => (
        <Box className="captialize text-start w-40">{row.original.minutes}</Box>
      ),
    },
    {
      accessorKey: "taskname",
      header: () => <Box className="text-black text-center">Task Name</Box>,
      cell: ({ row }) => (
        <Box className="captialize text-center">{row.original.taskname}</Box>
      ),
    },
    {
      accessorKey: "duedate",
      header: () => <Box className="text-black text-center">Due Date</Box>,
      cell: ({ row }) => (
        <Box className="captialize text-center">
          {row.original.duedate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Box>
      ),
    },
    {
      accessorKey: "status",
      header: () => <Box className="text-center text-black">Status</Box>,
      cell: ({ row }) => {
        const currentStatus = row.original.status;
        return (
          <Center>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Center className="bg-black text-white cursor-pointer hover:bg-black/80 hover:text-white rounded-full w-34 h-10 justify-between items-center">
                  <h1 className="text-[14px] px-4 capitalize">
                    {currentStatus}
                  </h1>
                  <Center className="bg-[#3e3e3f] rounded-tr-full rounded-br-full h-10 w-10">
                    <ChevronDown className="size-4" />
                  </Center>
                </Center>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="p-1">
                {(["on going", "completed", "to do"] as Data["status"][]).map(
                  (status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      className="p-2 cursor-pointer capitalize"
                      checked={currentStatus === status}
                      onClick={() =>
                        handleStatusChange(row.original.id, status)
                      }
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownMenuCheckboxItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </Center>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => <Box className="text-center text-black">Actions</Box>,
      cell: () => {
        return (
          <Center
            className="space-x-2 underline text-blue-500 cursor-pointer"
            onClick={() => modalProps.onOpenChange(true)}
          >
            View Details
          </Center>
        );
      },
    },
  ];

  return (
    <>
      <ReusableTable
        data={data}
        columns={columns}
        searchInput={false}
        enablePaymentLinksCalender={false}
        searchClassName="rounded-full"
        filterClassName="rounded-full"
        enableGlobalFilter={false}
        onRowClick={(row) => console.log("Row clicked:", row.original)}
        enableMyTaskTable={true}
      />

      <GeneralModal
        {...modalProps}
        contentProps={{ className: "w-sm max-sm:w-full" }}
      >
        <Stack className="gap-2">
          <h1 className="text-sm font-normal text-gray-500">Project</h1>
          <h2 className="text-lg font-normal">BrandSync Revamp</h2>
        </Stack>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box className="bg-white/80 gap-6 grid grid-cols-1">
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Task
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full h-12">
                        <SelectTrigger
                          size="lg"
                          className="bg-gray-100 border border-gray-200 rounded-full w-full h-12 placeholder:text-gray-100"
                        >
                          <SelectValue placeholder="Select task" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value="task1">task 1</SelectItem>
                        <SelectItem value="task2">task 2</SelectItem>
                        <SelectItem value="task3">task 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <hr className="border-gray-300 w-full" />

              <Center className="grid grid-cols-2 gap-4">
                {viewDetails.map((detail) => (
                  <Stack
                    key={detail.title}
                    className="bg-[#FFFEE8] w-full text-center p-2 rounded-lg"
                  >
                    <h1 className="text-sm font-normal text-[#929292]">
                      {detail.title}
                    </h1>
                    <h1 className="text-sm font-normal text-black">
                      {detail.description}
                    </h1>
                  </Stack>
                ))}
              </Center>

              <Flex className="justify-end ">
                <Button
                  variant="outline"
                  className="bg-[#1797b9]/30 hover:bg-[#1797b9]/80 hover:text-white text-black border border-gray-200 font-normal rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
                  // type="submit"
                  onClick={() => modalProps.onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="bg-[#1797b9] hover:bg-[#1797b9]/80 hover:text-white text-white border border-gray-200 rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
                  type="submit"
                >
                  Start Project
                </Button>
              </Flex>
            </Box>
          </form>
        </Form>
      </GeneralModal>
    </>
  );
};
