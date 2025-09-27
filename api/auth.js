// JWT login endpoint for Vercel
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

const SECRET = process.env.JWT_SECRET || "supersecretkey";
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
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  const pool = getPool();
  // If no DB, use local in-memory users
  if (!pool) {
    if (!globalThis.__LOCAL_USERS) globalThis.__LOCAL_USERS = [];
    const users = globalThis.__LOCAL_USERS;
    const user = users.find((u) => u.username === username);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        created_at: user.created_at,
      },
      SECRET,
      { expiresIn: "2h" }
    );
    return res
      .status(200)
      .json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          created_at: user.created_at,
        },
      });
  }
  // Find user
  const result = await pool.query(
    "SELECT id, username, password_hash, role, created_at FROM users WHERE username = $1",
    [username]
  );
  if (result.rows.length === 0) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  // Include user info in JWT
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      created_at: user.created_at,
    },
    SECRET,
    { expiresIn: "2h" }
  );
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      created_at: user.created_at,
    },
  });
}
