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
  subadminId: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useUserProfile = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<UserProfile>, ErrorWithMessage>({
    queryKey: ["user profile"],
    queryFn: async () => {
      const response = await axios.get<ApiResponse<UserProfile>>(
        "/superadmin/profile"
      );
      return response.data;
    },
    retry: 1,
    staleTime: 0, // No caching - always fetch fresh data
    refetchOnWindowFocus: false,
    ...options,
  });
};
