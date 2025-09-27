import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { server } from "../server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Policies API", () => {
  it("should return all policies when no type filter is provided", async () => {
    const response = await fetch("/api/policies");
    const data = await response.json();

    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.total).toBeGreaterThan(0);
    expect(data.filters).toBeNull();
  });

  it("should filter policies by type", async () => {
    const response = await fetch("/api/policies?type=security");
    const data = await response.json();

    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.filters).toEqual({ type: "security" });

    // All returned policies should be of type 'security'
    data.data.forEach((policy: any) => {
      expect(policy.type).toBe("security");
    });
  });

  it("should return a specific policy by ID", async () => {
    const response = await fetch("/api/policies/sec-001");
    const data = await response.json();

    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    expect(data.data.id).toBe("sec-001");
    expect(data.data.name).toBe("Password Policy");
  });

  it("should return 404 for non-existent policy", async () => {
    const response = await fetch("/api/policies/non-existent");
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Policy not found");
  });

  it("should update a policy successfully", async () => {
    const updates = {
      name: "Updated Password Policy",
      status: "inactive" as const,
    };

    const response = await fetch("/api/policies/sec-001", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();

    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    expect(data.data.name).toBe("Updated Password Policy");
    expect(data.data.status).toBe("inactive");
    expect(data.message).toBe("Policy updated successfully");
  });

  it("should return 404 when updating non-existent policy", async () => {
    const response = await fetch("/api/policies/non-existent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Updated Name" }),
    });

    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Policy not found");
  });
});
