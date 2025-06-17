import { TaskManagementHeader } from "@/components/task management/taskmanagementheader";
import { TaskManagementTable } from "@/components/task management/taskmanagementtable";

export const TaskManagementPage = () => {
  return (
    <TaskManagementHeader>
      <TaskManagementTable />
    </TaskManagementHeader>
  );
};
