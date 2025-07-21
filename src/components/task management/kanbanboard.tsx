import React, { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { cn } from "@/lib/utils";

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Invoice Task",
    project: "Marketing Plan",
    dueDate: "16 Oct, 2024",
    status: "To Do",
  },
  {
    id: "2",
    title: "Sample Task",
    project: "Marketing Plan",
    dueDate: "12th Feb, 2024",
    status: "In Progress",
  },
  {
    id: "3",
    title: "Mini Project Task",
    project: "Marketing Plan",
    dueDate: "16th Oct, 2024",
    status: "In Progress",
  },
  {
    id: "4",
    title: "Sample Task",
    project: "Marketing Plan",
    dueDate: "16th Oct, 2024",
    status: "Delay",
  },
  {
    id: "5",
    title: "Sample Task",
    project: "Marketing Plan",
    dueDate: "03th Feb, 2025",
    status: "In Progress",
  },
  {
    id: "6",
    title: "Sample Task",
    project: "Marketing Plan",
    dueDate: "10th Oct, 2024",
    status: "Delay",
  },
  {
    id: "7",
    title: "Sample Task",
    project: "Marketing Plan",
    dueDate: "19th Oct, 2024",
    status: "Updated",
    comments: "No Comments",
  },
  {
    id: "8",
    title: "Sample Task",
    project: "Marketing Plan",
    dueDate: "18th Oct, 2024",
    status: "Changes",
    comments: "No Comments",
  },
  {
    id: "9",
    title: "Sample Task",
    project: "Marketing Plan",
    dueDate: "22th Oct, 2024",
    status: "Completed",
    comments: "No Comments",
  },
  {
    id: "10",
    title: "Sample Task",
    project: "Marketing Plan",
    dueDate: "10th Oct, 2024",
    status: "To Do",
    comments: "No Comments",
  },
];

// Task type
export type Task = {
  id: string;
  title: string;
  project: string;
  comments?: string;
  dueDate: string;
  status: StatusType;
};

type StatusType =
  | "To Do"
  | "In Progress"
  | "Delay"
  | "Changes"
  | "Updated"
  | "Completed";

const STATUS_COLORS: Record<StatusType, string> = {
  "To Do": "#5B60FE",
  "In Progress": "#FFA632",
  Delay: "#FF0080",
  Changes: "#4DCDC9",
  Updated: "#A94DCD",
  Completed: "#CD4D4F",
};

const STATUS_COLUMNS: StatusType[] = [
  "To Do",
  "In Progress",
  "Delay",
  "Changes",
  "Updated",
  "Completed",
];

// Draggable Task Card
function DraggableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  return (
    <Box
      className={cn(
        "bg-[#F6F6F6] rounded-lg border border-gray-200 p-4 cursor-grab min-w-[240px] mb-3 mx-2 transition-all duration-200",
        "hover:shadow-md hover:border-gray-300 active:cursor-grabbing",
        isDragging && "opacity-50 shadow-lg scale-105"
      )}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Flex className="flex-col w-full items-start gap-2">
        <Box className="font-semibold text-gray-800 text-md leading-tight">
          {task.title}
        </Box>

        <Flex className="mt-4 flex-col items-start gap-1">
          <Flex className="text-gray-600">
            <Flex className="gap-1 text-sm font-normal">
              <img
                src="/dashboard/analytics.svg"
                className="size-4"
                alt="calendericon"
              />
              Project:
            </Flex>

            <span className="font-nromal text-black text-sm ml-4">
              {task.project}
            </span>
          </Flex>

          <Flex className="mt-1 text-gray-600">
            <Flex className="gap-1 text-sm">
              <img
                src="/dashboard/calendericonfordraging.svg"
                className="size-4"
                alt="calendericon"
              />
              Deadline:
            </Flex>
            <Box className="text-red-500 text-xs font-medium rounded ml-2">
              {task.dueDate}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

// Droppable Column
function DroppableColumn({
  status,
  children,
}: // highlight,
{
  status: StatusType;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <Flex
      className={cn(
        "flex-col flex-1 min-w-[280px] bg-white rounded-xl border-1 border-gray-200",
        "overflow-hidden max-h-[700px] transition-all duration-200",
        isOver && "border-dashed border-blue-400 bg-blue-50/30"
        // highlight && "border-green-300 bg-green-50"
      )}
      ref={setNodeRef}
    >
      <Box
        className="text-base font-semibold text-white w-full px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: STATUS_COLORS[status] }}
      >
        <span>{status}</span>
        <span className="text-xs opacity-80">
          {React.Children.count(children)}
        </span>
      </Box>
      <Box className="flex-1 overflow-y-auto p-2">{children}</Box>
    </Flex>
  );
}

interface KanbanBoardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  filteredTasks: Task[];
}

export default function KanbanBoard({
  tasks,
  setTasks,
  filteredTasks,
}: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;
    if (active.id === over.id) return;

    // If dropped on a column, update status
    const overStatus = STATUS_COLUMNS.find((col) => col === over.id);

    if (overStatus) {
      setTasks(
        tasks.map((task: Task) =>
          task.id === active.id ? { ...task, status: overStatus } : task
        )
      );
    }
  };

  return (
    <Box className="w-full">
      <Flex className="w-full items-start gap-4 min-h-[600px] overflow-x-auto mt-5 p-0 bg-gray-100/50 rounded-lg">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={(event) => {
            const task = tasks.find((t) => t.id === event.active.id);
            setActiveTask(task || null);
          }}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveTask(null)}
        >
          {STATUS_COLUMNS.map((status) => (
            <DroppableColumn
              key={status}
              status={status}
              highlight={status === "Completed"}
            >
              {filteredTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <DraggableTask key={task.id} task={task} />
                ))}
            </DroppableColumn>
          ))}
          <DragOverlay>
            {activeTask ? (
              <Box className="bg-white rounded-lg border-2 border-blue-400 p-4 min-w-[240px] shadow-xl">
                <Flex className="flex-col w-full items-start gap-2">
                  <Box className="font-semibold text-gray-800 text-sm leading-tight">
                    {activeTask.title}
                  </Box>
                  <Box className="text-gray-600 text-xs">
                    Project:{" "}
                    <span className="font-medium">{activeTask.project}</span>
                  </Box>
                  {activeTask.comments && (
                    <Box className="text-gray-500 text-xs italic">
                      {activeTask.comments}
                    </Box>
                  )}
                </Flex>
                <Flex className="justify-end mt-3">
                  <Box className="text-red-500 text-xs font-medium bg-red-50 px-2 py-1 rounded">
                    {activeTask.dueDate}
                  </Box>
                </Flex>
              </Box>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Flex>
    </Box>
  );
}
