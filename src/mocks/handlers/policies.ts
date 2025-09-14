import { http, HttpResponse } from "msw";
import { mockPolicies, Policy } from "../data/policies";

let policies: Policy[] = [...mockPolicies];

export const policyHandlers = [
  http.get("/api/policies", ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");

    let filteredPolicies = policies;

    if (type) {
      filteredPolicies = policies.filter((policy) => policy.type === type);
    }

    return HttpResponse.json({
      success: true,
      data: filteredPolicies,
      total: filteredPolicies.length,
      filters: type ? { type } : null,
    });
  }),

  http.get("/api/policies/:id", ({ params }) => {
    const { id } = params;
    const policy = policies.find((p) => p.id === id);

    if (!policy) {
      return HttpResponse.json(
        {
          success: false,
          error: "Policy not found",
          message: `Policy with ID ${id} does not exist`,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: policy,
    });
  }),

  http.put("/api/policies/:id", async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<Policy>;

    const policyIndex = policies.findIndex((p) => p.id === id);

    if (policyIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          error: "Policy not found",
          message: `Policy with ID ${id} does not exist`,
        },
        { status: 404 }
      );
    }

    const updatedPolicy = {
      ...policies[policyIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    policies[policyIndex] = updatedPolicy;

    return HttpResponse.json({
      success: true,
      data: updatedPolicy,
      message: "Policy updated successfully",
    });
  }),

  http.post("/api/policies", async ({ request }) => {
    const newPolicyData = (await request.json()) as Omit<
      Policy,
      "id" | "createdAt" | "updatedAt"
    >;

    const newPolicy: Policy = {
      ...newPolicyData,
      id: `${newPolicyData.type}-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    policies.push(newPolicy);

    return HttpResponse.json(
      {
        success: true,
        data: newPolicy,
        message: "Policy created successfully",
      },
      { status: 201 }
    );
  }),

  http.delete("/api/policies/:id", ({ params }) => {
    const { id } = params;
    const policyIndex = policies.findIndex((p) => p.id === id);

    if (policyIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          error: "Policy not found",
          message: `Policy with ID ${id} does not exist`,
        },
        { status: 404 }
      );
    }

    const deletedPolicy = policies.splice(policyIndex, 1)[0];

    return HttpResponse.json({
      success: true,
      data: deletedPolicy,
      message: "Policy deleted successfully",
    });
  }),
];
