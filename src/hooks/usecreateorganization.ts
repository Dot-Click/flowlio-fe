import { useMutation, useQuery } from "@tanstack/react-query";
import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";

interface CreateOrganizationWithPlanRequest {
  userId: string;
  organizationName: string;
  organizationWebsite?: string;
  organizationIndustry?: string;
  organizationSize?: string;
  planId: string;
}

interface OrganizationResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  website?: string;
  industry?: string;
  size?: string;
  subscriptionPlanId: string;
  subscriptionStatus: string;
  subscriptionStartDate: string;
  trialEndsAt: string;
  maxUsers: number;
  maxProjects: number;
  maxStorage: number;
  settings: any;
  createdAt: string;
  updatedAt: string;
  subscriptionPlan?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    currency: string;
    billingCycle: string;
    features: any;
  };
}

interface SubscriptionResponse {
  id: string;
  organizationId: string;
  planId: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  cancelledAt?: string;
  trialStart: string;
  trialEnd: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  organization: OrganizationResponse;
  plan: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    currency: string;
    billingCycle: string;
    features: any;
  };
  userRole: string;
}

export const useCreateOrganizationWithPlan = () => {
  return useMutation<
    ApiResponse<{
      organization: OrganizationResponse;
      subscription: SubscriptionResponse;
      plan: any;
      userRole: string;
    }>,
    ErrorWithMessage,
    CreateOrganizationWithPlanRequest
  >({
    mutationFn: async (data: CreateOrganizationWithPlanRequest) => {
      const response = await axios.post(
        "/organizations/create-with-plan",
        data
      );
      return response.data;
    },
  });
};

export const useFetchUserSubscriptions = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<SubscriptionResponse[]>, ErrorWithMessage>({
    retryDelay: 5000,
    staleTime: 1000 * 10,
    queryKey: ["fetch user subscriptions"],
    queryFn: async () => {
      const response = await axios.get(`/organizations/user-subscriptions`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useFetchUserOrganizations = (options?: { enabled?: boolean }) => {
  return useQuery<
    ApiResponse<
      {
        id: string;
        userId: string;
        organizationId: string;
        role: string;
        status: string;
        permissions: any;
        joinedAt: string;
        createdAt: string;
        updatedAt: string;
        organization: OrganizationResponse;
      }[]
    >,
    ErrorWithMessage
  >({
    retryDelay: 5000,
    staleTime: 1000 * 10,
    queryKey: ["fetch user organizations"],
    queryFn: async () => {
      const response = await axios.get(`/organizations/user-organizations`);
      return response.data;
    },
    ...options,
  });
};

// Debug hook to fetch all organizations (remove in production)
export const useFetchAllOrganizations = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<any[]>, ErrorWithMessage>({
    retryDelay: 5000,
    staleTime: 1000 * 10,
    queryKey: ["fetch all organizations"],
    queryFn: async () => {
      const response = await axios.get(`/organizations/all-organizations`);
      return response.data;
    },
    ...options,
  });
};
