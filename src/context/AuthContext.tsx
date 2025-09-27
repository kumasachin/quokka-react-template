import React, { createContext, useContext, useEffect } from "react";
import { AuthUser, useAuth } from "../hooks/useAuth";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (u: string, p: string) => Promise<AuthUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  // Optionally, restore token/user from localStorage on mount
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !auth.token) {
      auth.token = jwt;
    }
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
