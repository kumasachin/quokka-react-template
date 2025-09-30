import { apiClient } from "../../lib";
import type {
  Policy,
  PoliciesResponse,
  PolicyResponse,
  UpdatePolicyPayload,
} from "../../types";

// Re-export types for backward compatibility
export type { Policy, PoliciesResponse, PolicyResponse, UpdatePolicyPayload };

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
