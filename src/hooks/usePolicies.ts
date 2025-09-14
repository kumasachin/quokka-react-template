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

interface ApiError {
  success: false;
  error: string;
  message: string;
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
    }): Promise<PolicyResponse> => {
      const response = await apiClient.put(`/policies/${id}`, updates);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      queryClient.setQueryData(["policies", variables.id], data);
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
    onSuccess: () => {
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
