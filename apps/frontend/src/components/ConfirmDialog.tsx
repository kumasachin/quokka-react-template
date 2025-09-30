import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "error" | "warning";
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  confirmColor = "error",
}) => {
  const { t } = useTranslation("policies");

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-testid="confirm-dialog"
      aria-labelledby="confirm-dialog-title"
    >
      <DialogTitle id="confirm-dialog-title" data-testid="confirm-dialog-title">
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" data-testid="confirm-dialog-message">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }} data-testid="confirm-dialog-actions">
        <Button
          onClick={onClose}
          variant="outlined"
          data-testid="confirm-dialog-cancel"
        >
          {cancelText || t("cancel")}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={confirmColor}
          data-testid="confirm-dialog-confirm"
        >
          {confirmText || t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
