#!/usr/bin/env node
// Simple script to run schema and seed against DATABASE_URL
import fs from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schema = fs.readFileSync(
  path.join(__dirname, "..", "db", "schema.sql"),
  "utf8"
);
const seed = fs.readFileSync(
  path.join(__dirname, "..", "db", "seed.sql"),
  "utf8"
);

if (!process.env.DATABASE_URL) {
  console.error("Please set DATABASE_URL environment variable");
  process.exit(1);
}

console.log("Applying schema...");
execSync(`psql "$DATABASE_URL" -c "${schema.replace(/\n/g, " ")}"`, {
  stdio: "inherit",
  env: process.env,
});
console.log("Applying seed...");
execSync(`psql "$DATABASE_URL" -c "${seed.replace(/\n/g, " ")}"`, {
  stdio: "inherit",
  env: process.env,
});
console.log("Done.");
