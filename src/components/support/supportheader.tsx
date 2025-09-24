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
  useSupportTickets,
  getPriorityColor,
  getStatusColor,
  formatTicketDate,
} from "@/hooks/useSupportTickets";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["High", "Medium", "Low"]),
  client: z.string().optional(),
  assignedTo: z
    .string()
    .min(1, "Please select a team member to assign this ticket to"),
});

const SupportHeader = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
      priority: "Medium",
      client: "",
      assignedTo: "",
    },
  });

  const {
    createTicket,
    createLoading,
    fetchSubmittedTickets,
    submittedLoading,
    submittedData,
    submittedError,
    fetchRecentTickets,
    recentLoading,
    recentData,
    recentError,
  } = useSupportTickets();

  const modalProps = useGeneralModalDisclosure();
  const [activeTab, setActiveTab] = useState<"submitted" | "recent">(
    "submitted"
  );
  const [organizationMembers, setOrganizationMembers] = useState<any[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered, activeTab:", activeTab);
    if (activeTab === "submitted") {
      console.log("Fetching submitted tickets...");
      fetchSubmittedTickets();
    } else if (activeTab === "recent") {
      console.log("Fetching recent tickets...");
      fetchRecentTickets();
    }
  }, [activeTab]);

  // Fetch organization members when modal opens
  useEffect(() => {
    const fetchOrganizationMembers = async () => {
      console.log("🚀 Starting to fetch organization members...");
      setMembersLoading(true);
      try {
        const response = await axios.get(
          "/api/organizations/current-org-user-members",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          console.log("Full API response:", response.data);
          console.log(
            "Raw organization members:",
            response.data.data.userMembers
          );
          console.log(
            "Total members count:",
            response.data.data.userMembers.length
          );
          console.log("Organization ID:", response.data.data.organizationId);
          // Filter out current user from assignable members (prevent self-assignment)
          const currentUserId =
            response.data.data.currentUserId || response.data.data.user?.id;
          console.log("Current user ID:", currentUserId);
          const assignableMembers = response.data.data.userMembers.filter(
            (member: any) => (member.user?.id || member.id) !== currentUserId
          );
          console.log(
            "Filtered assignable members (excluding current user):",
            assignableMembers
          );
          setOrganizationMembers(assignableMembers);
        }
      } catch (error) {
        console.error("Failed to fetch organization members:", error);
        toast.error("Failed to load team members");
      } finally {
        setMembersLoading(false);
      }
    };

    if (modalProps.open) {
      console.log("🔄 Modal opened, fetching organization members...");
      fetchOrganizationMembers();
    }
  }, [modalProps.open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values);
    console.log("assignedTo value:", values.assignedTo);
    console.log("organizationMembers:", organizationMembers);

    try {
      await createTicket(values);
      form.reset();
      modalProps.onOpenChange(false);
      // Refresh the appropriate tab
      if (activeTab === "submitted") {
        fetchSubmittedTickets();
      } else {
        fetchRecentTickets();
      }
      toast.success("Support ticket created successfully!");
    } catch (error) {
      toast.error("Failed to create support ticket", {
        description: error as string,
      });
    }
  }

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

      <Flex className="justify-between max-md:flex-col max-md:items-start bg-white p-5 rounded-lg border border-gray-200 mt-5">
        <Box>
          <h1 className="text-md font-medium capitalize">Your Tickets</h1>
          <p className="text-gray-500 mt-0 max-md:text-sm">
            {submittedData?.summary.totalTickets || 0} total tickets,{" "}
            {submittedData?.summary.openTickets || 0} open
          </p>
        </Box>

        <Button
          variant="outline"
          className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer h-11"
          onClick={() => modalProps.onOpenChange(true)}
        >
          Create Ticket
        </Button>
      </Flex>

      <Flex className="justify-between max-md:flex-col max-md:items-start bg-white p-5 rounded-lg border border-gray-200 mt-5">
        <Box>
          <h1 className="text-md font-medium capitalize">
            Your Ticket Notification
          </h1>
          <p className="text-gray-500 max-md:text-sm">
            Oops sorry. There are notification to show
          </p>
        </Box>

        <p className="text-red-500 max-md:text-sm underline">
          Clear All Notifications
        </p>
      </Flex>

      <Flex className="flex-col items-start bg-white p-5 rounded-lg border border-gray-200 mt-5 w-full">
        <Flex className="justify-between items-center w-full mb-4">
          <h1 className="text-md font-medium capitalize">Support Tickets</h1>
          <Flex className="gap-2">
            <Button
              variant={activeTab === "submitted" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("submitted")}
            >
              My Tickets
            </Button>
            <Button
              variant={activeTab === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("recent")}
            >
              Recent Activity
            </Button>
          </Flex>
        </Flex>

        {activeTab === "submitted" && (
          <>
            {submittedLoading ? (
              <p className="text-gray-500">Loading your tickets...</p>
            ) : submittedError ? (
              <p className="text-red-500">
                Error loading tickets: {submittedError}
              </p>
            ) : submittedData?.tickets.length === 0 ? (
              <p className="text-gray-500">No tickets submitted yet.</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {submittedData?.tickets.map((ticket: any, index: number) => (
                  <AccordionItem key={ticket.id} value={`submitted-${index}`}>
                    <AccordionTrigger className="cursor-pointer">
                      <Stack>
                        <Flex className="items-center gap-2">
                          <h1 className="font-normal hover:underline text-[18px]">
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
                          {ticket.assignedToUser && (
                            <span>
                              {" "}
                              • Assigned to: {ticket.assignedToUser.name}
                            </span>
                          )}
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
                ))}
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
                Error loading recent activity: {recentError}
              </p>
            ) : recentData?.submittedTickets.length === 0 &&
              recentData?.assignedTickets.length === 0 ? (
              <p className="text-gray-500">No recent activity.</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {[
                  ...(recentData?.submittedTickets || []),
                  ...(recentData?.assignedTickets || []),
                ].map((ticket: any, index: number) => (
                  <AccordionItem key={ticket.id} value={`recent-${index}`}>
                    <AccordionTrigger className="cursor-pointer">
                      <Stack>
                        <Flex className="items-center gap-2">
                          <h1 className="font-normal hover:underline text-[18px]">
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
                          {ticket.submittedByUser && (
                            <span> • From: {ticket.submittedByUser.name}</span>
                          )}
                          {ticket.assignedToUser && (
                            <span> • To: {ticket.assignedToUser.name}</span>
                          )}
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
                ))}
              </Accordion>
            )}
          </>
        )}
      </Flex>

      <GeneralModal {...modalProps}>
        <h2 className="text-lg font-normal mb-4">Create Support Ticket</h2>
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
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
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
                disabled={createLoading}
              >
                {createLoading ? "Creating..." : "Create Ticket"}
              </Button>
            </Box>
          </form>
        </Form>
      </GeneralModal>
    </ComponentWrapper>
  );
};

export default SupportHeader;
