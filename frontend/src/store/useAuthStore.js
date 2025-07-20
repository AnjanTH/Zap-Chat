import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Setup base URL for socket connection
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://zap-chat-1rfs.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // ✅ Check login status on refresh
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.error("checkAuth failed:", err?.response?.data?.message || err.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ Signup logic
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ✅ Login logic
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (err) {
      const msg = err?.response?.data?.message;
      if (msg === "Email does not exist") {
        toast.error("Email not found. Please check your email.");
      } else if (msg === "Invalid password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error(msg || "Login failed");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ✅ Logout logic
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  },

  // ✅ Update profile
updateProfile: async (formData) => {
  set({ isUpdatingProfile: true });
  try {
    const res = await axiosInstance.put("/auth/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    set({ authUser: res.data });
    toast.success("Profile updated");
  } catch (err) {
    console.error("Profile update failed:", err);
    toast.error(err?.response?.data?.message || "Update failed");
  } finally {
    set({ isUpdatingProfile: false });
  }
}

,

  // ✅ Connect to socket.io with credentials
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      path: "/socket.io/",
      query: { userId: authUser._id },
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.connect();

    newSocket.on("connect", () => {
      console.log("✅ Socket connected");
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket connection failed:", err.message);
      toast.error("Socket connection failed");
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  // ✅ Disconnect from socket
  disconnectSocket: () => {
    const sock = get().socket;
    if (sock?.connected) sock.disconnect();
  },
}));
