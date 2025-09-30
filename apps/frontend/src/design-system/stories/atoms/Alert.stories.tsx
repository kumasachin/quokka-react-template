import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "../../components";

const meta: Meta<typeof Alert> = {
  title: "Design System/Atoms/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A notification component for displaying important messages to users.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    severity: {
      control: { type: "select" },
      options: ["error", "warning", "info", "success"],
      description: "The severity of the alert",
    },
    variant: {
      control: { type: "select" },
      options: ["standard", "filled", "outlined"],
      description: "The variant of the alert",
    },
    children: {
      control: { type: "text" },
      description: "The content of the alert",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Error: Story = {
  args: {
    severity: "error",
    children: "This is an error alert — check it out!",
  },
};

export const Warning: Story = {
  args: {
    severity: "warning",
    children: "This is a warning alert — check it out!",
  },
};

export const Info: Story = {
  args: {
    severity: "info",
    children: "This is an info alert — check it out!",
  },
};

export const Success: Story = {
  args: {
    severity: "success",
    children: "This is a success alert — check it out!",
  },
};

export const Filled: Story = {
  args: {
    severity: "info",
    variant: "filled",
    children: "This is a filled alert — check it out!",
  },
};

export const Outlined: Story = {
  args: {
    severity: "warning",
    variant: "outlined",
    children: "This is an outlined alert — check it out!",
  },
};
