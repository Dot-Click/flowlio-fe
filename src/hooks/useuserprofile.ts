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
  role: string;
  subadminId: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useUserProfile = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<UserProfile>, ErrorWithMessage>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      console.log("🔄 Fetching user profile...");
      const response = await axios.get<ApiResponse<UserProfile>>(
        "/user/profile",
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      console.log("📋 Profile response:", response.data);
      return response.data;
    },
    retry: 1,
    staleTime: 0, // No caching - always fetch fresh data
    gcTime: 0, // No garbage collection time - always fresh
    refetchOnWindowFocus: true, // Refetch when window gains focus
    refetchOnMount: true, // Refetch when component mounts
    refetchOnReconnect: true, // Refetch when reconnecting
    ...options,
  });
};
