import { useState } from "react";
import axios from "axios";

// Types
interface CreateSupportTicketRequest {
  subject: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  client?: string;
  assignedTo: string;
}

interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "open" | "closed";
  submittedby: string;
  submittedbyName: string;
  submittedbyRole: string;
  client: string;
  assignedto: string;
  createdon: string;
  updatedAt: string;
  assignedToUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  submittedByUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface SupportTicketResponse {
  success: boolean;
  message: string;
  data: SupportTicket;
}

interface SupportTicketsResponse {
  success: boolean;
  message: string;
  data: {
    tickets: SupportTicket[];
    summary: {
      totalTickets: number;
      openTickets: number;
      closedTickets: number;
      highPriority: number;
      mediumPriority: number;
      lowPriority: number;
    };
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
}

interface RecentTicketsResponse {
  success: boolean;
  message: string;
  data: {
    submittedTickets: SupportTicket[];
    assignedTickets: SupportTicket[];
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    summary: {
      totalSubmitted: number;
      totalAssigned: number;
      openSubmitted: number;
      openAssigned: number;
    };
  };
}

// Hook for creating a support ticket
export const useCreateSupportTicket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SupportTicket | null>(null);

  const createTicket = async (ticketData: CreateSupportTicketRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<SupportTicketResponse>(
        "/api/user/support-ticket",
        ticketData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setData(response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create support ticket";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createTicket,
    loading,
    error,
    data,
    reset: () => {
      setError(null);
      setData(null);
    },
  };
};

// Hook for getting user's submitted tickets
export const useGetSubmittedTickets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SupportTicketsResponse["data"] | null>(null);

  const fetchSubmittedTickets = async () => {
    console.log("fetchSubmittedTickets called");
    setLoading(true);
    setError(null);

    try {
      console.log("Making API call to /api/user/support-tickets/submitted");
      const response = await axios.get<SupportTicketsResponse>(
        "/api/user/support-tickets/submitted",
        {
          withCredentials: true,
        }
      );
      console.log("API response:", response.data);

      if (response.data.success) {
        setData(response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch submitted tickets";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchSubmittedTickets,
    loading,
    error,
    data,
    reset: () => {
      setError(null);
      setData(null);
    },
  };
};

// Hook for getting user's assigned tickets (for admins)
export const useGetAssignedTickets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SupportTicketsResponse["data"] | null>(null);

  const fetchAssignedTickets = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<SupportTicketsResponse>(
        "/api/user/support-tickets/assigned",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setData(response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch assigned tickets";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchAssignedTickets,
    loading,
    error,
    data,
    reset: () => {
      setError(null);
      setData(null);
    },
  };
};

// Hook for getting recent tickets
export const useGetRecentTickets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RecentTicketsResponse["data"] | null>(null);

  const fetchRecentTickets = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<RecentTicketsResponse>(
        "/api/user/support-tickets/recent",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setData(response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch recent tickets";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchRecentTickets,
    loading,
    error,
    data,
    reset: () => {
      setError(null);
      setData(null);
    },
  };
};

// Hook for updating a support ticket
export const useUpdateSupportTicket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SupportTicket | null>(null);

  const updateTicket = async (
    ticketId: string,
    updateData: {
      status?: "open" | "closed";
      priority?: "High" | "Medium" | "Low";
      description?: string;
    }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put<SupportTicketResponse>(
        `/api/user/support-ticket/${ticketId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setData(response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update support ticket";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateTicket,
    loading,
    error,
    data,
    reset: () => {
      setError(null);
      setData(null);
    },
  };
};

// Combined hook for all support ticket operations
export const useSupportTickets = () => {
  const createTicket = useCreateSupportTicket();
  const submittedTickets = useGetSubmittedTickets();
  const assignedTickets = useGetAssignedTickets();
  const recentTickets = useGetRecentTickets();
  const updateTicket = useUpdateSupportTicket();

  return {
    // Create ticket
    createTicket: createTicket.createTicket,
    createLoading: createTicket.loading,
    createError: createTicket.error,
    createData: createTicket.data,
    resetCreate: createTicket.reset,

    // Submitted tickets
    fetchSubmittedTickets: submittedTickets.fetchSubmittedTickets,
    submittedLoading: submittedTickets.loading,
    submittedError: submittedTickets.error,
    submittedData: submittedTickets.data,
    resetSubmitted: submittedTickets.reset,

    // Assigned tickets
    fetchAssignedTickets: assignedTickets.fetchAssignedTickets,
    assignedLoading: assignedTickets.loading,
    assignedError: assignedTickets.error,
    assignedData: assignedTickets.data,
    resetAssigned: assignedTickets.reset,

    // Recent tickets
    fetchRecentTickets: recentTickets.fetchRecentTickets,
    recentLoading: recentTickets.loading,
    recentError: recentTickets.error,
    recentData: recentTickets.data,
    resetRecent: recentTickets.reset,

    // Update ticket
    updateTicket: updateTicket.updateTicket,
    updateLoading: updateTicket.loading,
    updateError: updateTicket.error,
    updateData: updateTicket.data,
    resetUpdate: updateTicket.reset,
  };
};

// Utility functions
export const getPriorityColor = (priority: "High" | "Medium" | "Low") => {
  switch (priority) {
    case "High":
      return "text-red-600 bg-red-100";
    case "Medium":
      return "text-yellow-600 bg-yellow-100";
    case "Low":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const getStatusColor = (status: "open" | "closed") => {
  switch (status) {
    case "open":
      return "text-blue-600 bg-blue-100";
    case "closed":
      return "text-gray-600 bg-gray-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const formatTicketDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
