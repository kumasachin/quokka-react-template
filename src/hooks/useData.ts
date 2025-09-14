import { useQuery } from "@tanstack/react-query";

interface SystemStats {
  devices: number;
  patches: number;
  threats: number;
  uptime: string;
}

const fetchSystemStats = async (): Promise<SystemStats> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    devices: Math.floor(Math.random() * 50) + 20,
    patches: Math.floor(Math.random() * 10) + 5,
    threats: Math.floor(Math.random() * 3),
    uptime: `${Math.floor(Math.random() * 30) + 1} days`,
  };
};

export const useSystemStats = () => {
  return useQuery({
    queryKey: ["systemStats"],
    queryFn: fetchSystemStats,
    staleTime: 30000,
  });
};

interface Device {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  lastSeen: string;
}

const fetchDevices = async (): Promise<Device[]> => {
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

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });
};
