import ax, { AxiosError } from "axios";

export const environment = process.env.NODE_ENV as "production" | "development";
export type ErrorWithMessage = AxiosError<WithMessage>;
export interface WithMessage {
  message: string;
}

const sanitizeDomain = (domain: string) =>
  domain.at(-1) === "/" ? domain.slice(0, -1) + "/api" : domain + "/api";

export const backendDomains = {
  production: "https://railway.app",
  development: "http://localhost:3000",
};

export const url = sanitizeDomain(backendDomains[environment]);

export const axios = ax.create({
  baseURL: url,
  withCredentials: true,
});
