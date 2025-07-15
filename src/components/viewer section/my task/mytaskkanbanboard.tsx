import React, { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Invoice Task",
    project: "P1 C1",
    dueDate: "16 Oct, 2024",
    status: "Pending",
  },
  {
    id: "2",
    title: "Sample Task",
    project: "P1 C1",
    dueDate: "12th Feb, 2024",
    status: "On Going",
  },
  {
    id: "3",
    title: "Mini Project Task",
    project: "P1 C1",
    dueDate: "16th Oct, 2024",
    status: "On Going",
  },
  {
    id: "4",
    title: "Sample Task",
    project: "P1 C1",
    dueDate: "16th Oct, 2024",
    status: "Delay",
  },
  {
    id: "5",
    title: "Sample Task",
    project: "P1 C1",
    dueDate: "03th Feb, 2025",
    status: "Delay",
  },
  {
    id: "6",
    title: "Sample Task",
    project: "P1 C1",
    dueDate: "10th Oct, 2024",
    status: "Changes",
  },
  {
    id: "7",
    title: "Sample Task",
    project: "P1 C1",
    dueDate: "19th Oct, 2024",
    status: "Updated",
    comments: "No Comments",
  },
  {
    id: "8",
    title: "Sample Task",
    project: "P1 C1",
    dueDate: "18th Oct, 2024",
    status: "Completed",
    comments: "No Comments",
  },
  {
    id: "9",
    title: "Sample Task",
    project: "P1 C1",
    dueDate: "22th Oct, 2024",
    status: "On Going",
    comments: "No Comments",
  },
  {
    id: "10",
    title: "Sample Task",
    project: "P1 C1",
    dueDate: "10th Oct, 2024",
    status: "Pending",
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
  | "Pending"
  | "On Going"
  | "Delay"
  | "Changes"
  | "Updated"
  | "Completed";

const STATUS_COLUMNS: StatusType[] = [
  "Pending",
  "On Going",
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
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        background: "#f6f6f6",
        borderRadius: 16,
        border: "1px solid #e0e0e0",
        borderTop: "1px solid #e0e0e0",
        borderBottom: "10px solid #c5c5d5",
        borderLeft: "1px solid #e0e0e0",
        borderRight: "1px solid #e0e0e0",
        boxShadow: "0 2px 8px #0001",
        margin: "16px 0",
        padding: 16,
        cursor: "grab",
        minWidth: 220,
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Flex className="flex-col w-full items-start">
        <Flex className="w-full justify-between items-start">
          <Box className="font-semibold">{task.title}</Box>
          <AlignJustify className="text-[#888] size-4" />
        </Flex>
        <Box className="text-[#888] text-sm">
          Project: <b>{task.project}</b>
        </Box>
      </Flex>

      {/* {task.comments && (
        <Box className="text-[#888] text-sm">{task.comments}</Box>
      )} */}
      <Flex className="text-[#FF0000] text-sm mt-2 float-right">
        {task.dueDate}
      </Flex>
    </Box>
  );
}

// Droppable Column
function DroppableColumn({
  status,
  children,
  highlight,
}: {
  status: StatusType;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <Flex
      className={cn(
        "flex-col flex-1 min-w-[260px] bg-white/80  rounded-xl border border-gray-200 p-6",
        isOver || (highlight && "border-2 border-[#00bcd4]"),
        status === "Completed" && "bg-[#eaffea]",
        "max-h-[800px] overflow-y-auto overflow-x-hidden"
      )}
      ref={setNodeRef}
    >
      <Box className="text-center text-xl font-semibold text-[#1797B9] mb-2">
        {status}
      </Box>
      {children}
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
      <Flex className="w-full items-start min-h-[500px] overflow-x-auto mt-5 py-2">
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
            {activeTask ? <DraggableTask task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </Flex>
    </Box>
  );
}
