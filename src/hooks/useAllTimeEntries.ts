import { useQuery } from "@tanstack/react-query";
import { axios } from "@/configs/axios.config";

export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  taskId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  description: string;
  status: "active" | "completed";
  taskTitle: string;
  projectName: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntriesResponse {
  success: boolean;
  message: string;
  data: TimeEntry[];
}

export const useAllTimeEntries = () => {
  return useQuery<TimeEntriesResponse>({
    queryKey: ["all-time-entries"],
    queryFn: async () => {
      const response = await axios.get("/tasks/time-entries");
      return response.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
