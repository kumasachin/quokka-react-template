import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export const startMocking = async () => {
  // Only start mocking if explicitly enabled via environment variable
  // This allows switching between mock data and real API calls
  const enableMocking = import.meta.env.VITE_ENABLE_MOCKING === "true";

  if (
    enableMocking &&
    (import.meta.env.DEV || import.meta.env.MODE === "test")
  ) {
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
    console.log("🔧 Mock Service Worker started - using mock data");
  } else {
    console.log("🌐 Mock Service Worker disabled - using real API calls");
  }
};
