import type { Meta, StoryObj } from "@storybook/react";

import { OoProjectCardSkeleton } from "./OoProjectCardSkeleton";

const storyMeta: Meta = {
  title: "OoProject/OoProjectCardSkeleton",
  component: OoProjectCardSkeleton,
};

export default storyMeta;

export const OverView: StoryObj = {
  render: () => (
    <div style={{ width: 300 }}>
      <OoProjectCardSkeleton />
    </div>
  ),
};
