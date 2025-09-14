import { useToastStore } from "../state";

export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  return {
    success: (message: string, duration?: number) =>
      addToast({ message, type: "success", duration }),

    error: (message: string, duration?: number) =>
      addToast({ message, type: "error", duration }),

    warning: (message: string, duration?: number) =>
      addToast({ message, type: "warning", duration }),

    info: (message: string, duration?: number) =>
      addToast({ message, type: "info", duration }),
  };
};
