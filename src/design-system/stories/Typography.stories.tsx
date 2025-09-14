import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../components/Typography";

const meta: Meta<typeof Typography> = {
  title: "Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "button",
        "caption",
      ],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "textPrimary",
        "textSecondary",
        "error",
        "warning",
        "info",
        "success",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
  },
};

export const Body1: Story = {
  args: {
    variant: "body1",
    children:
      "This is body text. It's the default text style for paragraphs and most content.",
  },
};

export const Body2: Story = {
  args: {
    variant: "body2",
    children: "This is smaller body text, useful for secondary information.",
  },
};

export const Primary: Story = {
  args: {
    variant: "h4",
    color: "primary",
    children: "Primary Color Text",
  },
};

export const Error: Story = {
  args: {
    variant: "body1",
    color: "error",
    children: "Error message text",
  },
};
