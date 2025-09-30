// Policy-related types and enums
export type PolicyType =
  | "security"
  | "firewall"
  | "access"
  | "backup"
  | "compliance";
export type PolicyStatus = "active" | "inactive" | "draft";
export type PolicyPriority = "low" | "medium" | "high" | "critical";
export type PolicyRuleAction =
  | "allow"
  | "deny"
  | "enforce"
  | "require_mfa"
  | "backup"
  | "archive"
  | "delete"
  | "encrypt"
  | "retain";

export interface PolicyRule {
  id: string;
  condition: string;
  action: PolicyRuleAction;
  enabled: boolean;
}

export interface Policy {
  id: string;
  name: string;
  type: PolicyType;
  description: string;
  status: PolicyStatus;
  priority: PolicyPriority;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  rules: PolicyRule[];
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

// Form-related policy types (inferred from schemas)
export interface PolicyFormData {
  name: string;
  type: string;
  description: string;
  status: string;
  priority: string;
  enabled: boolean;
  rules: PolicyRule[];
}

export interface CreatePolicyData {
  name: string;
  type: PolicyType;
  description: string;
  status: PolicyStatus;
  priority: PolicyPriority;
  rules: PolicyRule[];
  createdBy: string;
}

export interface UpdatePolicyData {
  id: string;
  name?: string;
  type?: PolicyType;
  description?: string;
  status?: PolicyStatus;
  priority?: PolicyPriority;
  enabled?: boolean;
  rules?: PolicyRule[];
}
