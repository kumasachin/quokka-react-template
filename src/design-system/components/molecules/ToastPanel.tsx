import React from "react";
import { Box, Portal, styled } from "@mui/material";
import { Toast } from "../atoms/Toast";
import { useToastStore } from "../../../state";

const ToastContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.snackbar,
  maxWidth: 400,
  width: "100%",
}));

export const ToastPanel = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <Portal>
      <ToastContainer
        role="region"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </ToastContainer>
    </Portal>
  );
};
