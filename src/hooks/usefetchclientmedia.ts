import { useQuery } from "@tanstack/react-query";
import { axios } from "@/configs/axios.config";

export interface MediaCenterItem {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  projectId: string;
  projectName?: string; // May be returned if joined, but keeping optional
  taskId: string | null;
  taskName?: string;
  clientId: string;
  uploadedBy: string;
  createdAt: string;
  latestVersion: number;
}

export interface GetMediaCenterResponse {
  success: boolean;
  message: string;
  data: MediaCenterItem[];
}

export interface MediaFilters {
  projectId?: string;
  taskId?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  clientId?: string; // Added for client-specific endpoint
}

export const useFetchClientMedia = (filters?: MediaFilters) => {
  return useQuery({
    queryKey: ["media-center", filters],
    queryFn: async (): Promise<GetMediaCenterResponse> => {
      // Use client-specific endpoint if clientId is provided, otherwise org-wide
      const url = filters?.clientId ? `/clients/${filters.clientId}/media` : "/media";
      const response = await axios.get(url, { params: filters });
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
