import type { Meta, StoryObj } from "@storybook/react";

import Stimulus from "./Stimulus";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "StepWise/Stimulus",
  component: Stimulus,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: "color" },
  },
} satisfies Meta<typeof Stimulus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default",
    color: "blue",
    size: "large",
    style: {
      border: "1px solid black",
    },
  },
};
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
