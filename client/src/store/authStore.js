import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({
        user: response.data.user,
        isSigningUp: false,
        isAuthenticated: true,
      });
      toast.success("Signup successful", { id: "signup-success" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed", {
        id: "signup-error",
      });
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({
        user: response.data.user,
        isLoggingIn: false,
        isAuthenticated: true,
      });
      toast.success("Login successful", { id: "login-success" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        id: "login-error",
      });
      set({ isLoggingIn: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logout successful", { id: "logout-success" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed", {
        id: "logout-error",
      });
      set({ isLoggingOut: false });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      toast.error(
        error.response.data.message || "Authentication check failed",
        { id: "auth-check-error" }
      );
    }
  },
}));
