import { apiClient } from "../lib/apiClient";

export interface Patch {
  id: string;
  name: string;
  version: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "pending" | "installed" | "failed";
  releaseDate: string;
  description: string;
}

export interface FirewallRule {
  id: string;
  name: string;
  source: string;
  destination: string;
  port: string;
  protocol: "tcp" | "udp" | "icmp";
  action: "allow" | "deny";
  enabled: boolean;
}

export const patchApi = {
  getPatches: async (): Promise<Patch[]> => {
    const response = await apiClient.get<Patch[]>("/patches");
    return response.data;
  },

  installPatch: async (id: string): Promise<Patch> => {
    const response = await apiClient.post<Patch>(`/patches/${id}/install`);
    return response.data;
  },
};

export const firewallApi = {
  getRules: async (): Promise<FirewallRule[]> => {
    const response = await apiClient.get<FirewallRule[]>("/firewall/rules");
    return response.data;
  },

  createRule: async (rule: Omit<FirewallRule, "id">): Promise<FirewallRule> => {
    const response = await apiClient.post<FirewallRule>(
      "/firewall/rules",
      rule
    );
    return response.data;
  },

  updateRule: async (
    id: string,
    updates: Partial<FirewallRule>
  ): Promise<FirewallRule> => {
    const response = await apiClient.put<FirewallRule>(
      `/firewall/rules/${id}`,
      updates
    );
    return response.data;
  },

  deleteRule: async (id: string): Promise<void> => {
    await apiClient.delete(`/firewall/rules/${id}`);
  },
};
