import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://zap-chat-1rfs.onrender.com/api",
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  },
  maxRedirects: 5,
  validateStatus: (status) => status < 500
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Make sure cookies are sent with requests
    config.withCredentials = true;
    console.log('Request Config:', {
      url: config.url,
      headers: config.headers,
      withCredentials: config.withCredentials
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      url: response.config.url,
      status: response.status,
      headers: response.headers,
      cookies: document.cookie
    });
    return response;
  },
  async (error) => {
    console.error('Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      cookies: document.cookie
    });
    const originalRequest = error.config;

    // Handle 401 responses
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh auth state
      try {
        await useAuthStore.getState().checkAuth();
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (error) {
        // If refresh failed, redirect to login
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);


