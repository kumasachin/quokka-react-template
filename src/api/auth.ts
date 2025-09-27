import axios from "../lib/apiClient";

export async function register(
  username: string,
  password: string,
  role: string = "user"
) {
  return axios.post("/auth/signup", { username, password, role });
}

export async function login(username: string, password: string) {
  return axios.post("/auth/login", { username, password });
}

export async function resetPassword(username: string, newPassword: string) {
  return axios.post("/auth/reset", { username, newPassword });
}
