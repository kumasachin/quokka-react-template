import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../components/atoms/Card";
import { Typography } from "../components/atoms/Typography";
import { CardContent } from "@mui/material";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    elevation: {
      control: { type: "range", min: 0, max: 24, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Default Card
        </Typography>
        <Typography variant="body2">
          This is a default card with elevation 2. Perfect for displaying
          content with subtle depth.
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const HighElevation: Story = {
  render: () => (
    <Card elevation={8} sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          High Elevation
        </Typography>
        <Typography variant="body2">
          This card has higher elevation for more dramatic shadow.
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const NoElevation: Story = {
  render: () => (
    <Card
      elevation={0}
      sx={{ maxWidth: 345, border: 1, borderColor: "divider" }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Flat Card
        </Typography>
        <Typography variant="body2">
          This card has no elevation, just a border.
        </Typography>
      </CardContent>
    </Card>
  ),
};
