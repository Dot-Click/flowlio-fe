import { axios } from "@/configs/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateProjectData {
  name: string;
  projectNumber: string;
  clientId: string;
  startDate: string;
  endDate: string;
  assignedTo: string;
  description?: string;
  address: string;
  contractfile?: string;
  organizationId: string;
}

interface UpdateProjectResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    projectNumber: string;
    clientId: string;
    description?: string;
    startDate: Date | null;
    endDate: Date | null;
    assignedTo: string;
    status: string;
    progress: number;
    address: string;
    contractfile?: string;
    contractfilePublicId?: string;
    organizationId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateProjectResponse,
    Error,
    { id: string; data: UpdateProjectData }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(`/projects/update/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Project updated successfully");

      // Invalidate and refetch project-related queries
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["organization-projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.data.id] });
    },
    onError: (error: any) => {
      let errorMessage = "Failed to update project";

      if (error.response?.status === 413) {
        errorMessage =
          "File is too large. Please choose a smaller file (max 10MB).";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error("Update project error:", {
        status: error.response?.status,
        message: errorMessage,
        data: error.response?.data,
      });

      toast.error(errorMessage);
    },
  });
};
