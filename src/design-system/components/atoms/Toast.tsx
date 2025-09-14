import { Alert, IconButton, styled } from "@mui/material";
import { Close, CheckCircle, Error, Warning, Info } from "@mui/icons-material";
import { Toast as ToastType } from "../../../state";

const StyledAlert = styled(Alert)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(1),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: Error,
  warning: Warning,
  info: Info,
};

export const Toast = ({ toast, onClose }: ToastProps) => {
  const IconComponent = iconMap[toast.type as keyof typeof iconMap];

  return (
    <StyledAlert
      severity={toast.type}
      icon={<IconComponent />}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => onClose(toast.id)}
        >
          <Close fontSize="inherit" />
        </IconButton>
      }
    >
      {toast.message}
    </StyledAlert>
  );
};
