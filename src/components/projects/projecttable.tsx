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
import { useNavigate } from "react-router";
import { FaRegTrashAlt } from "react-icons/fa";

// Updated data structure to match your database schema
const data: Data[] = [
  {
    id: "1",
    projectNumber: "PRJ-001",
    projectName: "Foundation Plan",
    clientName: "Client A",
    description: "Building foundation planning project",
    startDate: new Date("2025-02-21T00:00:00"),
    endDate: new Date("2025-03-01T00:00:00"),
    assignedProject: "User 1",
    address: "123 Main St, City",
    status: "completed",
    progress: 3,
    createdBy: "ken99",
    organizationId: "org1",
    createdAt: new Date("2025-01-15T00:00:00"),
    updatedAt: new Date("2025-01-15T00:00:00"),
  },
  {
    id: "2",
    projectNumber: "PRJ-002",
    projectName: "Foundation Plan",
    clientName: "Client B",
    description: "Foundation planning for commercial building",
    startDate: new Date("2025-04-09T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    assignedProject: "User 2",
    address: "456 Business Ave, City",
    status: "pending",
    progress: 30,
    createdBy: "Abe45",
    organizationId: "org1",
    createdAt: new Date("2025-01-20T00:00:00"),
    updatedAt: new Date("2025-01-20T00:00:00"),
  },
  {
    id: "3",
    projectNumber: "PRJ-003",
    projectName: "ClientBridge CRM Upgrade",
    clientName: "Client C",
    description: "CRM system upgrade and optimization",
    startDate: new Date("2025-01-14T00:00:00"),
    endDate: new Date("2025-02-01T00:00:00"),
    assignedProject: "User 3",
    address: "789 Tech Blvd, City",
    status: "completed",
    progress: 10,
    createdBy: "Monserrat44",
    organizationId: "org1",
    createdAt: new Date("2025-01-10T00:00:00"),
    updatedAt: new Date("2025-01-10T00:00:00"),
  },
  {
    id: "4",
    projectNumber: "PRJ-004",
    projectName: "ClientBridge CRM Upgrade",
    clientName: "Client D",
    description: "Phase 2 of CRM upgrade",
    startDate: new Date("2025-02-12T00:00:00"),
    endDate: new Date("2025-06-01T00:00:00"),
    assignedProject: "User 4",
    address: "321 Innovation Dr, City",
    status: "pending",
    progress: 3,
    createdBy: "Silas22",
    organizationId: "org1",
    createdAt: new Date("2025-01-25T00:00:00"),
    updatedAt: new Date("2025-01-25T00:00:00"),
  },
  {
    id: "5",
    projectNumber: "PRJ-005",
    projectName: "ClientBridge CRM Upgrade",
    clientName: "Client E",
    description: "Final phase of CRM upgrade",
    startDate: new Date("2025-03-10T00:00:00"),
    endDate: new Date("2025-04-01T00:00:00"),
    assignedProject: "User 5",
    address: "654 Digital Way, City",
    status: "completed",
    progress: 3,
    createdBy: "carmella",
    organizationId: "org1",
    createdAt: new Date("2025-01-30T00:00:00"),
    updatedAt: new Date("2025-01-30T00:00:00"),
  },
];

// Updated type to match your database schema
export type Data = {
  id: string;
  projectNumber: string;
  projectName: string;
  clientName: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  assignedProject: string;
  address: string;
  status: "pending" | "completed" | "ongoing";
  progress: number;
  createdBy: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
};

// Comment interface to match your database schema
interface ProjectComment {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  content: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ProjectTable = () => {
  // Updated comment state to match database schema
  const [comments, setComments] = useState<Record<string, ProjectComment[]>>(
    {}
  );
  const props = useGeneralModalDisclosure();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Add comment handler - now supports nested comments
  const handleAddComment = (parentId?: string) => {
    if (!activeProjectId || !input.trim()) return;

    const newComment: ProjectComment = {
      id: Math.random().toString(36).slice(2),
      projectId: activeProjectId,
      userId: "current-user-id", // This should come from your auth context
      userName: "Current User", // This should come from your auth context
      content: input.trim(),
      parentId: parentId || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setComments((prev) => ({
      ...prev,
      [activeProjectId]: [...(prev[activeProjectId] || []), newComment],
    }));
    setInput("");
    setReplyTo(null);
    setReplyContent("");
  };

  // Add reply handler
  const handleAddReply = () => {
    if (!activeProjectId || !replyTo || !replyContent.trim()) return;
    handleAddComment(replyTo);
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
    setReplyTo(null);
    setReplyContent("");
  };

  const navigate = useNavigate();

  // Get comments for the active project
  const activeComments = activeProjectId ? comments[activeProjectId] || [] : [];
  const topLevelComments = activeComments.filter(
    (comment) => !comment.parentId
  );
  const replies = activeComments.filter((comment) => comment.parentId);

  // Attach replies to their parent comments
  const commentsWithReplies = topLevelComments.map((comment) => ({
    ...comment,
    replies: replies.filter((reply) => reply.parentId === comment.id),
  }));

  const columns: ColumnDef<Data>[] = [
    {
      id: "select",
      header: () => <Box className="text-center text-black">#</Box>,
      cell: ({ row }) => <Box className="text-center">{row.index + 1}</Box>,
      enableSorting: false,
    },

    {
      accessorKey: "projectName",
      header: () => <Box className="text-black p-1">Project Name</Box>,
      cell: ({ row }) => (
        <Box className="capitalize p-1 w-30 max-sm:w-full">
          {row.original.projectName.length > 28
            ? row.original.projectName.slice(0, 28) + "..."
            : row.original.projectName}
        </Box>
      ),
    },
    {
      accessorKey: "clientName",
      header: () => <Box className="text-black text-center">Client</Box>,
      cell: ({ row }) => (
        <Box className="captialize text-center">{row.original.clientName}</Box>
      ),
    },

    {
      accessorKey: "startDate",
      header: () => <Box className="text-center text-black">Start Date</Box>,
      cell: ({ row }) => {
        const startDate = row.original.startDate;
        try {
          return (
            <Box className="text-center">
              {format(startDate, "MMM d, yyyy")}
            </Box>
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
        const status = row.original.status as
          | "pending"
          | "completed"
          | "ongoing";

        const statusStyles: Record<
          typeof status,
          { text: string; dot: string }
        > = {
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
      cell: ({ row }) => {
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
                    onClick={() => {
                      navigate(
                        `/dashboard/project/create-project/${row.original.id}`
                      );
                    }}
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#A50403] border-none w-9 h-9 hover:bg-[#A50403]/80 cursor-pointer rounded-md "
                    // onClick={() =>
                    //   handleDeleteClient(row.original.id, row.original.name)
                    // }
                    // disabled={isDeleting}
                  >
                    <FaRegTrashAlt className="text-white fill-white size-4 " />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Delete Client</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
        enablePaymentLinksCalender={true}
        onRowClick={(row) => {
          console.log("Row clicked:", row.original);
        }}
      />

      <GeneralModal
        {...props}
        contentProps={{ className: "overflow-hidden max-sm:p-3" }}
      >
        <Box>
          <Box className="mb-4 text-lg font-semibold">Project Comments</Box>

          {/* Comments list with nested replies */}
          <Box className="flex flex-col gap-3 max-h-64 overflow-y-auto mb-4 bg-gray-50 p-3 rounded">
            {activeProjectId && commentsWithReplies.length === 0 ? (
              <Box className="text-gray-400 text-center py-4">
                No comments yet.
              </Box>
            ) : (
              commentsWithReplies.map((comment) => (
                <Box key={comment.id} className="space-y-2">
                  {/* Main comment */}
                  <Box className="flex items-start gap-2 group">
                    <Flex className="flex-1 items-start justify-between bg-white p-3 rounded shadow-sm text-sm">
                      <Stack className="flex-1">
                        <Box className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-xs text-gray-900">
                            {comment.userName}
                          </span>
                          <span className="text-xs text-gray-400">
                            {format(
                              new Date(comment.createdAt),
                              "MMM d, yyyy hh:mm a"
                            )}
                          </span>
                        </Box>
                        <Box className="w-full max-sm:w-48 overflow-hidden break-words whitespace-pre-line">
                          {comment.content}
                        </Box>
                        <Box className="flex items-center gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 p-1 h-auto text-xs"
                            onClick={() => setReplyTo(comment.id)}
                          >
                            Reply
                          </Button>
                          {comment.userId === "current-user-id" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 cursor-pointer p-1 h-auto text-xs"
                              onClick={() => handleDeleteComment(comment.id)}
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </Box>
                      </Stack>
                    </Flex>
                  </Box>

                  {/* Reply input for this comment */}
                  {replyTo === comment.id && (
                    <Box className="ml-6 bg-white p-2 rounded border">
                      <Input
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="mb-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddReply();
                        }}
                      />
                      <Box className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={handleAddReply}
                          disabled={!replyContent.trim()}
                          className="bg-blue-600 hover:bg-blue-700 text-xs"
                        >
                          Reply
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReplyTo(null);
                            setReplyContent("");
                          }}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {/* Render replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <Box className="ml-6 space-y-2">
                      {comment.replies.map((reply) => (
                        <Box key={reply.id} className="flex items-start gap-2">
                          <Flex className="flex-1 items-start justify-between bg-white p-2 rounded shadow-sm text-sm border-l-2 border-blue-200">
                            <Stack className="flex-1">
                              <Box className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-xs text-gray-900">
                                  {reply.userName}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {format(
                                    new Date(reply.createdAt),
                                    "MMM d, yyyy hh:mm a"
                                  )}
                                </span>
                              </Box>
                              <Box className="w-full max-sm:w-40 overflow-hidden break-words whitespace-pre-line">
                                {reply.content}
                              </Box>
                              {reply.userId === "current-user-id" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-500 cursor-pointer p-1 h-auto text-xs mt-1"
                                  onClick={() => handleDeleteComment(reply.id)}
                                  title="Delete"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              )}
                            </Stack>
                          </Flex>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ))
            )}
          </Box>

          {/* Add new comment */}
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
              onClick={() => handleAddComment()}
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
