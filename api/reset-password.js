// Password reset endpoint for Vercel
import bcrypt from "bcryptjs";
import { Pool } from "pg";

const SALT_ROUNDS = 10;
const GLOBAL_PG_POOL_KEY = "__CYBERSECURITY_PG_POOL";
function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!globalThis[GLOBAL_PG_POOL_KEY]) {
    globalThis[GLOBAL_PG_POOL_KEY] = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    });
  }
  return globalThis[GLOBAL_PG_POOL_KEY];
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { username, newPassword } = req.body || {};
  if (!username || !newPassword) {
    return res.status(400).json({ error: "Username and newPassword required" });
  }
  const pool = getPool();
  // If no DB configured, support an in-memory reset for local development
  if (!pool) {
    if (!globalThis.__LOCAL_USERS) globalThis.__LOCAL_USERS = [];
    const users = globalThis.__LOCAL_USERS;
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    // update in-memory user password
    user.password_hash = hash;
    return res
      .status(200)
      .json({ success: true, message: "Password updated (local)" });
  }
  // Check if user exists
  const userRes = await pool.query("SELECT id FROM users WHERE username = $1", [
    username,
  ]);
  if (userRes.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  // Hash new password
  const hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await pool.query("UPDATE users SET password_hash = $1 WHERE username = $2", [
    hash,
    username,
  ]);
  return res.status(200).json({ success: true, message: "Password updated" });
}
