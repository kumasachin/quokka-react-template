import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔵 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${
        response.status
      }`
    );
    return response;
  },
  (error) => {
    const { response, request, message } = error;

    if (response) {
      console.error(
        `${response.config?.method?.toUpperCase()} ${response.config?.url} - ${
          response.status
        }:`,
        {
          status: response.status,
          data: response.data,
        }
      );
    } else if (request) {
      console.error("❌ Network error:", request);
    } else {
      console.error("❌ Setup error:", message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
