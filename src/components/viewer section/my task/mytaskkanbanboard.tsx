import React, { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { cn } from "@/lib/utils";
import { useFetchViewerTasks, ViewerTask } from "@/hooks/useFetchViewerTasks";
import { useUpdateTaskStatus } from "@/hooks/useupdatetask";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

// Status keys for consistency
type StatusType =
  | "todo"
  | "in_progress"
  | "delay"
  | "changes"
  | "updated"
  | "completed";

// Task type for display
export type Task = {
  id: string;
  title: string;
  project: string;
  comments?: string;
  endDate: string;
  status: StatusType;
  creatorName?: string;
  creatorEmail?: string;
};

const STATUS_COLORS: Record<StatusType, string> = {
  todo: "#5B60FE",
  in_progress: "#FFA632",
  delay: "#FF0080",
  changes: "#4DCDC9",
  updated: "#A94DCD",
  completed: "#CD4D4F",
};

const STATUS_COLUMNS: StatusType[] = [
  "todo",
  "in_progress",
  "delay",
  "changes",
  "updated",
  "completed",
];

// Draggable Task Card
function DraggableTask({ task }: { task: Task }) {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  return (
    <Box
      className={cn(
        "bg-card rounded-lg border border-border p-4 cursor-grab min-w-[240px] mb-3 mx-2 transition-all duration-200 shadow-sm",
        "hover:shadow-md hover:border-border active:cursor-grabbing",
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
      <Flex className="flex-col w-full items-start gap-3">
        {/* Task Title */}
        <Box className="font-semibold text-gray-800 text-sm leading-tight w-full">
          {task.title}
        </Box>

        {/* Project and Due Date */}
        <Flex className="flex-col items-start gap-2 w-full">
          <Flex className="text-muted-foreground items-center gap-2">
            <Box className="w-2 h-2 bg-blue-500 rounded-full"></Box>
            <span className="text-xs font-medium text-foreground">
              {task.project}
            </span>
          </Flex>

          {task.endDate && (
            <Flex className="text-muted-foreground items-center gap-2">
              <Box className="w-2 h-2 bg-red-500 rounded-full"></Box>
              <span className="text-xs text-red-600 font-medium">
                {t("tasks.dueDate")}: {task.endDate}
              </span>
            </Flex>
          )}

          {task.creatorName && (
            <Flex className="text-muted-foreground items-center gap-2">
              <Box className="w-2 h-2 bg-green-500 rounded-full"></Box>
              <span className="text-xs font-medium text-foreground">
                {t("support.sentBy")}: {task.creatorName}
              </span>
            </Flex>
          )}

          {task.comments && (
            <Flex className="text-muted-foreground items-center gap-2">
              <Box className="w-2 h-2 bg-gray-400 rounded-full"></Box>
              <span className="text-xs italic">{task.comments}</span>
            </Flex>
          )}
        </Flex>
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
  const { t } = useTranslation();
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <Flex
      className={cn(
        "flex-col flex-1 min-w-[280px] bg-card rounded-xl border-1 border-border",
        "overflow-hidden max-h-[700px] transition-all duration-200",
        isOver && "border-dashed border-blue-400 bg-blue-50/30",
        highlight && "border-green-300 bg-green-50"
      )}
      ref={setNodeRef}
    >
      <Box
        className="text-base font-semibold text-white w-full px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: STATUS_COLORS[status] }}
      >
        <span>{t(`tasks.statusValue.${status}`)}</span>
        <span className="text-xs opacity-80">
          {React.Children.count(children)}
        </span>
      </Box>
      <Box className="flex-1 overflow-y-auto p-2">{children}</Box>
    </Flex>
  );
}

interface KanbanBoardProps {
  filteredTasks?: Task[];
}

export default function KanbanBoard({ filteredTasks }: KanbanBoardProps) {
  const { t } = useTranslation();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { data: tasksResponse, isLoading, error } = useFetchViewerTasks();
  const updateTaskStatus = useUpdateTaskStatus();

  // Convert backend tasks to display format
  const convertTasksToDisplay = (viewerTasks: ViewerTask[]): Task[] => {
    return viewerTasks.map((task) => ({
      id: task.id,
      title: task.title,
      project: task.projectName,
      endDate: task.endDate
        ? format(new Date(task.endDate), "MMM dd, yyyy")
        : "",
      status: task.status as StatusType,
      comments: task.description,
      creatorName: task.creatorName,
      creatorEmail: task.creatorEmail,
    }));
  };

  const tasks = tasksResponse?.data
    ? convertTasksToDisplay(tasksResponse.data)
    : [];
  const displayTasks = filteredTasks || tasks;

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) {
      return;
    }
    if (active.id === over.id) {
      console.log("❌ Dropped on same element");
      return;
    }

    // If dropped on a column, update status
    const overStatus = STATUS_COLUMNS.find((col) => col === over.id);

    if (overStatus) {
      updateTaskStatus.mutate({
        taskId: active.id as string,
        status: overStatus as any,
      });
    } else {
      console.log("❌ No valid status column found");
    }
  };

  if (isLoading) {
    return (
      <Box className="w-full">
        <Flex className="w-full items-start gap-4 min-h-[600px] overflow-x-auto mt-5 p-4 bg-gray-100/50 rounded-lg">
          {STATUS_COLUMNS.map((status) => (
            <Flex
              key={status}
              className="flex-col flex-1 min-w-[280px] bg-card rounded-xl border border-border overflow-hidden max-h-[700px]"
            >
              <Box
                className="text-base font-semibold text-white w-full px-4 py-3 flex items-center justify-between"
                style={{ backgroundColor: STATUS_COLORS[status] }}
              >
                <span>{t(`tasks.statusValue.${status}`)}</span>
                <span className="text-xs opacity-80">0</span>
              </Box>
              <Box className="flex-1 overflow-y-auto p-2">
                <Box className="animate-pulse space-y-3">
                  <Box className="bg-muted h-20 rounded-lg"></Box>
                  <Box className="bg-muted h-20 rounded-lg"></Box>
                </Box>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="w-full text-center py-8">
        <p className="text-red-600">{t("tasks.loadingError")} {error.message}</p>
      </Box>
    );
  }

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
              highlight={status === "completed"}
            >
              {displayTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <DraggableTask key={task.id} task={task} />
                ))}
            </DroppableColumn>
          ))}
          <DragOverlay>
            {activeTask ? (
              <Box className="bg-card rounded-lg border-2 border-blue-400 p-4 min-w-[240px] shadow-xl">
                <Flex className="flex-col w-full items-start gap-2">
                  <Box className="font-semibold text-gray-800 text-sm leading-tight">
                    {activeTask.title}
                  </Box>
                  <Box className="text-muted-foreground text-xs">
                    {t("tasks.project")}:{" "}
                    <span className="font-medium">{activeTask.project}</span>
                  </Box>
                  {activeTask.creatorName && (
                    <Box className="text-muted-foreground text-xs">
                      {t("support.sentBy")}:{" "}
                      <span className="font-medium">
                        {activeTask.creatorName}
                      </span>
                    </Box>
                  )}
                  {activeTask.comments && (
                    <Box className="text-muted-foreground text-xs italic">
                      {activeTask.comments}
                    </Box>
                  )}
                </Flex>
                <Flex className="justify-end mt-3">
                  <Box className="text-red-500 text-xs font-medium bg-red-50 px-2 py-1 rounded">
                    {activeTask.endDate}
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
