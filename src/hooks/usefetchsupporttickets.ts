import { axios, type ErrorWithMessage } from "@/configs/axios.config";
import type { GetSupportTicketsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchSupportTickets = (options?: { enabled?: boolean }) => {
  return useQuery<GetSupportTicketsResponse, ErrorWithMessage>({
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
