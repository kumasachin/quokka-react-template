export interface SystemStats {
  devices: number;
  patches: number;
  threats: number;
  uptime: string;
}

export interface Device {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  lastSeen: string;
}

export const mockSystemStats: SystemStats = {
  devices: 24,
  patches: 3,
  threats: 0,
  uptime: "7 days, 14 hours, 32 minutes",
};

export const mockDevices: Device[] = [
  {
    id: "dev-001",
    name: "Web Server 01",
    status: "online",
    lastSeen: "2025-09-30T08:45:00Z",
  },
  {
    id: "dev-002",
    name: "Database Server",
    status: "online",
    lastSeen: "2025-09-30T08:42:00Z",
  },
  {
    id: "dev-003",
    name: "File Server",
    status: "maintenance",
    lastSeen: "2025-09-30T06:15:00Z",
  },
  {
    id: "dev-004",
    name: "Mail Server",
    status: "online",
    lastSeen: "2025-09-30T08:40:00Z",
  },
  {
    id: "dev-005",
    name: "Backup Server",
    status: "offline",
    lastSeen: "2025-09-29T22:30:00Z",
  },
];
