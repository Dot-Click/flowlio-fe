import { useQuery } from "@tanstack/react-query";
import { axios } from "@/configs/axios.config";
import { ApiResponse } from "@/configs/axios.config";

export interface ClientTask {
  id: string;
  title: string;
  description?: string;
  status:
    | "todo"
    | "in_progress"
    | "completed"
    | "updated"
    | "delay"
    | "changes";
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  projectName: string;
  assigneeName?: string;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    size: number;
    type: string;
  }>;
}

export const useFetchClientTasks = () => {
  return useQuery<ApiResponse<ClientTask[]>>({
    queryKey: ["client-tasks"],
    queryFn: async () => {
      const response =
        await axios.get<ApiResponse<ClientTask[]>>("/clients/tasks");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
