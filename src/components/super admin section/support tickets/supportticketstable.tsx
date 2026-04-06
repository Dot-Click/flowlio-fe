import { ColumnDef } from "@tanstack/react-table";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Eye } from "lucide-react";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import CheckSvg from "/super admin/check.svg";
// import { useFetchSupportTickets } from "@/hooks/usefetchsupporttickets";
// import { useDeleteSupportTicket } from "@/hooks/usedeletesupportticket";
import { toast } from "sonner";
import { useState } from "react";
import { SupportTicketModal } from "./supportticketmodal";
import type { UniversalSupportTicket } from "@/hooks/useUniversalSupportTickets";
import { useUpdateUniversalSupportTicket } from "@/hooks/useUniversalSupportTickets";
import { useTranslation } from "react-i18next";
import { TableSkeleton, ErrorState } from "@/components/skeletons";

export type Data = UniversalSupportTicket;

export const SupportTicketTable = ({
  data,
  isLoading,
  isFetching,
  error,
  refetch,
  pagination,
  onPageChange,
  deleteSupportTicket,
}: {
  data: UniversalSupportTicket[];
  isLoading: boolean;
  isFetching?: boolean;
  error: any;
  refetch: () => void;
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  };
  onPageChange?: (page: number) => void;
  deleteSupportTicket: (id: string) => void;
}) => {
  const { t } = useTranslation();
  const [selectedTicket, setSelectedTicket] = useState<Data | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: updateSupportTicket } = useUpdateUniversalSupportTicket();

  const loading = isLoading || isFetching;

  const handleDelete = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this support ticket?")
    ) {
      deleteSupportTicket(id);
      refetch();
    }
  };

  const handleViewTicket = (ticket: Data) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseTicket = (id: string) => {
    if (window.confirm("Are you sure you want to close this support ticket?")) {
      updateSupportTicket(
        { id, data: { status: "closed" } },
        {
          onSuccess: () => {
            toast.success("Support Ticket closed successfully");
            refetch();
          },
          onError: (error: any) => {
            toast.error(
              error.response?.data?.message || "Failed to close support ticket",
            );
          },
        },
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    refetch();
  };

  const columns: ColumnDef<Data>[] = [
    {
      id: "select",
      header: () => <Box className="text-center text-foreground p-3">{t("superadmin.support.table.ticketId", "Ticket ID")}</Box>,
      cell: ({ row }) => (
        <Box className="text-center p-3">#{row.original.ticketNumber}</Box>
      ),
      enableSorting: false,
      // enableHiding: false,
    },

    {
      accessorKey: "subject",
      header: () => <Box className="text-foreground ">{t("superadmin.support.table.subject", "Subject")}</Box>,
      cell: ({ row }) => (
        <Box className="capitalize w-30 max-sm:w-full">
          {row.original.subject.length > 28
            ? row.original.subject.slice(0, 28) + "..."
            : row.original.subject}
        </Box>
      ),
    },

    {
      accessorKey: "client",
      header: () => <Box className="text-foreground text-center">{t("superadmin.support.table.client", "Client")}</Box>,
      cell: ({ row }) => (
        <Box className="capitalize text-center">
          {row.original.clientOrganization?.name ||
            row.original.client ||
            "General"}
        </Box>
      ),
    },

    {
      accessorKey: "assignedto",
      header: () => <Box className="text-foreground text-center">{t("superadmin.support.table.assignedTo", "Assigned To")}</Box>,
      cell: ({ row }) => (
        <Box className="capitalize text-center">
          {row.original.assignedUser?.name ||
            row.original.assignedOrganization?.name ||
            row.original.assignedto ||
            "Unassigned"}
        </Box>
      ),
    },

    {
      accessorKey: "priority",
      header: () => <Box className="text-center text-foreground">{t("superadmin.support.table.priority", "Priority")}</Box>,
      cell: ({ row }) => {
        return (
          <Center className="text-center font-semibold capitalize">
            {row.original.priority}
          </Center>
        );
      },
    },

    {
      accessorKey: "createdon",
      header: () => <Box className="text-center text-foreground">{t("superadmin.support.table.createdOn", "Created On")}</Box>,
      cell: ({ row }) => {
        const createdon = row.original.createdon;
        try {
          return (
            <Box className="text-center">{format(createdon, "d MMM yyyy")}</Box>
          );
        } catch (error) {
          console.error("Invalid date:", createdon);
          console.log(error);
          return <Box className="text-center">Invalid Date</Box>;
        }
      },
    },

    {
      accessorKey: "status",
      header: () => <Box className="text-center text-foreground">{t("superadmin.support.table.status", "Status")}</Box>,
      cell: ({ row }) => {
        const status = row.original.status as "open" | "closed";

        const statusStyles: Record<
          typeof status,
          { text: string; dot: string }
        > = {
          open: {
            text: "text-white bg-[#00A400] border-none rounded-full",
            dot: "bg-card",
          },
          closed: {
            text: "text-white bg-[#F98618] border-none rounded-full",
            dot: "bg-card",
          },
        };

        return (
          <Center>
            <Flex
              className={`rounded-md capitalize w-26 h-10 gap-2 border items-center ${statusStyles[status].text}`}
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
      header: () => <Box className="text-center text-foreground">{t("superadmin.support.table.actions", "Actions")}</Box>,
      cell: ({ row }) => {
        return (
          <Center className="space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleViewTicket(row.original)}
                    variant="outline"
                    className="bg-black border-none w-10 h-9 hover:bg-black cursor-pointer rounded-md "
                  >
                    <Eye className="size-5 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>View Ticket</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleCloseTicket(row.original.id)}
                    variant="outline"
                    className="bg-[#23B95D] hover:bg-[#23B95D]/80 rounded-md border-none cursor-pointer"
                  >
                    <img src={CheckSvg} alt="check" className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Close Ticket</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleDelete(row.original.id)}
                    variant="outline"
                    className="bg-[#A50403] hover:bg-[#A50403]/80 rounded-md border-none cursor-pointer text-white hover:text-white"
                  >
                    X
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Delete Ticket</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Center>
        );
      },
    },
  ];

  if (loading && (!data || data.length === 0)) {
    return (
      <Box className="px-4 py-4">
        <TableSkeleton rows={8} columns={8} withActions />
      </Box>
    );
  }

  if (error && (!data || data.length === 0)) {
    return (
      <Center className="py-10">
        <ErrorState
          title={t("common.error")}
          message={error.message || t("common.errorDescription", "Error loading support tickets. Please try again.")}
        />
      </Center>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Center className="h-64">
        <Box className="text-lg text-muted-foreground">No support tickets found.</Box>
      </Center>
    );
  }

  // Calculate pagination based on actual data length if pagination metadata is missing
  const dataLength = data?.length ?? 0;
  const pageSize = pagination?.limit ?? 20;
  const currentPage = pagination?.page ?? 1;
  const calculatedTotal = pagination?.total ?? dataLength;
  const calculatedTotalPages =
    pagination?.totalPages ?? (Math.ceil(dataLength / pageSize) || 1);

  return (
    <>
      <ReusableTable
        data={data ?? []}
        columns={columns}
        // searchInput={false}
        enablePaymentLinksCalender={true}
        onRowClick={(row) => {
          handleViewTicket(row.original);
        }}
        pagination={
          onPageChange
            ? {
                pageIndex: Math.max(0, currentPage - 1),
                pageSize: pageSize,
                pageCount: calculatedTotalPages,
                total: calculatedTotal,
                onPageChange: (newPage: number) => onPageChange(newPage + 1),
              }
            : undefined
        }
      />

      <SupportTicketModal
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCloseTicket={handleCloseTicket}
      />
    </>
  );
};
