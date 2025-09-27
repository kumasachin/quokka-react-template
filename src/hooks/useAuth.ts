import { useState } from "react";
import { login, register, resetPassword } from "../api/auth";

export interface AuthUser {
  id: number;
  username: string;
  role?: string;
  created_at?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(username: string, password: string) {
    setError(null);
    try {
      const res = await login(username, password);
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("jwt", res.data.token);
      return res.data.user;
    } catch (e: any) {
      setError(e?.response?.data?.error || "Login failed");
      return null;
    }
  }

  async function handleRegister(
    username: string,
    password: string,
    role: string = "user"
  ) {
    setError(null);
    try {
      await register(username, password, role);
      return true;
    } catch (e: any) {
      setError(e?.response?.data?.error || "Registration failed");
      return false;
    }
  }

  async function handleReset(username: string, newPassword: string) {
    setError(null);
    try {
      await resetPassword(username, newPassword);
      return true;
    } catch (e: any) {
      setError(e?.response?.data?.error || "Reset failed");
      return false;
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwt");
  }

  return {
    user,
    token,
    error,
    login: handleLogin,
    register: handleRegister,
    resetPassword: handleReset,
    logout,
  };
}
