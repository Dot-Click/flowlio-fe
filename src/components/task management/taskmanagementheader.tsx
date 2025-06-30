import { ChevronDown, CirclePlus } from "lucide-react";
import { PageWrapper } from "../common/pagewrapper";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { Stack } from "../ui/stack";
import KanbanBoard, { initialTasks, Task } from "./kanbanboard";
import { Flex } from "../ui/flex";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DropdownMenu } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";

export const TaskManagementHeader = () => {
  // const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();
  // const [range, setRange] = useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: new Date(),
  // });

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [search, setSearch] = useState("");
  // Filter tasks by search query (task name or project name)
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <PageWrapper className="mt-6 p-4">
      <Stack className="gap-4 py-2">
        <Center className="justify-between">
          <Stack className="gap-1">
            <h1 className="text-black text-3xl max-sm:text-xl font-medium">
              Task Management
            </h1>
            <h1 className={`max-sm:text-sm text-[#616572]`}>
              Efficiently track, assign, and monitor tasks to ensure smooth
              workflow and productivity.
            </h1>
          </Stack>

          <Button
            variant="outline"
            className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/dashboard/task-management/create-task")}
          >
            <CirclePlus className="fill-white text-black size-5" />
            Create Task
          </Button>
        </Center>

        <Flex className="justify-between max-sm:items-start flex-col lg:flex-row items-center w-full gap-4">
          <Flex className={cn("relative md:ml-auto w-full")}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5.5 w-5.5 text-gray-300 font-light" />
            <Input
              type="search"
              placeholder="Search Project"
              // value={globalFilter}
              // onChange={(event) => setGlobalFilter(event.target.value)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-115 lg:w-80 xl:w-[400px] py-4 pl-10 bg-white h-10  placeholder:text-black  placeholder:text-[15px] border border-gray-100 rounded-md focus:outline-none active:border-gray-200 focus:ring-0 focus:ring-offset-0"
            />
          </Flex>

          <Flex className="max-md:w-full justify-between">
            {/* <CalendarComponent
              range={range}
              setRange={(range) => setRange(range as DateRange)}
            /> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  aria-haspopup="dialog"
                  className={cn(
                    "ml-auto cursor-pointer bg-white border border-gray-200 rounded-full h-10 w-32 text-black shadow-none flex p-3 gap-8"
                  )}
                >
                  <ChevronDown />
                  Users
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem>User 1</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>User 2</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>User 3</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>User 4</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>User 5</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>User 6</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>User 7</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>User 8</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Flex>
        </Flex>
      </Stack>

      <KanbanBoard
        tasks={tasks}
        setTasks={setTasks}
        // search={search}
        // setSearch={setSearch}
        filteredTasks={filteredTasks}
      />
    </PageWrapper>
  );
};
