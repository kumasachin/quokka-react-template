import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "../../components";
import { Policy } from "@mui/icons-material";

const meta: Meta<typeof EmptyState> = {
  title: "Design System/Molecules/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A reusable empty state component for displaying messages when no data is available.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The main heading text",
    },
    description: {
      control: { type: "text" },
      description: "The descriptive text below the title",
    },
    icon: {
      control: { type: "boolean" },
      description: "Whether to show an icon",
      mapping: {
        true: <Policy sx={{ fontSize: 48, color: "text.disabled" }} />,
        false: undefined,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Basic: Story = {
  args: {
    title: "No policies found",
    description: "Get started by creating your first security policy.",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Policy sx={{ fontSize: 48, color: "text.disabled" }} />,
    title: "No policies found",
    description: "Get started by creating your first security policy.",
  },
};

export const WithAction: Story = {
  args: {
    icon: <Policy sx={{ fontSize: 48, color: "text.disabled" }} />,
    title: "No policies found",
    description: "Get started by creating your first security policy.",
    action: {
      label: "Create First Policy",
      onClick: () => alert("Create policy clicked!"),
    },
  },
};

export const FilteredEmptyState: Story = {
  args: {
    icon: <Policy sx={{ fontSize: 48, color: "text.disabled" }} />,
    title: "No security policies found",
    description:
      "No policies match your current filter criteria. Try adjusting your filters or create a new security policy.",
    action: {
      label: "Clear Filters",
      onClick: () => alert("Clear filters clicked!"),
    },
  },
};
