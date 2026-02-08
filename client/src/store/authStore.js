import { create } from "zustand";
import api from "../lib/api.js";
import toast from "react-hot-toast";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/api/v1/auth/signup", credentials);
      set({
        user: response.data.user,
        isSigningUp: false,
        isAuthenticated: true,
      });
      toast.success("Signup successful", { id: "signup-success" });
    } catch (error) {
      toast.error(getErrorMessage(error, "Signup failed"), {
        id: "signup-error",
      });
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/api/v1/auth/login", credentials);
      set({
        user: response.data.user,
        isLoggingIn: false,
        isAuthenticated: true,
      });
      toast.success("Login successful", { id: "login-success" });
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed"), {
        id: "login-error",
      });
      set({ isLoggingIn: false, user: null });
      return false;
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await api.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logout successful", { id: "logout-success" });
    } catch (error) {
      toast.error(getErrorMessage(error, "Logout failed"), {
        id: "logout-error",
      });
      set({ isLoggingOut: false });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await api.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      toast.error(getErrorMessage(error, "Authentication check failed"), {
        id: "auth-check-error",
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
