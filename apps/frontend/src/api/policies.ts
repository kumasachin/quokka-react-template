import { apiClient } from "../lib";

export interface Policy {
  id: string;
  name: string;
  type: "security" | "firewall" | "access" | "backup" | "compliance";
  description: string;
  status: "active" | "inactive" | "draft";
  priority: "low" | "medium" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  rules: Array<{
    id: string;
    condition: string;
    action: string;
    enabled: boolean;
  }>;
}

export interface PoliciesResponse {
  success: boolean;
  data: Policy[];
  total: number;
  filters?: { type?: string } | null;
}

export interface PolicyResponse {
  success: boolean;
  data: Policy;
  message?: string;
}

export interface UpdatePolicyPayload {
  id: string;
  updates: Partial<Omit<Policy, "id" | "createdAt" | "updatedAt">>;
}

export const fetchPolicies = async (
  type?: string
): Promise<PoliciesResponse> => {
  const params = type ? `?type=${type}` : "";
  const response = await apiClient.get(`/policies${params}`);
  return response.data;
};

export const updatePolicy = async (
  payload: UpdatePolicyPayload
): Promise<PolicyResponse> => {
  const response = await apiClient.put(
    `/policies/${payload.id}`,
    payload.updates
  );
  return response.data;
};
