import { http, HttpResponse } from "msw";
import { mockSystemStats, mockDevices, Device } from "../data/system";

const devices: Device[] = [...mockDevices];

export const systemHandlers = [
  http.get("/api/system/stats", () => {
    return HttpResponse.json(mockSystemStats);
  }),

  http.get("/api/devices", () => {
    return HttpResponse.json(devices);
  }),

  http.get("/api/devices/:id", ({ params }) => {
    const { id } = params;
    const device = devices.find((d) => d.id === id);

    if (!device) {
      return HttpResponse.json(
        {
          success: false,
          error: "Device not found",
          message: `Device with ID ${id} does not exist`,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(device);
  }),

  http.patch("/api/devices/:id", async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<Device>;

    const deviceIndex = devices.findIndex((d) => d.id === id);

    if (deviceIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          error: "Device not found",
          message: `Device with ID ${id} does not exist`,
        },
        { status: 404 }
      );
    }

    const updatedDevice = {
      ...devices[deviceIndex],
      ...updates,
      lastSeen: new Date().toISOString(),
    };

    devices[deviceIndex] = updatedDevice;

    return HttpResponse.json(updatedDevice);
  }),
];
