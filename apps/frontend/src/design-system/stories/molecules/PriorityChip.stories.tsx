import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriorityChip, PriorityType } from "../../components";

const meta: Meta<typeof PriorityChip> = {
  title: "Design System/Molecules/PriorityChip",
  component: PriorityChip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A priority indicator chip that displays different priority levels with appropriate colors.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    priority: {
      control: { type: "select" },
      options: ["low", "medium", "high", "critical"] as PriorityType[],
      description: "The priority level to display",
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined"],
      description: "The visual style variant",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
      description: "The size of the chip",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriorityChip>;

export const Low: Story = {
  args: {
    priority: "low",
    variant: "outlined",
  },
};

export const Medium: Story = {
  args: {
    priority: "medium",
    variant: "outlined",
  },
};

export const High: Story = {
  args: {
    priority: "high",
    variant: "outlined",
  },
};

export const Critical: Story = {
  args: {
    priority: "critical",
    variant: "outlined",
  },
};

export const Filled: Story = {
  args: {
    priority: "high",
    variant: "filled",
  },
};

export const MediumSize: Story = {
  args: {
    priority: "critical",
    variant: "outlined",
    size: "medium",
  },
};
