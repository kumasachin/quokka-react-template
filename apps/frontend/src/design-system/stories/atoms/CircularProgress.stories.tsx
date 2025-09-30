import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircularProgress } from "../../components";

const meta: Meta<typeof CircularProgress> = {
  title: "Design System/Atoms/CircularProgress",
  component: CircularProgress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A circular progress indicator for showing loading states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number" },
      description: "The size of the progress indicator",
    },
    thickness: {
      control: { type: "number" },
      description: "The thickness of the progress indicator",
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "inherit"],
      description: "The color of the progress indicator",
    },
    variant: {
      control: { type: "select" },
      options: ["determinate", "indeterminate"],
      description: "The variant of the progress indicator",
    },
    value: {
      control: { type: "number", min: 0, max: 100 },
      description:
        "The value of the progress indicator (for determinate variant)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Indeterminate: Story = {
  args: {
    variant: "indeterminate",
  },
};

export const Determinate: Story = {
  args: {
    variant: "determinate",
    value: 75,
  },
};

export const Small: Story = {
  args: {
    size: 20,
    variant: "indeterminate",
  },
};

export const Large: Story = {
  args: {
    size: 60,
    variant: "indeterminate",
  },
};

export const Thick: Story = {
  args: {
    thickness: 8,
    variant: "indeterminate",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    variant: "indeterminate",
  },
};
