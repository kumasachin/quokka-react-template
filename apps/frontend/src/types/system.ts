// System-related types
export interface SystemStats {
  totalDevices: number;
  onlineDevices: number;
  pendingPatches: number;
  activeThreats: number;
  systemUptime: string;
}

export interface Device {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  lastSeen: string;
}

// Device status enum
export type DeviceStatus = Device["status"];
