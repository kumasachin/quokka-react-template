import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusChip, StatusType } from "../../components";

const meta: Meta<typeof StatusChip> = {
  title: "Design System/Molecules/StatusChip",
  component: StatusChip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A status indicator chip that displays different states with appropriate colors.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        "active",
        "inactive",
        "draft",
        "online",
        "offline",
        "maintenance",
      ] as StatusType[],
      description: "The status to display",
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
type Story = StoryObj<typeof StatusChip>;

export const Active: Story = {
  args: {
    status: "active",
    variant: "filled",
  },
};

export const Inactive: Story = {
  args: {
    status: "inactive",
    variant: "filled",
  },
};

export const Draft: Story = {
  args: {
    status: "draft",
    variant: "filled",
  },
};

export const Online: Story = {
  args: {
    status: "online",
    variant: "filled",
  },
};

export const Offline: Story = {
  args: {
    status: "offline",
    variant: "filled",
  },
};

export const Maintenance: Story = {
  args: {
    status: "maintenance",
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    status: "active",
    variant: "outlined",
  },
};

export const MediumSize: Story = {
  args: {
    status: "active",
    variant: "filled",
    size: "medium",
  },
};
