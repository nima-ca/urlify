import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Create Axios Instance
const createAxiosInstance = (baseUrl?: string): AxiosInstance => {
  if (!baseUrl) throw new Error("base url is required for running program!");
  const instance = axios.create({
    baseURL: baseUrl,
  });

  return instance;
};

const api = (axios: AxiosInstance) => ({
  get: <T>(url: string, config: AxiosRequestConfig = {}) => {
    return axios.get<T>(url, config);
  },
  delete: <T>(url: string, config: AxiosRequestConfig = {}) => {
    return axios.delete<T>(url, config);
  },
  post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
    return axios.post<T>(url, body, config);
  },
  patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
    return axios.patch<T>(url, body, config);
  },
  put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
    return axios.put<T>(url, body, config);
  },
  defaults: axios.defaults,
});

export const apiRouteV1 = api(
  createAxiosInstance(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/v1`)
);

export const authApi = api(
  createAxiosInstance(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/auth`)
);
