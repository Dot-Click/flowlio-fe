import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const useAvailablePlans = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<SubscriptionPlan[]>, ErrorWithMessage>({
    retryDelay: 5000,
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryKey: ["available-plans"],
    queryFn: async () => {
      const response = await axios.get(`/subscriptions/plans`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    ...options,
  });
};
