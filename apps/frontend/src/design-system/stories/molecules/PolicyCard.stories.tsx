import type { Meta, StoryObj } from "@storybook/react-vite";
import { PolicyCard } from "../../components";

const meta: Meta<typeof PolicyCard> = {
  title: "Design System/Molecules/PolicyCard",
  component: PolicyCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A card component for displaying policy information with actions and status indicators.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "The policy name",
    },
    description: {
      control: { type: "text" },
      description: "The policy description",
    },
    type: {
      control: { type: "text" },
      description: "The policy type",
    },
    status: {
      control: { type: "select" },
      options: [
        "active",
        "inactive",
        "draft",
        "online",
        "offline",
        "maintenance",
      ],
      description: "The policy status",
    },
    priority: {
      control: { type: "select" },
      options: ["low", "medium", "high", "critical"],
      description: "The policy priority",
    },
    rulesCount: {
      control: { type: "number" },
      description: "Number of rules in the policy",
    },
    updatedAt: {
      control: { type: "text" },
      description: "Last updated timestamp",
    },
    isUpdating: {
      control: { type: "boolean" },
      description: "Whether the policy is being updated",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PolicyCard>;

export const Default: Story = {
  args: {
    id: "sec-001",
    name: "Password Policy",
    description: "Enforces strong password requirements across all systems",
    type: "security",
    status: "active",
    priority: "high",
    rulesCount: 5,
    updatedAt: "2025-09-14T15:30:00Z",
    onEdit: () => alert("Edit clicked"),
    onDelete: () => alert("Delete clicked"),
    onStatusToggle: () => alert("Status toggle clicked"),
  },
};

export const Inactive: Story = {
  args: {
    id: "fw-001",
    name: "Firewall Rules",
    description: "Network security rules for inbound and outbound traffic",
    type: "firewall",
    status: "inactive",
    priority: "medium",
    rulesCount: 12,
    updatedAt: "2025-09-10T10:15:00Z",
    onEdit: () => alert("Edit clicked"),
    onDelete: () => alert("Delete clicked"),
    onStatusToggle: () => alert("Status toggle clicked"),
  },
};

export const Draft: Story = {
  args: {
    id: "acc-001",
    name: "Access Control",
    description: "User access permissions and role-based security",
    type: "access",
    status: "draft",
    priority: "low",
    rulesCount: 0,
    updatedAt: "2025-09-20T08:45:00Z",
    onEdit: () => alert("Edit clicked"),
    onDelete: () => alert("Delete clicked"),
    onStatusToggle: () => alert("Status toggle clicked"),
  },
};

export const Critical: Story = {
  args: {
    id: "sec-002",
    name: "Critical Security Alert",
    description: "Immediate response required for security breach",
    type: "security",
    status: "active",
    priority: "critical",
    rulesCount: 8,
    updatedAt: "2025-09-29T22:10:00Z",
    onEdit: () => alert("Edit clicked"),
    onDelete: () => alert("Delete clicked"),
    onStatusToggle: () => alert("Status toggle clicked"),
  },
};

export const Updating: Story = {
  args: {
    id: "bak-001",
    name: "Backup Policy",
    description: "Automated backup schedules and retention policies",
    type: "backup",
    status: "active",
    priority: "medium",
    rulesCount: 3,
    updatedAt: "2025-09-28T14:20:00Z",
    isUpdating: true,
    onEdit: () => alert("Edit clicked"),
    onDelete: () => alert("Delete clicked"),
    onStatusToggle: () => alert("Status toggle clicked"),
  },
};
