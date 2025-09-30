import { apiClient } from "../../lib/apiClient";
import type { SystemStats, Device } from "../../types";

// Re-export types for backward compatibility
export type { SystemStats, Device };

export const systemApi = {
  getStats: async (): Promise<SystemStats> => {
    const response = await apiClient.get<SystemStats>("/system/stats");
    return response.data;
  },

  getDevices: async (): Promise<Device[]> => {
    const response = await apiClient.get<Device[]>("/devices");
    return response.data;
  },

  getDevice: async (id: string): Promise<Device> => {
    const response = await apiClient.get<Device>(`/devices/${id}`);
    return response.data;
  },

  updateDevice: async (
    id: string,
    updates: Partial<Device>
  ): Promise<Device> => {
    const response = await apiClient.patch<Device>(`/devices/${id}`, updates);
    return response.data;
  },
};
