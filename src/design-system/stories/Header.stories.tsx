import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../components/molecules/Header";
import { Box } from "@mui/material";
import { Security, Settings, Dashboard, BugReport } from "@mui/icons-material";

const headerMeta: Meta<typeof Header> = {
  title: "Molecules/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },
  tags: ["auto-docs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    gutterBottom: {
      control: { type: "boolean" },
    },
  },
};

export default headerMeta;
type HeaderStory = StoryObj<typeof headerMeta>;

export const BasicHeader: HeaderStory = {
  args: {
    title: "Default Header",
  },
};

export const HeaderWithSubtitle: HeaderStory = {
  args: {
    title: "Page Title",
    subtitle: "This is a subtitle that provides additional context",
  },
};

export const LargePageHeader: HeaderStory = {
  args: {
    title: "Main Page Title",
    subtitle: "Large header for primary pages",
    level: 1,
  },
};

export const SectionHeader: HeaderStory = {
  args: {
    title: "Section Title",
    subtitle: "Medium header for sections",
    level: 2,
  },
};

export const SubsectionHeader: HeaderStory = {
  args: {
    title: "Subsection Title",
    subtitle: "Smaller header for subsections",
    level: 4,
  },
};

export const CenterAlignedHeader: HeaderStory = {
  args: {
    title: "Centered Header",
    subtitle: "This header is center-aligned",
    align: "center",
  },
};

export const RightAlignedHeader: HeaderStory = {
  args: {
    title: "Right-Aligned Header",
    subtitle: "This header is right-aligned",
    align: "right",
  },
};

export const DeviceManagementPage: HeaderStory = {
  args: {
    title: "Device Management",
    subtitle: "Monitor and manage all your network devices",
    prefix: <Dashboard sx={{ color: "primary.main" }} />,
  },
};

export const PatchManagementPage: HeaderStory = {
  args: {
    title: "Patch Management",
    subtitle: "Keep your systems up-to-date with security patches",
    prefix: <BugReport sx={{ color: "warning.main" }} />,
  },
};

export const FirewallControlPage: HeaderStory = {
  args: {
    title: "Firewall Control",
    subtitle: "Configure and monitor firewall rules and policies",
    prefix: <Security sx={{ color: "error.main" }} />,
  },
};

export const SystemSettingsPage: HeaderStory = {
  args: {
    title: "System Settings",
    subtitle: "Configure your cybersecurity platform preferences",
    prefix: <Settings sx={{ color: "info.main" }} />,
  },
};

export const CompactHeaderLayout: HeaderStory = {
  args: {
    title: "Compact Header",
    subtitle: "Header without bottom margin",
    gutterBottom: false,
  },
};

export const CustomStyledHeader: HeaderStory = {
  args: {
    title: "Custom Styled Header",
    subtitle: "With custom background and padding",
    sx: {
      backgroundColor: "primary.light",
      padding: 2,
      borderRadius: 1,
      color: "primary.contrastText",
    },
    subtitleProps: {
      color: "primary.contrastText",
    },
  },
};

export const AllHeaderVariations: HeaderStory = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Header title="Level 1 Header" level={1} />
      <Header title="Level 2 Header" subtitle="With subtitle" level={2} />
      <Header title="Level 3 Header" subtitle="Default level" level={3} />
      <Header title="With Icon" prefix={<Security />} />
      <Header title="Center Aligned" align="center" />
      <Header title="Right Aligned" align="right" />
    </Box>
  ),
};
