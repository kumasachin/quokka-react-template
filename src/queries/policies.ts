import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPolicies,
  updatePolicy,
  Policy,
  UpdatePolicyPayload,
} from "../api/policies";

export const usePolicies = (type?: string) => {
  return useQuery({
    queryKey: ["policies", type],
    queryFn: () => fetchPolicies(type),
  });
};

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePolicy,
    onMutate: async (payload: UpdatePolicyPayload) => {
      await queryClient.cancelQueries({ queryKey: ["policies"] });

      const previousPolicies = queryClient.getQueriesData({
        queryKey: ["policies"],
      });

      queryClient.setQueriesData({ queryKey: ["policies"] }, (old: any) => {
        if (!old?.data) return old;

        const updatedPolicies = old.data.map((policy: Policy) =>
          policy.id === payload.id
            ? {
                ...policy,
                ...payload.updates,
                updatedAt: new Date().toISOString(),
              }
            : policy
        );

        return { ...old, data: updatedPolicies };
      });

      return { previousPolicies };
    },
    onError: (err, payload, context) => {
      if (context?.previousPolicies) {
        context.previousPolicies.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
    },
  });
};
