import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionProps as MuiAccordionProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps as MuiAccordionSummaryProps,
  AccordionDetails as MuiAccordionDetails,
  AccordionDetailsProps as MuiAccordionDetailsProps,
} from "@mui/material";

export interface AccordionProps extends MuiAccordionProps {}

export const Accordion = React.forwardRef<
  React.ElementRef<typeof MuiAccordion>,
  AccordionProps
>((props, ref) => {
  return <MuiAccordion ref={ref} {...props} />;
});

Accordion.displayName = "Accordion";

export interface AccordionSummaryProps extends MuiAccordionSummaryProps {}

export const AccordionSummary = React.forwardRef<
  React.ElementRef<typeof MuiAccordionSummary>,
  AccordionSummaryProps
>((props, ref) => {
  return <MuiAccordionSummary ref={ref} {...props} />;
});

AccordionSummary.displayName = "AccordionSummary";

export interface AccordionDetailsProps extends MuiAccordionDetailsProps {}

export const AccordionDetails = React.forwardRef<
  React.ElementRef<typeof MuiAccordionDetails>,
  AccordionDetailsProps
>((props, ref) => {
  return <MuiAccordionDetails ref={ref} {...props} />;
});

AccordionDetails.displayName = "AccordionDetails";
