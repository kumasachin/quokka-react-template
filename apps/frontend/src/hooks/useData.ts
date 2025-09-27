import { useQuery } from "@tanstack/react-query";
import { systemApi, type SystemStats, type Device } from "../api";

const mockStats = async (): Promise<SystemStats> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    devices: Math.floor(Math.random() * 50) + 20,
    patches: Math.floor(Math.random() * 10) + 5,
    threats: Math.floor(Math.random() * 3),
    uptime: `${Math.floor(Math.random() * 30) + 1} days`,
  };
};

const mockDevices = async (): Promise<Device[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    { id: "1", name: "Server-01", status: "online", lastSeen: "2 min ago" },
    {
      id: "2",
      name: "Workstation-05",
      status: "online",
      lastSeen: "5 min ago",
    },
    {
      id: "3",
      name: "Router-Main",
      status: "maintenance",
      lastSeen: "1 hour ago",
    },
    {
      id: "4",
      name: "Firewall-Primary",
      status: "online",
      lastSeen: "1 min ago",
    },
  ];
};

const fetchSystemStats = async (): Promise<SystemStats> => {
  try {
    return await systemApi.getStats();
  } catch {
    return mockStats();
  }
};

const fetchDevices = async (): Promise<Device[]> => {
  try {
    return await systemApi.getDevices();
  } catch {
    return mockDevices();
  }
};

export const useSystemStats = () => {
  return useQuery({
    queryKey: ["systemStats"],
    queryFn: fetchSystemStats,
    staleTime: 30000,
  });
};

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });
};
