import type { OoProjectCardProps } from "./OoProjectCard";
import type { Meta, StoryObj } from "@storybook/react";

import { faker } from "@faker-js/faker";

import { OoProjectCard } from "./OoProjectCard";

const storyMeta: Meta = {
  title: "OoProjectCard/OoProjectCardItem",
  component: OoProjectCard,
};

export default storyMeta;

export const OverView: StoryObj<OoProjectCardProps> = {
  args: {
    item: {
      id: faker.datatype.uuid(),
      name: faker.name.jobTitle(),
      user: faker.name.fullName(),
      createTime: faker.date.past(),
      description: faker.lorem.paragraph(),
      lastUpdateTime: faker.date.past().toString(),
      isLoading: false,
    },
  },
  render: ({ ...args }) => (
    <div style={{ width: 300 }}>
      <OoProjectCard item={args.item} />
    </div>
  ),
};
