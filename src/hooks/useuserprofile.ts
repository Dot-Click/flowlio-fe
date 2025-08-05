import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  isSuperAdmin: boolean;
  role: string; // Add role field
  subadminId: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useUserProfile = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<UserProfile>, ErrorWithMessage>({
    queryKey: ["user profile"],
    queryFn: async () => {
      console.log("Fetching user profile...");
      const response = await axios.get<ApiResponse<UserProfile>>(
        "/superadmin/profile",
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      console.log("Profile response:", response.data);
      return response.data;
    },
    retry: 1,
    staleTime: 0, // No caching - always fetch fresh data
    refetchOnWindowFocus: true, // Refetch when window gains focus
    refetchOnMount: true, // Refetch when component mounts
    ...options,
  });
};
