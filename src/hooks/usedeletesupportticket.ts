import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";
import { useMutation } from "@tanstack/react-query";

interface DeleteSupportTicketRequest {
  id: string;
}

export const useDeleteSupportTicket = () => {
  return useMutation<ApiResponse, ErrorWithMessage, DeleteSupportTicketRequest>(
    {
      mutationKey: ["delete support ticket"],
      mutationFn: async ({ id }) => {
        const res = await axios.delete(
          `/superadmin/delete-supportticket/${id}`
        );
        return res.data;
      },
    }
  );
};
