import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../components/atoms/Switch";

const meta: Meta<typeof Switch> = {
  title: "Design System/Atoms/Switch",
  component: Switch,
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
    switchLabel: "Enable notifications",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    switchLabel: "Auto-update enabled",
    checked: true,
  },
};

export const Secondary: Story = {
  args: {
    switchLabel: "Dark mode",
    checked: true,
    color: "secondary",
  },
};

export const LabelStart: Story = {
  args: {
    switchLabel: "Enable feature",
    checked: false,
    labelPlacement: "start",
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: true,
  },
};
