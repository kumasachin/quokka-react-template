import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../components/atoms/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Design System/Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "default"],
    },
    labelPlacement: {
      control: "select",
      options: ["start", "end", "top", "bottom"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checkboxLabel: "Accept terms and conditions",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checkboxLabel: "Remember me",
    checked: true,
  },
};

export const Secondary: Story = {
  args: {
    checkboxLabel: "Subscribe to newsletter",
    checked: false,
    color: "secondary",
  },
};

export const LabelStart: Story = {
  args: {
    checkboxLabel: "Enable feature",
    checked: true,
    labelPlacement: "start",
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};
