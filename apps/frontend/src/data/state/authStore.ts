import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Initialize from localStorage
const getInitialAuthState = () => {
  const token = localStorage.getItem("auth-token");
  return {
    isAuthenticated: !!token,
    user: token ? { username: "admin" } : null,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialAuthState(),

  login: async (username: string, password: string) => {
    // Mock authentication - in real app, call API
    if (username === "admin" && password === "password") {
      set({ isAuthenticated: true, user: { username } });
      localStorage.setItem("auth-token", "mock-token");
      return true;
    }
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
    localStorage.removeItem("auth-token");
  },
}));
