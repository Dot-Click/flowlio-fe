import ax, { AxiosError } from "axios";

export const environment = process.env.NODE_ENV as "production" | "development";
export type ErrorWithMessage = AxiosError<WithMessage>;
export interface WithMessage {
  message: string;
}

export interface ApiResponse<T = {}> {
  data: null | undefined | T;
  message: string;
}

const sanitizeDomain = (domain: string) => {
  // if (domain.at(-1) === "/")
  //   throw new Error(
  //     "Invalid domain format \n valid domains:\nhttps://www.example.com\nhttp://localhost:3000"
  //   );
  // return domain.at(-1) === "/" ? domain.slice(0, -1) + "/api" : domain + "/api";

  // Remove trailing slash if present
  const cleanDomain = domain.endsWith("/") ? domain.slice(0, -1) : domain;

  // Add /api to the domain
  return cleanDomain + "/api";
};

export const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
export const url = sanitizeDomain(backendDomain);

export const axios = ax.create({
  baseURL: url,
  withCredentials: true,
});
