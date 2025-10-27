import axios, { AxiosRequestConfig } from "axios";
import { APIConfiguration } from "@/configs/api.configs";

const config: AxiosRequestConfig = {
  baseURL: APIConfiguration.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/u/")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { instance };
