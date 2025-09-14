import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "../components/atoms/TextField";

const meta: Meta<typeof TextField> = {
  title: "TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "standard"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default TextField",
    placeholder: "Enter text here...",
  },
};

export const WithHelper: Story = {
  args: {
    label: "With Helper Text",
    helperText: "This is helper text",
    placeholder: "Type something...",
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    required: true,
    helperText: "This field is required",
  },
};

export const Error: Story = {
  args: {
    label: "Error State",
    error: true,
    helperText: "Something went wrong",
    value: "Invalid value",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    disabled: true,
    value: "This field is disabled",
  },
};
