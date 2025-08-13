import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";

type CreateClientData = FormData;

interface CreateClientResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
  };
  userOrganization: any;
  clientManagement: {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpfcnpj: string;
    address: string;
    industry: string;
    status: string;
    isActive: boolean;
    organizationId: string;
    createdBy: string;
    image?: string;
  };
}

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<CreateClientResponse>,
    ErrorWithMessage,
    CreateClientData
  >({
    mutationFn: async (data: CreateClientData) => {
      const response = await axios.post<ApiResponse<CreateClientResponse>>(
        "/organizations/create-client",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Client created successfully:", data);

      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({
        queryKey: ["fetch client organizations"],
      });
      queryClient.invalidateQueries({ queryKey: ["fetch all organizations"] });

      // You can add more query invalidations here if needed
    },
    onError: (error) => {
      console.error("Error creating client:", error);
    },
  });
};
