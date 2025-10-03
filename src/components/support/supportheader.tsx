import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stack } from "../ui/stack";
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "../common/generalmodal";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  useUniversalSupportTickets,
  getPriorityColor,
  getStatusColor,
  formatTicketDate,
  useCreateUniversalSupportTicket,
  useUpdateUniversalSupportTicket,
  useDeleteUniversalSupportTicket,
  type CreateUniversalSupportTicketRequest,
} from "@/hooks/useUniversalSupportTickets";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  useDeleteAllNotifications,
  useNotifications,
  useMarkNotificationAsRead,
} from "@/hooks/useNotifications";
import { useGetCurrentOrgUserMembers } from "@/hooks/usegetallusermembers";
import { useUser } from "@/providers/user.provider";

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["high", "medium", "low", "urgent"]),
  client: z.string().optional(),
  assignedTo: z.string().optional(),
});

const SupportHeader = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
      priority: "medium",
      client: "",
      assignedTo: "",
    },
  });

  const {
    data: submittedData,
    isLoading: submittedLoading,
    error: submittedError,
    refetch: refetchSubmitted,
  } = useUniversalSupportTickets({ status: "open" });

  const {
    data: recentData,
    isLoading: recentLoading,
    error: recentError,
    refetch: refetchRecent,
  } = useUniversalSupportTickets();

  const {
    data: sentTicketsData,
    isLoading: sentTicketsLoading,
    error: sentTicketsError,
    refetch: refetchSentTickets,
  } = useUniversalSupportTickets();

  const createTicketMutation = useCreateUniversalSupportTicket();
  const updateTicketMutation = useUpdateUniversalSupportTicket();
  const deleteTicketMutation = useDeleteUniversalSupportTicket();

  const modalProps = useGeneralModalDisclosure();
  const [activeTab, setActiveTab] = useState<"submitted" | "recent" | "sent">(
    "submitted"
  );
  // Use the same hook as user management to get organization members
  const { data: organizationMembersData, isLoading: membersLoading } =
    useGetCurrentOrgUserMembers();

  const organizationMembers = organizationMembersData?.data?.userMembers || [];
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered, activeTab:", activeTab);
    if (activeTab === "submitted") {
      console.log("Fetching submitted tickets...");
      refetchSubmitted();
    } else if (activeTab === "recent") {
      console.log("Fetching recent tickets...");
      refetchRecent();
    } else if (activeTab === "sent") {
      console.log("Fetching sent tickets...");
      refetchSentTickets();
    }
  }, [activeTab, refetchSubmitted, refetchRecent, refetchSentTickets]);

  // Set current user ID from organization members data
  useEffect(() => {
    if (organizationMembersData?.data?.userMembers) {
      // The hook already provides the organization members, no need for manual API call
      console.log(
        "Support Ticket - Organization members:",
        organizationMembers.length,
        organizationMembers
      );
    }
  }, [organizationMembersData, organizationMembers.length]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values);
    console.log("assignedTo value:", values.assignedTo);
    console.log("organizationMembers:", organizationMembers);

    try {
      const ticketData: CreateUniversalSupportTicketRequest = {
        subject: values.subject,
        description: values.description,
        priority: values.priority,
        client: values.client,
        assignedToUser:
          values.assignedTo && values.assignedTo !== "no-assignment"
            ? values.assignedTo
            : undefined,
        assignedToOrganization: undefined,
      };

      console.log("Sending ticket data:", ticketData);
      console.log("createTicketMutation:", createTicketMutation);

      await createTicketMutation.mutateAsync(ticketData);

      console.log("Ticket created successfully, resetting form...");
      form.reset();
      modalProps.onOpenChange(false);
      // Refresh the appropriate tab
      if (activeTab === "submitted") {
        refetchSubmitted();
      } else {
        refetchRecent();
      }
      toast.success("Support ticket created successfully!");
    } catch (error) {
      console.error("Error creating support ticket:", error);
      toast.error("Failed to create support ticket");
    }
  }

  const clearAllNotificationsMutation = useDeleteAllNotifications();
  const { data: notificationsData } = useNotifications({ limit: 10 });
  const markAsReadMutation = useMarkNotificationAsRead();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTicket(null);
  };

  const handleNotificationClick = (notification: any) => {
    // Mark as read if not already read
    if (!notification.read) {
      markAsReadMutation.mutate(notification.id);
    }

    // Navigate to support tickets page for support ticket notifications
    if (notification.type.includes("support_ticket")) {
      navigate("/dashboard/support");
    }
  };

  return (
    <ComponentWrapper className="mt-6 p-5 shadow-none">
      <Flex className="justify-between max-md:flex-col max-md:items-start">
        <Box>
          <h1 className="text-2xl font-medium capitalize">Support Center</h1>
          <p className="text-gray-500 mt-1 max-md:text-sm">
            Need Help? We’ve Got You Covered.
          </p>
        </Box>
      </Flex>

      <Flex className="justify-between max-md:flex-col max-md:items-start bg-white p-6 rounded-lg border border-gray-200 mt-5 shadow-sm">
        <Box className="flex-1">
          <Flex className="items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h1 className="text-lg font-semibold text-gray-800">
              Your Tickets
            </h1>
          </Flex>
          <p className="text-gray-600 text-sm">
            {submittedData?.data?.tickets.length || 0} total tickets •{" "}
            {submittedData?.data?.tickets.filter(
              (ticket) => ticket.status === "open"
            ).length || 0}{" "}
            open •{" "}
            {submittedData?.data?.tickets.filter(
              (ticket) => ticket.status === "closed"
            ).length || 0}{" "}
            resolved
          </p>
        </Box>

        <Button
          variant="outline"
          className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg px-6 py-3 flex items-center gap-2 cursor-pointer h-12 font-medium"
          onClick={() => modalProps.onOpenChange(true)}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Ticket
        </Button>
      </Flex>

      <Flex className="justify-between max-md:flex-col max-md:items-start bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mt-5">
        <Box className="flex-1">
          <Flex className="items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h1 className="text-lg font-semibold text-gray-800">
              Recent Notifications
            </h1>
          </Flex>
          <Flex className="justify-between items-center">
            <p className="text-gray-600 text-sm">
              {notificationsData?.data?.notifications?.filter(
                (n: any) => !n.read
              )?.length || 0}{" "}
              unread notifications
              {notificationsData?.data?.notifications?.filter(
                (n: any) => !n.read
              )?.length === 0 && " - You're all caught up!"}
            </p>
            {notificationsData?.data?.notifications &&
              notificationsData.data.notifications.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 ml-4"
                  onClick={() => clearAllNotificationsMutation.mutate()}
                  disabled={clearAllNotificationsMutation.isPending}
                >
                  {clearAllNotificationsMutation.isPending
                    ? "Clearing..."
                    : "Clear All Notifications"}
                </Button>
              )}
          </Flex>

          {/* Notification List */}
          {notificationsData?.data?.notifications &&
            notificationsData.data.notifications.length > 0 && (
              <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                {notificationsData.data.notifications
                  .sort((a: any, b: any) => {
                    // Sort unread notifications first, then by date
                    if (a.read !== b.read) {
                      return a.read ? 1 : -1;
                    }
                    return (
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                    );
                  })
                  .map((notification: any) => (
                    <div
                      key={notification.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          notification.read ? "bg-gray-400" : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {notification.message}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            )}
        </Box>
      </Flex>

      <Flex className="flex-col items-start bg-white p-6 rounded-lg border border-gray-200 mt-5 w-full shadow-sm">
        <Flex className="justify-between items-center w-full mb-6">
          <Flex className="items-center gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <h1 className="text-lg font-semibold text-gray-800">
              Support Tickets
            </h1>
          </Flex>
          <Flex className="gap-2">
            <Button
              variant={activeTab === "submitted" ? "default" : "outline"}
              size="sm"
              className={
                activeTab === "submitted"
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : ""
              }
              onClick={() => setActiveTab("submitted")}
            >
              My Tickets
            </Button>
            <Button
              variant={activeTab === "recent" ? "default" : "outline"}
              size="sm"
              className={
                activeTab === "recent"
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer "
                  : ""
              }
              onClick={() => setActiveTab("recent")}
            >
              Recent Activity
            </Button>
            <Button
              variant={activeTab === "sent" ? "default" : "outline"}
              size="sm"
              className={
                activeTab === "sent"
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : ""
              }
              onClick={() => setActiveTab("sent")}
            >
              Sent Tickets
            </Button>
          </Flex>
        </Flex>

        {activeTab === "submitted" && (
          <>
            {submittedLoading ? (
              <p className="text-gray-500">Loading your tickets...</p>
            ) : submittedError ? (
              <p className="text-red-500">
                Error loading tickets:{" "}
                {submittedError?.message || "Unknown error"}
              </p>
            ) : submittedData?.data?.tickets.length === 0 ? (
              <p className="text-gray-500">No tickets submitted yet.</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {submittedData?.data?.tickets?.map(
                  (ticket: any, index: number) => (
                    <AccordionItem key={ticket.id} value={`submitted-${index}`}>
                      <AccordionTrigger className="cursor-pointer">
                        <Stack>
                          <Flex className="items-center gap-2">
                            <h1 className="font-normal hover:underline text-[18px] capitalize">
                              {ticket.subject}
                            </h1>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                ticket.status
                              )}`}
                            >
                              {ticket.status}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(
                                ticket.priority
                              )}`}
                            >
                              {ticket.priority}
                            </span>
                          </Flex>
                          <p className="text-[#7184b4] text-sm font-normal">
                            Ticket #{ticket.ticketNumber} •{" "}
                            {formatTicketDate(ticket.createdon)}
                            {/* {ticket.assignedto && (
                              <span> • Assigned to: {ticket.assignedto}</span>
                            )} */}
                          </p>
                        </Stack>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>Description: {ticket.description}</p>
                        {ticket.submittedbyName && (
                          <p className="text-sm text-gray-600">
                            <strong>Sent By:</strong> {ticket.submittedbyName}
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            )}
          </>
        )}

        {activeTab === "recent" && (
          <>
            {recentLoading ? (
              <p className="text-gray-500">Loading recent activity...</p>
            ) : recentError ? (
              <p className="text-red-500">
                Error loading recent activity:{" "}
                {recentError?.message || "Unknown error"}
              </p>
            ) : recentData?.data?.tickets?.length === 0 ? (
              <p className="text-gray-500">No recent activity.</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {recentData?.data?.tickets?.map(
                  (ticket: any, index: number) => (
                    <AccordionItem key={ticket.id} value={`recent-${index}`}>
                      <AccordionTrigger className="cursor-pointer">
                        <Stack>
                          <Flex className="items-center gap-2">
                            <h1 className="font-normal hover:underline text-[18px] capitalize">
                              {ticket.subject}
                            </h1>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                ticket.status
                              )}`}
                            >
                              {ticket.status}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                ticket.priority
                              )}`}
                            >
                              {ticket.priority}
                            </span>
                          </Flex>
                          <p className="text-[#7184b4] text-sm font-normal">
                            Ticket #{ticket.ticketNumber} •{" "}
                            {formatTicketDate(ticket.createdon)}
                            {ticket.submittedbyName && (
                              <span> • From: {ticket.submittedbyName}</span>
                            )}
                            {/* {ticket.assignedto && (
                              <span> • Assigned to: {ticket.assignedto}</span>
                            )} */}
                          </p>
                        </Stack>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>{ticket.description}</p>
                        {ticket.client && (
                          <p className="text-sm text-gray-600">
                            <strong>Client:</strong> {ticket.client}
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            )}
          </>
        )}

        {activeTab === "sent" && (
          <>
            {sentTicketsLoading ? (
              <p className="text-gray-500">Loading your sent tickets...</p>
            ) : sentTicketsError ? (
              <p className="text-red-500">
                Error loading sent tickets:{" "}
                {sentTicketsError?.message || "Unknown error"}
              </p>
            ) : sentTicketsData?.data?.tickets?.filter(
                (ticket: any) => ticket.submittedby === user?.user.id
              )?.length === 0 ? (
              <p className="text-gray-500">You haven't sent any tickets yet.</p>
            ) : (
              <div className="w-full">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Ticket #
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Subject
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Priority
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Created
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sentTicketsData?.data?.tickets
                        ?.filter(
                          (ticket: any) => ticket.submittedby === user?.user.id
                        )
                        ?.map((ticket: any) => (
                          <tr
                            key={ticket.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 text-sm font-medium text-gray-900">
                              #{ticket.ticketNumber}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900">
                              <div
                                className="max-w-xs truncate"
                                title={ticket.subject}
                              >
                                {ticket.subject}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                  ticket.priority
                                )}`}
                              >
                                {ticket.priority}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  ticket.status
                                )}`}
                              >
                                {ticket.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500">
                              {formatTicketDate(ticket.createdon)}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                                  onClick={() => handleViewTicket(ticket)}
                                >
                                  View
                                </Button>
                                {ticket.status === "open" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                                    onClick={() => {
                                      updateTicketMutation.mutate(
                                        {
                                          id: ticket.id,
                                          data: { status: "closed" },
                                        },
                                        {
                                          onSuccess: () => {
                                            toast.success(
                                              "Ticket closed successfully"
                                            );
                                            refetchSentTickets();
                                          },
                                          onError: (error: any) => {
                                            toast.error(
                                              error.response?.data?.message ||
                                                "Failed to close ticket"
                                            );
                                          },
                                        }
                                      );
                                    }}
                                  >
                                    Close
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure you want to delete this ticket?"
                                      )
                                    ) {
                                      deleteTicketMutation.mutate(ticket.id, {
                                        onSuccess: () => {
                                          toast.success(
                                            "Ticket deleted successfully"
                                          );
                                          refetchSentTickets();
                                        },
                                        onError: (error: any) => {
                                          toast.error(
                                            error.response?.data?.message ||
                                              "Failed to delete ticket"
                                          );
                                        },
                                      });
                                    }
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </Flex>

      <GeneralModal {...modalProps}>
        <h2 className="text-lg font-normal mb-4">
          Create Support Ticket for Viewer
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box className="bg-white/80 gap-4 grid grid-cols-1">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
                        type="text"
                        placeholder="Enter ticket subject"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Flex>
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign To</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                membersLoading
                                  ? "Loading team members..."
                                  : "Select a team member"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="no-assignment">
                            No Assignment (General Support)
                          </SelectItem>
                          {organizationMembers.length === 0 ? (
                            <SelectItem value="no-members" disabled>
                              No team members available - Create users first
                            </SelectItem>
                          ) : (
                            organizationMembers.map((member) => (
                              <SelectItem
                                key={member.user?.id || member.id}
                                value={member.user?.id || member.id}
                              >
                                {member.user?.name ||
                                  `${member.firstname} ${member.lastname}`}{" "}
                                ({member.user?.role || member.userrole})
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>

              {organizationMembers.length === 0 && (
                <Box className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-yellow-800 text-sm">
                    <strong>No team members found!</strong> You need to create
                    users with "viewer" role in your organization first. Go to
                    User Management to add team members.
                  </p>
                </Box>
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        className="bg-white rounded-md placeholder:text-gray-400"
                        placeholder="Describe your issue in detail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
                        type="text"
                        placeholder="Enter client name if applicable"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="outline"
                className="bg-[#1797b9] hover:bg-[#1797b9]/80 hover:text-white text-white border border-gray-200 rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
                type="submit"
                disabled={createTicketMutation.isPending}
              >
                {createTicketMutation.isPending
                  ? "Creating..."
                  : "Create Ticket"}
              </Button>
            </Box>
          </form>
        </Form>
      </GeneralModal>

      {/* View Ticket Modal */}
      <GeneralModal
        {...modalProps}
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        contentProps={{
          className: "max-w-2xl w-full max-h-[90vh] overflow-y-auto",
        }}
      >
        {selectedTicket && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Ticket #{selectedTicket.ticketNumber}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseViewModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-6">
              {/* Ticket Header Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Subject
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedTicket.subject}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <div className="mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedTicket.status
                        )}`}
                      >
                        {selectedTicket.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Priority
                    </label>
                    <div className="mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                          selectedTicket.priority
                        )}`}
                      >
                        {selectedTicket.priority}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Created
                    </label>
                    <p className="text-sm text-gray-800">
                      {formatTicketDate(selectedTicket.createdon)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Description
                </label>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {selectedTicket.description}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              {selectedTicket.client && (
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">
                    Client
                  </label>
                  <p className="text-gray-800">{selectedTicket.client}</p>
                </div>
              )}

              {selectedTicket.assignedto && (
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">
                    Assigned To
                  </label>
                  <p className="text-gray-800">{selectedTicket.assignedto}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedTicket.status === "open" && (
                  <Button
                    variant="outline"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                    onClick={() => {
                      updateTicketMutation.mutate(
                        { id: selectedTicket.id, data: { status: "closed" } },
                        {
                          onSuccess: () => {
                            toast.success("Ticket closed successfully");
                            refetchSentTickets();
                            handleCloseViewModal();
                          },
                          onError: (error: any) => {
                            toast.error(
                              error.response?.data?.message ||
                                "Failed to close ticket"
                            );
                          },
                        }
                      );
                    }}
                  >
                    Close Ticket
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this ticket?"
                      )
                    ) {
                      deleteTicketMutation.mutate(selectedTicket.id, {
                        onSuccess: () => {
                          toast.success("Ticket deleted successfully");
                          refetchSentTickets();
                          handleCloseViewModal();
                        },
                        onError: (error: any) => {
                          toast.error(
                            error.response?.data?.message ||
                              "Failed to delete ticket"
                          );
                        },
                      });
                    }
                  }}
                >
                  Delete Ticket
                </Button>
              </div>
            </div>
          </div>
        )}
      </GeneralModal>
    </ComponentWrapper>
  );
};

export default SupportHeader;
