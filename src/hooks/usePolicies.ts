import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib";
import { Policy } from "../mocks/data/policies";

interface PoliciesResponse {
  success: boolean;
  data: Policy[];
  total: number;
  filters?: { type?: string } | null;
}

interface PolicyResponse {
  success: boolean;
  data: Policy;
  message?: string;
}

export const usePolicies = (type?: string) => {
  return useQuery({
    queryKey: ["policies", type],
    queryFn: async (): Promise<PoliciesResponse> => {
      const params = type ? `?type=${type}` : "";
      const response = await apiClient.get(`/policies${params}`);
      return response.data;
    },
  });
};

export const usePolicy = (id: string) => {
  return useQuery({
    queryKey: ["policies", id],
    queryFn: async (): Promise<PolicyResponse> => {
      const response = await apiClient.get(`/policies/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Policy>;
    }) => {
      const response = await apiClient.put(`/policies/${id}`, updates);
      return response.data;
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["policies"] });

      const previousPolicies = queryClient.getQueriesData({
        queryKey: ["policies"],
      });

      queryClient.setQueriesData<PoliciesResponse>(
        { queryKey: ["policies"] },
        (old) => {
          if (!old?.data) return old;

          const updatedPolicies = old.data.map((policy) =>
            policy.id === variables.id
              ? {
                  ...policy,
                  ...variables.updates,
                  updatedAt: new Date().toISOString(),
                }
              : policy
          );

          return { ...old, data: updatedPolicies };
        }
      );

      const previousPolicy = queryClient.getQueryData([
        "policies",
        variables.id,
      ]);

      queryClient.setQueryData<PolicyResponse>(
        ["policies", variables.id],
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: {
              ...old.data,
              ...variables.updates,
              updatedAt: new Date().toISOString(),
            },
          };
        }
      );

      return { previousPolicies, previousPolicy };
    },

    onError: (_err, variables, context) => {
      if (context?.previousPolicies) {
        context.previousPolicies.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      if (context?.previousPolicy) {
        queryClient.setQueryData(
          ["policies", variables.id],
          context.previousPolicy
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: ["policies", variables.id] });
      }
    },
  });
};

export const useCreatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      policyData: Omit<Policy, "id" | "createdAt" | "updatedAt">
    ): Promise<PolicyResponse> => {
      const response = await apiClient.post("/policies", policyData);
      return response.data;
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["policies"] });

      const previousPolicies = queryClient.getQueriesData({
        queryKey: ["policies"],
      });

      const optimisticPolicy: Policy = {
        ...variables,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueriesData<PoliciesResponse>(
        { queryKey: ["policies"] },
        (old) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: [optimisticPolicy, ...old.data],
            total: old.total + 1,
          };
        }
      );

      return { previousPolicies, optimisticPolicy };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousPolicies) {
        context.previousPolicies.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSuccess: (data, _variables, context) => {
      if (context?.optimisticPolicy && data?.data) {
        queryClient.setQueriesData<PoliciesResponse>(
          { queryKey: ["policies"] },
          (old) => {
            if (!old?.data) return old;

            const updatedData = old.data.map((policy) =>
              policy.id === context.optimisticPolicy.id ? data.data : policy
            );

            return { ...old, data: updatedData };
          }
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
    },
  });
};

export const useDeletePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<PolicyResponse> => {
      const response = await apiClient.delete(`/policies/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
    },
  });
};
