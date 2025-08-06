import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";
import { SupportTicket } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateSupportTicketRequest {
  id: string;
  status?: "open" | "closed";
  priority?: "High" | "Medium" | "Low";
  assignedto?: string;
  description?: string;
}

export const useUpdateSupportTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<SupportTicket>,
    ErrorWithMessage,
    UpdateSupportTicketRequest
  >({
    mutationKey: ["update support ticket"],
    mutationFn: async (data) => {
      const { id, ...updateData } = data;
      const res = await axios.put<ApiResponse<SupportTicket>>(
        `/superadmin/update-supportticket/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch support tickets
      queryClient.invalidateQueries({ queryKey: ["supportTickets"] });
    },
  });
};
