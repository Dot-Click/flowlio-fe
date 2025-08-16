import { useQuery } from "@tanstack/react-query";
import { axios } from "@/configs/axios.config";

interface Client {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  cpfcnpj?: string;
  businessIndustry?: string;
  address?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientsResponse {
  success: boolean;
  message: string;
  data: Client[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface FetchClientsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  industry?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const useFetchClients = (params: FetchClientsParams = {}) => {
  return useQuery<ClientsResponse>({
    queryKey: ["clients", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params.page) searchParams.append("page", params.page.toString());
      if (params.limit) searchParams.append("limit", params.limit.toString());
      if (params.search) searchParams.append("search", params.search);
      if (params.status) searchParams.append("status", params.status);
      if (params.industry) searchParams.append("industry", params.industry);
      if (params.sortBy) searchParams.append("sortBy", params.sortBy);
      if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);

      const response = await axios.get<ClientsResponse>(
        `/clients?${searchParams.toString()}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFetchOrganizationClients = (organizationId?: string) => {
  return useQuery<ClientsResponse>({
    queryKey: ["organization-clients", organizationId],
    queryFn: async () => {
      const response = await axios.get<ClientsResponse>(`/clients`);
      return response.data;
    },
    enabled: !!organizationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
