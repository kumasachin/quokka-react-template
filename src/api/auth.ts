import axios from "../lib/apiClient";

export async function register(username: string, password: string) {
  return axios.post("/register", { username, password });
}

export async function login(username: string, password: string) {
  return axios.post("/auth", { username, password });
}

export async function resetPassword(username: string, newPassword: string) {
  return axios.post("/reset-password", { username, newPassword });
}
