import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("gym_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url?.includes("/auth/login")) {
      localStorage.removeItem("gym_token");
      localStorage.removeItem("gym_user");
      
      toast.error("Tu sesión ha expirado o es inválida. Por favor, inicia sesión de nuevo.", {
        id: "session-expired",
      });

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
