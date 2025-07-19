import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://zap-chat-1rfs.onrender.com/api",
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any auth headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


