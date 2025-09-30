import React from "react";
import { Box, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionProps,
  AccordionSummaryProps,
  AccordionDetailsProps,
} from "../atoms";
import { StatusChip, StatusType } from "./StatusChip";
import { PriorityChip, PriorityType } from "./PriorityChip";

export interface ExpandableCardProps extends Omit<AccordionProps, "children"> {
  title: string;
  status?: StatusType;
  priority?: PriorityType;
  summaryContent?: React.ReactNode;
  children: React.ReactNode;
  summaryProps?: Partial<AccordionSummaryProps>;
  detailsProps?: Partial<AccordionDetailsProps>;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  status,
  priority,
  summaryContent,
  children,
  summaryProps,
  detailsProps,
  ...accordionProps
}) => {
  return (
    <Accordion {...accordionProps}>
      <AccordionSummary expandIcon={<ExpandMore />} {...summaryProps}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {status && <StatusChip status={status} />}
          {priority && <PriorityChip priority={priority} />}
          {summaryContent}
        </Box>
      </AccordionSummary>
      <AccordionDetails {...detailsProps}>{children}</AccordionDetails>
    </Accordion>
  );
};
