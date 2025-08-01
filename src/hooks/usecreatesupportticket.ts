import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";
import { CreateSupportTicketRequest, SupportTicket } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateSupportTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<SupportTicket>,
    ErrorWithMessage,
    CreateSupportTicketRequest
  >({
    mutationKey: ["create support ticket"],
    mutationFn: async (body) => {
      const res = await axios.post<ApiResponse<SupportTicket>>(
        "/superadmin/create-supportticket",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["support tickets"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create support ticket";
      toast.error(errorMessage);
    },
  });
};
