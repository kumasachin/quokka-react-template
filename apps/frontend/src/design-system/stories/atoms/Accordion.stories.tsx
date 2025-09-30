import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../components";
import { Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const meta: Meta<typeof Accordion> = {
  title: "Design System/Atoms/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An expandable panel component for displaying collapsible content sections.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    expanded: {
      control: { type: "boolean" },
      description: "Whether the accordion is expanded",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the accordion is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    expanded: false,
  },
  render: (args) => (
    <div>
      <Accordion {...args}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ),
};

export const Expanded: Story = {
  args: {
    expanded: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Expanded Accordion</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          This accordion is expanded by default. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
          blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Disabled Accordion</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          This accordion is disabled and cannot be expanded.
        </Typography>
      </AccordionDetails>
    </Accordion>
  ),
};
