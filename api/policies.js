// Vercel-style serverless endpoints for /api/policies
// This handler supports two modes:
// - If process.env.DATABASE_URL is provided, it will talk to a Postgres database (recommended for production)
// - Otherwise it falls back to an in-memory mock (useful for local/demo)

import { Pool } from "pg";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
// JWT secret (should match api/auth.js)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function verifyJWT(req, res) {
  const auth = req.headers["authorization"] || req.headers["Authorization"];
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return false;
  }
  const token = auth.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return true;
  } catch (e) {
    res.status(401).json({ error: "Invalid or expired token" });
    return false;
  }
}

const USE_DB = Boolean(process.env.DATABASE_URL);

// Cache pool on globalThis to avoid exhausting connections across serverless invocations
const GLOBAL_PG_POOL_KEY = "__CYBERSECURITY_PG_POOL";
function getPool() {
  if (!process.env.DATABASE_URL) return null;
  // @ts-ignore
  if (!globalThis[GLOBAL_PG_POOL_KEY]) {
    // eslint-disable-next-line no-undef
    globalThis[GLOBAL_PG_POOL_KEY] = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    });
  }
  // @ts-ignore
  return globalThis[GLOBAL_PG_POOL_KEY];
}

// In-memory fallback data
const mockPolicies = [
  {
    id: "sec-001",
    name: "Admin Access Policy",
    type: "security",
    description: "Allows admin users to access restricted endpoints.",
    status: "active",
    priority: "high",
    rules: [
      {
        id: "r1",
        condition: "user.role === 'admin'",
        action: "allow",
        enabled: true,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system@cybersecurity",
  },
  {
    id: "fw-002",
    name: "Default Firewall Rule",
    type: "firewall",
    description: "Block all inbound by default.",
    status: "draft",
    priority: "medium",
    rules: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system@cybersecurity",
  },
];

async function dbQuery(text, params) {
  const p = getPool();
  if (!p) throw new Error("Database pool is not initialized");
  const res = await p.query(text, params);
  return res;
}

async function fetchAllFromDb(type) {
  if (type) {
    const res = await dbQuery(
      "SELECT * FROM policies WHERE type = $1 ORDER BY created_at DESC",
      [type]
    );
    return res.rows;
  }
  const res = await dbQuery("SELECT * FROM policies ORDER BY created_at DESC");
  return res.rows;
}

async function fetchOneFromDb(id) {
  const res = await dbQuery("SELECT * FROM policies WHERE id = $1", [id]);
  return res.rows[0];
}

async function insertIntoDb(payload) {
  const id = payload.id || randomUUID();
  const now = new Date().toISOString();
  const rules = payload.rules
    ? JSON.stringify(payload.rules)
    : JSON.stringify([]);
  const q = `INSERT INTO policies(id, name, type, description, status, priority, rules, created_at, updated_at, created_by)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;
  const values = [
    id,
    payload.name,
    payload.type,
    payload.description,
    payload.status || "draft",
    payload.priority || "medium",
    rules,
    now,
    now,
    payload.createdBy || "user@cybersecurity.com",
  ];
  const res = await dbQuery(q, values);
  return res.rows[0];
}

async function updateInDb(id, updates) {
  const now = new Date().toISOString();
  // build a simple dynamic set clause
  const allowed = [
    "name",
    "type",
    "description",
    "status",
    "priority",
    "rules",
    "created_by",
  ];
  const sets = [];
  const vals = [];
  let idx = 1;
  for (const k of allowed) {
    if (Object.prototype.hasOwnProperty.call(updates, k)) {
      if (k === "rules") {
        vals.push(JSON.stringify(updates[k]));
      } else {
        vals.push(updates[k]);
      }
      sets.push(`${k === "created_by" ? "created_by" : k} = $${idx}`);
      idx++;
    }
  }
  if (sets.length === 0) {
    // only update timestamp
    await dbQuery("UPDATE policies SET updated_at = $1 WHERE id = $2", [
      now,
      id,
    ]);
    return fetchOneFromDb(id);
  }
  vals.push(now);
  vals.push(id);
  const q = `UPDATE policies SET ${sets.join(
    ", "
  )}, updated_at = $${idx} WHERE id = $${idx + 1} RETURNING *`;
  const res = await dbQuery(q, vals);
  return res.rows[0];
}

async function deleteFromDb(id) {
  const res = await dbQuery("DELETE FROM policies WHERE id = $1 RETURNING *", [
    id,
  ]);
  return res.rows[0];
}

function parseIdFromUrl(url) {
  const idMatch = url && url.match(/^\/api\/policies\/(.+)$/);
  return idMatch ? idMatch[1] : null;
}

export default async function handler(req, res) {
  const { method } = req;
  const url = req.url || "";
  const id = parseIdFromUrl(url);

  try {
    // Require JWT for write operations
    const needsAuth = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    if (needsAuth && !verifyJWT(req, res)) return;

    if (USE_DB) {
      // DB backed
      if (method === "GET" && url.startsWith("/api/policies")) {
        if (id) {
          const policy = await fetchOneFromDb(id);
          if (!policy)
            return res.status(404).json({ success: false, error: "Not found" });
          // convert rules JSON
          if (policy.rules && typeof policy.rules === "string") {
            try {
              policy.rules = JSON.parse(policy.rules);
            } catch (e) {
              policy.rules = [];
            }
          }
          return res.status(200).json({ success: true, data: policy });
        }
        const type = req.query && req.query.type;
        const rows = await fetchAllFromDb(type);
        // parse rules
        const data = rows.map((r) => ({
          ...r,
          rules: r.rules ? JSON.parse(r.rules) : [],
        }));
        return res.status(200).json({
          success: true,
          data,
          total: data.length,
          filters: type ? { type } : null,
        });
      }

      if (method === "POST" && url === "/api/policies") {
        const newPolicy = await insertIntoDb(req.body || {});
        newPolicy.rules = newPolicy.rules ? JSON.parse(newPolicy.rules) : [];
        return res
          .status(201)
          .json({ success: true, data: newPolicy, message: "Policy created" });
      }

      if ((method === "PUT" || method === "PATCH") && id) {
        const existing = await fetchOneFromDb(id);
        if (!existing)
          return res.status(404).json({ success: false, error: "Not found" });
        const updated = await updateInDb(id, req.body || {});
        updated.rules = updated.rules ? JSON.parse(updated.rules) : [];
        return res
          .status(200)
          .json({ success: true, data: updated, message: "Policy updated" });
      }

      if (method === "DELETE" && id) {
        const deleted = await deleteFromDb(id);
        if (!deleted)
          return res.status(404).json({ success: false, error: "Not found" });
        return res
          .status(200)
          .json({ success: true, data: deleted, message: "Policy deleted" });
      }

      res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
      return res
        .status(405)
        .json({ success: false, error: "Method not allowed" });
    }

    // Fallback: in-memory mock
    const policies = mockPolicies;
    if (method === "GET" && url.startsWith("/api/policies")) {
      if (id) {
        const policy = policies.find((p) => p.id === id);
        if (!policy) return res.status(404).json({ error: "Not found" });
        return res.status(200).json({ success: true, data: policy });
      }
      const type = req.query && req.query.type;
      const filtered = type
        ? policies.filter((p) => p.type === type)
        : policies;
      return res.status(200).json({
        success: true,
        data: filtered,
        total: filtered.length,
        filters: type ? { type } : null,
      });
    }

    if (method === "POST" && url === "/api/policies") {
      const body = req.body || {};
      const newPolicy = {
        id: `${(body.type || "pl").slice(0, 3)}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      policies.push(newPolicy);
      return res.status(201).json({ success: true, data: newPolicy });
    }

    if ((method === "PUT" || method === "PATCH") && id) {
      const existing = policies.find((p) => p.id === id);
      if (!existing) return res.status(404).json({ error: "Not found" });
      Object.assign(existing, req.body || {}, {
        updatedAt: new Date().toISOString(),
      });
      return res.status(200).json({ success: true, data: existing });
    }

    if (method === "DELETE" && id) {
      const idx = policies.findIndex((p) => p.id === id);
      if (idx === -1) return res.status(404).json({ error: "Not found" });
      const deleted = policies.splice(idx, 1)[0];
      return res.status(200).json({ success: true, data: deleted });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  } catch (err) {
    console.error("Policies handler error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: err.message,
    });
  }
}
