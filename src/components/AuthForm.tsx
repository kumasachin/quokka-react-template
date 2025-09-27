import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AuthForm() {
  const { login, register, resetPassword, user, error, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);
    setSuccessMsg(null);
    if (mode === "login") {
      await login(username, password);
    } else if (mode === "register") {
      // Basic validation
      if (password.length < 6) {
        setLocalError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setLocalError("Passwords do not match");
        setLoading(false);
        return;
      }
      const ok = await register(username, password, role);
      if (ok) {
        setSuccessMsg("Registration successful. Please log in.");
        setMode("login");
        // clear sensitive fields
        setPassword("");
        setConfirmPassword("");
      } else {
        // use error from hook or local
      }
    } else if (mode === "reset") {
      await resetPassword(username, newPassword);
    }
    setLoading(false);
  }

  if (user) {
    return (
      <div>
        <p>Welcome, {user.username}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 320,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        {mode === "login"
          ? "Login"
          : mode === "register"
          ? "Register"
          : "Reset Password"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
          required
        />
        {(mode === "login" || mode === "register") && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
            required
          />
        )}
        {mode === "register" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
            required
          />
        )}
        {mode === "register" && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        {mode === "reset" && (
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
            required
          />
        )}
        <button
          type="submit"
          style={{ width: "100%", padding: 8 }}
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : mode === "register"
            ? "Register"
            : "Reset Password"}
        </button>
        {localError && (
          <div style={{ color: "red", marginTop: 8 }}>{localError}</div>
        )}
        {error && !localError && (
          <div style={{ color: "red", marginTop: 8 }}>{error}</div>
        )}
        {successMsg && (
          <div style={{ color: "green", marginTop: 8 }}>{successMsg}</div>
        )}
      </form>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        {mode !== "login" && (
          <button type="button" onClick={() => setMode("login")}>
            Login
          </button>
        )}
        {mode !== "register" && (
          <button
            type="button"
            onClick={() => setMode("register")}
            style={{ marginLeft: 8 }}
          >
            Register
          </button>
        )}
        {mode !== "reset" && (
          <button
            type="button"
            onClick={() => setMode("reset")}
            style={{ marginLeft: 8 }}
          >
            Reset Password
          </button>
        )}
      </div>
    </div>
  );
}
