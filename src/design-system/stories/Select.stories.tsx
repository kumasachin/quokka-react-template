import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../components/atoms/Select";

const meta: Meta<typeof Select> = {
  title: "Design System/Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "standard"],
    },
    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldLabel: "Select an option",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    value: "",
  },
};

export const WithValue: Story = {
  args: {
    fieldLabel: "Policy Type",
    options: [
      { value: "security", label: "Security" },
      { value: "firewall", label: "Firewall" },
      { value: "access", label: "Access" },
      { value: "backup", label: "Backup" },
    ],
    value: "security",
  },
};

export const Filled: Story = {
  args: {
    fieldLabel: "Priority Level",
    variant: "filled",
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "critical", label: "Critical" },
    ],
    value: "medium",
  },
};
