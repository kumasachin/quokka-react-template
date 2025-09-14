import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "../components/atoms/TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Design System/Atoms/TextArea",
  component: TextArea,
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
    label: "Description",
    placeholder: "Enter your description here...",
    value: "",
  },
};

export const WithValue: Story = {
  args: {
    label: "Policy Description",
    value:
      "This security policy ensures that all network access is properly authenticated and authorized.",
  },
};

export const Filled: Story = {
  args: {
    label: "Comments",
    variant: "filled",
    placeholder: "Add your comments...",
    value: "",
  },
};

export const CustomRows: Story = {
  args: {
    label: "Long Text",
    placeholder: "Enter a longer text...",
    minRows: 5,
    maxRows: 10,
    value: "",
  },
};
