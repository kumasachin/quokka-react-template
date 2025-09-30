import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  CardProps,
} from "@mui/material";
import { Button } from "../atoms";
import { Edit, Delete } from "@mui/icons-material";
import { StatusChip, StatusType } from "./StatusChip";
import { PriorityChip, PriorityType } from "./PriorityChip";

export interface PolicyCardProps extends Omit<CardProps, "children"> {
  id: string;
  name: string;
  description: string;
  type: string;
  status: StatusType;
  priority: PriorityType;
  rulesCount?: number;
  updatedAt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusToggle?: () => void;
  isUpdating?: boolean;
}

export const PolicyCard: React.FC<PolicyCardProps> = ({
  id,
  name,
  description,
  type,
  status,
  priority,
  rulesCount = 0,
  updatedAt,
  onEdit,
  onDelete,
  onStatusToggle,
  isUpdating = false,
  sx,
  ...cardProps
}) => {
  return (
    <Card
      component="article"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        ...sx,
      }}
      data-testid={`policy-card-${id}`}
      {...cardProps}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              color: "text.primary",
              flex: 1,
              mr: 2,
            }}
            data-testid={`policy-name-${id}`}
          >
            {name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              textTransform: "capitalize",
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              backgroundColor: "action.hover",
              color: "text.secondary",
            }}
            data-testid={`policy-type-${id}`}
          >
            {type}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            lineHeight: 1.5,
            minHeight: "3em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
          <StatusChip status={status} data-testid={`policy-status-${id}`} />
          <PriorityChip
            priority={priority}
            data-testid={`policy-priority-${id}`}
          />
        </Box>

        {(rulesCount > 0 || updatedAt) && (
          <Box sx={{ mb: 3 }}>
            {rulesCount > 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  mb: 0.5,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {rulesCount} rule{rulesCount !== 1 ? "s" : ""} configured
              </Typography>
            )}
            {updatedAt && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  fontWeight: 400,
                }}
              >
                Last updated: {new Date(updatedAt).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            mt: "auto",
          }}
        >
          {onStatusToggle && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onStatusToggle}
              disabled={isUpdating}
              data-testid={`policy-status-toggle-${id}`}
              aria-label={`${
                status === "active" ? "Deactivate" : "Activate"
              } policy ${name}`}
            >
              {status === "active" ? "Deactivate" : "Activate"}
            </Button>
          )}

          {onEdit && (
            <IconButton
              size="small"
              onClick={onEdit}
              sx={{
                "&:hover": { backgroundColor: "action.hover" },
                borderRadius: 1.5,
              }}
              data-testid={`policy-edit-${id}`}
              aria-label={`Edit policy ${name}`}
            >
              <Edit fontSize="small" />
            </IconButton>
          )}

          {onDelete && (
            <IconButton
              size="small"
              onClick={onDelete}
              color="error"
              sx={{
                "&:hover": {
                  backgroundColor: "error.main",
                  color: "white",
                },
                borderRadius: 1.5,
              }}
              data-testid={`policy-delete-${id}`}
              aria-label={`Delete policy ${name}`}
            >
              <Delete fontSize="small" />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
