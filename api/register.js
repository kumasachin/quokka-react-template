// User registration endpoint for Vercel
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
  const { username, password, role = "user" } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  const pool = getPool();
  // If no DB configured, use an in-memory users store for local development
  if (!pool) {
    // initialize in-memory store on globalThis
    if (!globalThis.__LOCAL_USERS) globalThis.__LOCAL_USERS = [];
    const users = globalThis.__LOCAL_USERS;
    const exists = users.find((u) => u.username === username);
    if (exists) {
      return res.status(409).json({ error: "Username already exists" });
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const id = (users.length + 1).toString();
    const now = new Date().toISOString();
    users.push({ id, username, password_hash: hash, role, created_at: now });
    return res
      .status(201)
      .json({ success: true, message: "User registered (local)" });
  }
  // Check if user exists
  const existing = await pool.query(
    "SELECT id FROM users WHERE username = $1",
    [username]
  );
  if (existing.rows.length > 0) {
    return res.status(409).json({ error: "Username already exists" });
  }
  // Hash password
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  // Insert user with role
  await pool.query(
    "INSERT INTO users (username, password_hash, role, created_at) VALUES ($1, $2, $3, now())",
    [username, hash, role]
  );
  return res.status(201).json({ success: true, message: "User registered" });
}
