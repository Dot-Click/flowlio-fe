import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import {
  ArrowUp,
  Eye,
  MessageCircleReply,
  PencilLine,
  Trash2,
} from "lucide-react";
import { ReusableTable } from "../reusable/reusabletable";
import { format, isWithinInterval } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "../common/generalmodal";
import { useState } from "react";
import { Input } from "../ui/input";
import { Stack } from "../ui/stack";

const data: Data[] = [
  {
    id: "1",
    progress: 3,
    status: "completed",
    projectname: "Foundation Plan",
    submittedby: "ken99",
    startDate: new Date("2025-02-21T00:00:00"),
    endDate: new Date("2025-03-01T00:00:00"),
    clientname: "Task 1",
  },
  {
    id: "2",
    progress: 30,
    projectname: "Foundation Plan",
    status: "pending",
    submittedby: "Abe45",
    startDate: new Date("2025-04-09T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 2",
  },
  {
    id: "3",
    progress: 10,
    projectname: "ClientBridge CRM Upgrade",
    status: "completed",
    submittedby: "Monserrat44",
    startDate: new Date("2025-01-14T00:00:00"),
    endDate: new Date("2025-02-01T00:00:00"),
    clientname: "Task 3",
  },
  {
    id: "4",
    progress: 3,
    projectname: "ClientBridge CRM Upgrade",
    status: "pending",
    submittedby: "Silas22",
    startDate: new Date("2025-02-12T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 4",
  },
  {
    id: "5",
    progress: 3,
    projectname: "ClientBridge CRM Upgrade",
    status: "completed",
    submittedby: "carmella",
    startDate: new Date("2025-03-10T00:00:00"),
    endDate: new Date("2025-04-01T00:00:00"),
    clientname: "Task 5",
  },
  {
    id: "6",
    progress: 12,
    projectname: "Foundation Plan",
    status: "ongoing",
    submittedby: "carmella",
    startDate: new Date("2025-04-04T00:00:00"),
    endDate: new Date("2025-05-11T00:00:00"),
    clientname: "Task 6",
  },
  {
    id: "7",
    progress: 3,
    projectname: "Foundation Plan",
    status: "completed",
    submittedby: "carmella",
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 7",
  },
  {
    id: "8",
    progress: 24,
    projectname: "Foundation Plan",
    status: "pending",
    submittedby: "carmella",
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 8",
  },
  {
    id: "9",
    progress: 13,
    projectname: "Foundation Plan",
    status: "ongoing",
    submittedby: "carmella",
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    clientname: "Task 9",
  },
];

export type Data = {
  id: string;
  progress: number;
  status: "pending" | "completed" | "ongoing";
  submittedby: string;
  clientname: string;
  projectname: string;
  startDate: Date;
  endDate: Date;
};

export const columns: ColumnDef<Data>[] = [
  {
    id: "select",
    header: () => <Box className="text-center text-black">#</Box>,
    cell: ({ row }) => <Box className="text-center">{row.index + 1}</Box>,
    enableSorting: false,
    // enableHiding: false,
  },

  {
    accessorKey: "projectname",
    header: () => <Box className="text-black p-1">Project Name</Box>,
    cell: ({ row }) => (
      <Box className="capitalize p-1 w-30 max-sm:w-full">
        {row.original.projectname.length > 28
          ? row.original.projectname.slice(0, 28) + "..."
          : row.original.projectname}
      </Box>
    ),
  },
  {
    accessorKey: "clientname",
    header: () => <Box className="text-black text-center">Client</Box>,
    cell: ({ row }) => (
      <Box className="captialize text-center">{row.original.clientname}</Box>
    ),
  },

  {
    accessorKey: "startDate",
    header: () => <Box className="text-center text-black">Start Date</Box>,
    cell: ({ row }) => {
      const startDate = row.original.startDate;
      try {
        return (
          <Box className="text-center">{format(startDate, "MMM d, yyyy")}</Box>
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
    accessorKey: "progress",
    header: () => <Box className="text-center text-black">Progress</Box>,
    cell: ({ row }) => {
      return (
        <Center className="text-center">
          {row.original.progress + "%"}{" "}
          <ArrowUp className="size-4 text-green-600 font-semibold" />
        </Center>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <Box className="text-center text-black">Status</Box>,
    cell: ({ row }) => {
      const status = row.original.status as "pending" | "completed" | "ongoing";

      const statusStyles: Record<typeof status, { text: string; dot: string }> =
        {
          completed: {
            text: "text-white bg-[#00A400] border-none rounded-full",
            dot: "bg-white",
          },
          pending: {
            text: "text-white bg-[#F98618] border-none rounded-full",
            dot: "bg-white",
          },
          ongoing: {
            text: "text-white bg-[#005FA4] border-none rounded-full",
            dot: "bg-white",
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-black border-none w-10 h-9 hover:bg-black cursor-pointer rounded-md "
                >
                  <Eye className="fill-white size-7 " />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>View Project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#23B95D] hover:bg-[#23B95D]/80 rounded-md border-none cursor-pointer"
                >
                  <PencilLine className="fill-white text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Edit Task</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#40aeed] hover:bg-[#40aeed]/80 rounded-md border-none cursor-pointer"
                >
                  <MessageCircleReply className="text-white size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Add Comment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Center>
      );
    },
  },
];

export const ProjectTable = () => {
  const [comments, setComments] = useState<
    Record<string, { id: string; text: string; timestamp: Date }[]>
  >({});
  const props = useGeneralModalDisclosure();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [input, setInput] = useState("");

  // Add comment handler
  const handleAddComment = () => {
    if (!activeProjectId || !input.trim()) return;
    setComments((prev) => {
      const newComment = {
        id: Math.random().toString(36).slice(2),
        text: input.trim(),
        timestamp: new Date(),
      };
      return {
        ...prev,
        [activeProjectId]: [...(prev[activeProjectId] || []), newComment],
      };
    });
    setInput("");
  };

  // Delete comment handler
  const handleDeleteComment = (commentId: string) => {
    if (!activeProjectId) return;
    setComments((prev) => ({
      ...prev,
      [activeProjectId]: (prev[activeProjectId] || []).filter(
        (c) => c.id !== commentId
      ),
    }));
  };

  // Open comment modal for a project
  const openCommentModal = (projectId: string) => {
    setActiveProjectId(projectId);
    props.onOpenChange(true);
    setInput("");
  };

  const patchedColumns = columns.map((col) => {
    if ((col as any).accessorKey === "actions") {
      return {
        ...col,
        cell: ({ row }: any) => (
          <Center className="space-x-2 ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-black border-none w-10 h-9 hover:bg-black cursor-pointer rounded-md "
                  >
                    <Eye className="fill-white size-7 " />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>View Project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#23B95D] hover:bg-[#23B95D]/80 rounded-md border-none cursor-pointer"
                  >
                    <PencilLine className="fill-white text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Edit Project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#40aeed] hover:bg-[#40aeed]/80 rounded-md border-none cursor-pointer"
                    onClick={() => openCommentModal(row.original.id)}
                  >
                    <MessageCircleReply className="text-white size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Add Comment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Center>
        ),
      };
    }
    return col;
  });

  return (
    <>
      <ReusableTable
        data={data}
        columns={patchedColumns}
        searchInput={false}
        enablePaymentLinksCalender={true}
        onRowClick={(row) => {
          console.log("Row clicked:", row.original);
        }}
      />

      <GeneralModal {...props}>
        <Box>
          <Box className="mb-4 text-lg font-semibold">Project Comments</Box>
          <Box className="flex flex-col gap-2 max-h-64 overflow-y-auto mb-4 bg-gray-50 p-2 rounded">
            {activeProjectId &&
              (comments[activeProjectId]?.length !== 1 ? (
                <Box className="text-gray-400 text-center">
                  No comments yet.
                </Box>
              ) : (
                comments[activeProjectId]?.map((comment) => (
                  <Box
                    key={comment.id}
                    className="flex items-start gap-2 group"
                  >
                    <Flex className="flex-1 items-start justify-between bg-white p-2 rounded shadow text-sm">
                      <Stack>
                        <Box className="w-82 overflow-hidden break-words whitespace-pre-line">
                          {comment.text}
                        </Box>
                        <Box className="text-xs text-gray-400 mt-1">
                          {format(comment.timestamp, "MMM d, yyyy hh:mm a")}
                        </Box>
                      </Stack>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteComment(comment.id)}
                        title="Delete"
                      >
                        <Trash2 />
                      </Button>
                    </Flex>
                  </Box>
                ))
              ))}
          </Box>
          <Flex className="items-center justify-between">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a comment..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddComment();
              }}
              className="bg-white rounded-full placeholder:text-gray-400 h-11 border border-gray-400"
            />

            <Button
              onClick={handleAddComment}
              disabled={!input.trim()}
              className="rounded-full h-11 cursor-pointer"
            >
              Send
            </Button>
          </Flex>
        </Box>
      </GeneralModal>
    </>
  );
};
