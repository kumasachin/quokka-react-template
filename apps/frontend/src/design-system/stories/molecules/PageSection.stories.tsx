import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageSection } from "../../components";

const meta: Meta<typeof PageSection> = {
  title: "Design System/Molecules/PageSection",
  component: PageSection,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A reusable section component with consistent styling variants for elevated content areas.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "elevated", "outlined"],
      description: "The visual style variant of the section",
    },
    children: {
      control: { type: "text" },
      description: "The content to display inside the section",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageSection>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "This is a default page section with standard styling.",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <div>
        <h3>Elevated Section</h3>
        <p>
          This section has elevated styling with background, border, and shadow.
        </p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: (
      <div>
        <h3>Outlined Section</h3>
        <p>This section has outlined styling with border but no shadow.</p>
      </div>
    ),
  },
};

export const WithControls: Story = {
  args: {
    variant: "elevated",
    children: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <h4>Policy Management</h4>
          <p>Manage your security policies</p>
        </div>
        <button
          style={{
            padding: "0.5rem 1rem",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Create Policy
        </button>
      </div>
    ),
  },
};
