import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://zap-chat-1rfs.onrender.com/api",
  withCredentials: true,
});
