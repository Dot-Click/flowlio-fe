import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";

export interface ActiveTimeEntry {
  id: string;
  taskId: string;
  startTime: string;
  description: string;
  taskTitle: string;
  projectName: string;
}

export interface ActiveTimeEntriesResponse {
  success: boolean;
  message: string;
  data: ActiveTimeEntry[];
}

export const useActiveTimeEntries = () => {
  return useQuery<ActiveTimeEntriesResponse>({
    queryKey: ["active-time-entries"],
    queryFn: async () => {
      const response = await axios.get("/viewer/tasks/active-time");
      return response.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds to update timer
    staleTime: 0, // Always consider data stale to get real-time updates
  });
};

export interface StartTaskResponse {
  success: boolean;
  message: string;
  data: {
    timeEntryId: string;
    startTime: string;
    taskId: string;
    taskTitle: string;
  };
}

export interface EndTaskResponse {
  success: boolean;
  message: string;
  data: {
    timeEntryId: string;
    startTime: string;
    endTime: string;
    duration: number;
    taskId: string;
    taskTitle: string;
  };
}

export const useStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string): Promise<StartTaskResponse> => {
      const response = await axios.post(`/viewer/tasks/${taskId}/start`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Task started successfully!", data);
      // Invalidate viewer tasks to refresh the data
      queryClient.invalidateQueries({ queryKey: ["viewer-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["active-time-entries"] });

      toast.success(`Started tracking: ${data.data.taskTitle}`);
    },
    onError: (error: any) => {
      console.error("Error starting task:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to start task";
      toast.error(errorMessage);
    },
  });
};

export const useEndTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string): Promise<EndTaskResponse> => {
      const response = await axios.post(`/viewer/tasks/${taskId}/end`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Task ended successfully!", data);
      // Invalidate viewer tasks to refresh the data
      queryClient.invalidateQueries({ queryKey: ["viewer-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["active-time-entries"] });

      const durationHours = Math.floor(data.data.duration / 60);
      const durationMinutes = data.data.duration % 60;
      toast.success(
        `Completed: ${data.data.taskTitle} (${durationHours}h ${durationMinutes}m)`
      );
    },
    onError: (error: any) => {
      console.error("Error ending task:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to end task";
      toast.error(errorMessage);
    },
  });
};
