import {
  axios,
  type ApiResponse,
  type ErrorWithMessage,
} from "@/configs/axios.config";
import { ISubAdmin, CreateSubAdminRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateSubAdmin = () => {
  return useMutation<
    ApiResponse<ISubAdmin>,
    ErrorWithMessage,
    CreateSubAdminRequest
  >({
    mutationKey: ["create subadmin"],
    mutationFn: async (body) => {
      const formData = new FormData();

      // Add all form fields to FormData
      Object.entries(body).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });

      const res = await axios.post<ApiResponse<ISubAdmin>>(
        "/superadmin/create-subadmin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
  });
};

// Sub Admin Login Hook
interface SubAdminLoginRequest {
  email: string;
  password: string;
}

interface SubAdminLoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    isSuperAdmin: boolean;
  };
  subAdmin: {
    id: string;
    firstName: string;
    lastName: string;
    permission: string;
    logo?: string | null;
  };
}

export const useSubAdminLogin = () => {
  return useMutation<
    ApiResponse<SubAdminLoginResponse>,
    ErrorWithMessage,
    SubAdminLoginRequest
  >({
    mutationKey: ["subadmin login"],
    mutationFn: async (credentials) => {
      const res = await axios.post<ApiResponse<SubAdminLoginResponse>>(
        "/superadmin/subadmin-login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
  });
};
