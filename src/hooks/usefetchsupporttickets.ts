import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";
import type { SupportTicket } from "@/types";
import { useQuery } from "@tanstack/react-query";

export type ResponseData = SupportTicket[];

export const useFetchSupportTickets = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<ResponseData>, ErrorWithMessage>({
    retryDelay: 5000,
    staleTime: 1000 * 10,
    queryKey: ["fetch support tickets"],
    queryFn: async () => {
      const response = await axios.get(`/superadmin/fetch-supporttickets`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    ...options,
  });
};
