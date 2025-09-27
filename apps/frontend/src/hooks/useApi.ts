import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { patchApi, firewallApi, type FirewallRule } from "../api";

export const usePatches = () => {
  return useQuery({
    queryKey: ["patches"],
    queryFn: patchApi.getPatches,
  });
};

export const useInstallPatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchApi.installPatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patches"] });
    },
  });
};

export const useFirewallRules = () => {
  return useQuery({
    queryKey: ["firewall", "rules"],
    queryFn: firewallApi.getRules,
  });
};

export const useCreateFirewallRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: firewallApi.createRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["firewall", "rules"] });
    },
  });
};

export const useUpdateFirewallRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<FirewallRule>;
    }) => firewallApi.updateRule(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["firewall", "rules"] });
    },
  });
};

export const useDeleteFirewallRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: firewallApi.deleteRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["firewall", "rules"] });
    },
  });
};
