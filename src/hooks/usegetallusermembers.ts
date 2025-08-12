import { useQuery } from "@tanstack/react-query";
import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";

interface UserMember {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  userrole: string;
  companyname: string;
  setpermission: string;
  status: string;
  isActive: boolean;
  organizationId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  loginAttempts: number;
  lockedUntil: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string | null;
    emailVerified: boolean;
    isSuperAdmin: boolean;
  } | null;
  userOrganization: {
    id: string;
    role: string;
    permissions: any;
    status: string;
    joinedAt: string;
  } | null;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface GetAllUserMembersResponse {
  userMembers: UserMember[];
  pagination: PaginationInfo;
}

interface GetAllUserMembersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  userrole?: string;
}

export const useGetAllUserMembers = (params: GetAllUserMembersParams = {}) => {
  return useQuery<
    ApiResponse<GetAllUserMembersResponse>,
    ErrorWithMessage,
    ApiResponse<GetAllUserMembersResponse>
  >({
    queryKey: ["get-all-user-members", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params.page) searchParams.append("page", params.page.toString());
      if (params.limit) searchParams.append("limit", params.limit.toString());
      if (params.search) searchParams.append("search", params.search);
      if (params.status) searchParams.append("status", params.status);
      if (params.userrole) searchParams.append("userrole", params.userrole);

      const response = await axios.get<ApiResponse<GetAllUserMembersResponse>>(
        `/organizations/user-members?${searchParams.toString()}`
      );

      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGetUserMemberById = (id: string) => {
  return useQuery<
    ApiResponse<UserMember>,
    ErrorWithMessage,
    ApiResponse<UserMember>
  >({
    queryKey: ["get-user-member-by-id", id],
    queryFn: async () => {
      const response = await axios.get<ApiResponse<UserMember>>(
        `/organizations/user-members/${id}`
      );
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
