import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Calendar,
  User,
  Building,
  Clock,
  AlertTriangle,
  CheckCircle,
  Tag,
  FileText,
  ArrowLeft,
  Archive,
  Star,
  MessageSquare,
} from "lucide-react";
import type { UniversalSupportTicket } from "@/hooks/useUniversalSupportTickets";
import { GeneralModal } from "@/components/common/generalmodal";
import { useTranslation } from "react-i18next";

interface SupportTicketModalProps {
  ticket: UniversalSupportTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onCloseTicket?: (id: string) => void;
}

export const SupportTicketModal = ({
  ticket,
  isOpen,
  onClose,
  onCloseTicket,
}: SupportTicketModalProps) => {
  const { t } = useTranslation();
  if (!ticket) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/15 text-red-500 border-red-500/30";
      case "Medium":
        return "bg-yellow-500/15 text-yellow-500 border-yellow-500/30";
      case "Low":
        return "bg-green-500/15 text-green-500 border-green-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500/15 text-green-500 border-green-500/30";
      case "closed":
        return "bg-orange-500/15 text-orange-500 border-orange-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <Archive className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleCloseTicket = () => {
    if (onCloseTicket) {
      onCloseTicket(ticket.id);
      onClose();
    }
  };

  return (
    <GeneralModal
      open={isOpen}
      onOpenChange={onClose}
      contentProps={{
        className:
          "max-w-4xl max-h-[90vh] overflow-y-auto bg-card shadow-2xl border border-border w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]",
      }}
    >
      <Box className="space-y-4">
        <Flex className="items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {t("superadmin.support.modal.title", "Support Ticket #{{number}}", { number: ticket.ticketNumber })}
          </h2>
        </Flex>

        {/* Header Info */}
        <Flex className="items-center gap-4 flex-wrap">
          <Badge className={`${getPriorityColor(ticket.priority)} border`}>
            <AlertTriangle className="w-3 h-3 mr-1" />
            {ticket.priority} {t("superadmin.support.modal.priority", "Priority")}
          </Badge>
          <Badge className={`${getStatusColor(ticket.status)} border`}>
            {getStatusIcon(ticket.status)}
            <span className="ml-1 capitalize">{ticket.status}</span>
          </Badge>
          <Flex className="items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {t("superadmin.support.modal.created", "Created")} {format(ticket.createdon, "MMM dd, yyyy 'at' h:mm a")}
          </Flex>
        </Flex>

        <Separator />

        {/* Ticket Details */}
        <Box className="space-y-4">
          {/* Subject */}
          <Box className="bg-muted/50 p-4 rounded-xl border border-border">
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#1797B9]" />
              {ticket.subject}
            </h3>
            <Box className="bg-card p-4 rounded-lg border border-border">
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t("superadmin.support.modal.description", "Description:")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-1">
                {ticket.description}
              </p>
            </Box>
          </Box>

          {/* Info Grid */}
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <Box className="space-y-4">
              <Flex className="items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <Box className="p-2 bg-blue-500 rounded-lg flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </Box>
                <Box className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {t("superadmin.support.modal.submittedBy", "Submitted By")}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium truncate">
                    {ticket.submittedbyName}
                  </p>
                </Box>
              </Flex>

              <Flex className="items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <Box className="p-2 bg-green-500 rounded-lg flex-shrink-0">
                  <Building className="w-5 h-5 text-white" />
                </Box>
                <Box>
                  <p className="text-sm font-semibold text-foreground">{t("superadmin.support.modal.client", "Client")}</p>
                  <p className="text-sm text-muted-foreground">{ticket.client}</p>
                </Box>
              </Flex>

              <Flex className="items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <Box className="p-2 bg-purple-500 rounded-lg flex-shrink-0">
                  <Tag className="w-5 h-5 text-white" />
                </Box>
                <Box>
                  <p className="text-sm font-semibold text-foreground">
                    {t("superadmin.support.modal.assignedTo", "Assigned To")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {ticket.assignedUser?.name ||
                      ticket.assignedOrganization?.name ||
                      ticket.assignedto ||
                      "Unassigned"}
                  </p>
                </Box>
              </Flex>
            </Box>

            {/* Right Column */}
            <Box className="space-y-4">
              <Flex className="items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <Box className="p-2 bg-orange-500 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </Box>
                <Box>
                  <p className="text-sm font-semibold text-foreground">
                    {t("superadmin.support.modal.lastUpdated", "Last Updated")}
                  </p>
                  <p className="text-[11.5px] text-muted-foreground">
                    {format(ticket.updatedAt, "MMM dd, yyyy 'at' h:mm a")}
                  </p>
                </Box>
              </Flex>

              <Flex className="items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <Box className="p-2 bg-indigo-500 rounded-lg flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </Box>
                <Box>
                  <p className="text-sm font-semibold text-foreground">
                    {t("superadmin.support.modal.ticketId", "Ticket ID")}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    #{ticket.ticketNumber}
                  </p>
                </Box>
              </Flex>

              <Flex className="items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <Box className="p-2 bg-yellow-500 rounded-lg flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </Box>
                <Box>
                  <p className="text-sm font-semibold text-foreground">
                    {t("superadmin.support.modal.category", "Category")}
                  </p>
                  <p className="text-sm text-muted-foreground">{t("superadmin.support.modal.technicalSupport", "Technical Support")}</p>
                </Box>
              </Flex>
            </Box>
          </Box>

          {/* User Information Section */}
          <Box className="bg-muted/50 p-4 rounded-xl border border-border">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#1797B9]" />
              Ticket Creator Information
            </h4>
            <Box className="bg-card p-3 rounded-lg border border-border">
              <Flex className="items-center gap-3 mb-2">
                <Box className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </Box>
                <Box>
                  <p className="text-sm font-semibold text-foreground">
                    {ticket.submittedbyName || ""}
                  </p>
                  <p className="text-xs text-muted-foreground">Ticket Creator</p>
                </Box>
              </Flex>
              <Box className="space-y-1 text-xs text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">User ID:</span>{" "}
                  {ticket.submittedby.slice(0, 5)}
                </p>
                <p>
                  <span className="font-medium text-foreground">Role:</span>{" "}
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-500/15 text-blue-500 capitalize">
                    {ticket.submittedbyRole || "User"}
                  </span>
                </p>
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Separator />

          <Flex className="justify-between items-center">
            <Flex className="gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("superadmin.support.modal.backToList", "Back to List")}
              </Button>
            </Flex>

            <Flex className="gap-2">
              {ticket.status === "open" && (
                <Button
                  variant="outline"
                  onClick={handleCloseTicket}
                  className="flex items-center gap-2 text-orange-500 border-orange-500/30 hover:bg-orange-500/10"
                >
                  <Archive className="w-4 h-4" />
                  {t("superadmin.support.modal.closeTicketBtn", "Close Ticket")}
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </GeneralModal>
  );
};
