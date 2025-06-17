import { CalendarComponent } from "../../ui/calendercomp";
import { MyOngoingtTaskCard } from "./myongoingtaskcard";
import { MyTaskHeaderProps } from "./mttaskheader";
import { Input } from "@/components/ui/input";
import { Flex } from "@/components/ui/flex";
import { Box } from "@/components/ui/box";
import { Search } from "lucide-react";
import * as React from "react";

const data: Data[] = [
  { taskname: "Ken Stack" },
  { taskname: "Fahad" },
  { taskname: "John Doe" },
  { taskname: "William" },
  { taskname: "Ben 10" },
  { taskname: "Goku" },
  { taskname: "Beru" },
  { taskname: "Fahad" },
  { taskname: "William" },
  { taskname: "Ben 10" },
  { taskname: "John Doe" },
];

export type Data = {
  taskname: string;
};

export const MyTaskIssuesTable: React.FC<MyTaskHeaderProps> = ({
  goToStep,
}) => {
  const [search, setSearch] = React.useState("");

  const filteredData = data.filter((task) =>
    task.taskname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box className="mt-4">
      <Flex className="justify-between py-4 max-md:flex-col items-start">
        <Flex className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-10 bg-white"
          />
        </Flex>
        <CalendarComponent />
      </Flex>

      <Flex className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {filteredData.length ? (
          filteredData.map((task, index) => (
            <MyOngoingtTaskCard
              goToStep={goToStep}
              key={index}
              taskName={task.taskname}
              className="w-full"
              createdAt="Mar 25, 2025"
              createdBy="Admin"
              assignees={Array.from({ length: 3 }).map(() => ({
                src: "https://github.com/shadcn.png",
                userName: task.taskname,
              }))}
            />
          ))
        ) : (
          <Box className="w-full text-center py-4 text-gray-500">
            No results found.
          </Box>
        )}
      </Flex>
    </Box>
  );
};
