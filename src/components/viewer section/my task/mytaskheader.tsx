import { ChevronDown, Grip, List } from "lucide-react";
import { PageWrapper } from "@/components/common/pagewrapper";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Stack } from "@/components/ui/stack";
import KanbanBoard, { initialTasks, Task } from "./mytaskkanbanboard";
import { Flex } from "@/components/ui/flex";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { MyTaskTable } from "./mytasktable";

export const MyTaskHeader = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [search, setSearch] = useState("");
  // Filter tasks by search query (task name or project name)
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project.toLowerCase().includes(search.toLowerCase())
  );

  const [view, setView] = useState<"kanban" | "table">("kanban");
  return (
    <PageWrapper className="mt-6 p-4">
      <Stack className="gap-4 py-2">
        <Center className="justify-between max-sm:flex-col max-sm:items-start gap-2">
          <Stack className="gap-1">
            <h1 className="text-black text-2xl max-sm:text-xl font-medium">
              My Tasks
            </h1>
            <h1 className={`max-sm:text-sm text-[#616572]`}>
              Track and manage your assigned tasks with real-time progress and
              time logging.
            </h1>
          </Stack>
        </Center>

        <Flex className="justify-between max-sm:items-start flex-col lg:flex-row items-center w-full gap-4">
          <Flex className={cn("relative md:ml-auto w-full")}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5.5 w-5.5 text-gray-300 font-light" />
            <Input
              type="search"
              placeholder="Search My Tasks"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-115 lg:w-80 xl:w-[400px] py-4 pl-10 bg-white h-10  placeholder:text-gray-700  placeholder:text-[15px] border border-gray-100 rounded-md focus:outline-none active:border-gray-200 focus:ring-0 focus:ring-offset-0 rounded-full"
            />
          </Flex>

          <Flex className="max-md:w-full justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  aria-haspopup="dialog"
                  className={cn(
                    "ml-auto cursor-pointer bg-white border border-gray-200 rounded-full h-10 w-32 text-black shadow-none flex p-3 gap-8"
                  )}
                >
                  Projects
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem>Project 1</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Project 2</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Project 3</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Project 4</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Project 5</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Project 6</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Project 7</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Project 8</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="bg-white text-white border border-gray-200 rounded-lg px-4 py-5  gap-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setView("table")}
            >
              <List className="text-black size-5" />
            </Button>
            <Button
              className="bg-white text-white border border-gray-200 rounded-lg px-4 py-5  gap-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setView("kanban")}
            >
              <Grip className="text-black size-4.5" />
            </Button>
          </Flex>
        </Flex>
      </Stack>

      {view === "kanban" ? (
        <KanbanBoard
          tasks={tasks}
          setTasks={setTasks}
          filteredTasks={filteredTasks}
        />
      ) : (
        <MyTaskTable />
      )}
    </PageWrapper>
  );
};
