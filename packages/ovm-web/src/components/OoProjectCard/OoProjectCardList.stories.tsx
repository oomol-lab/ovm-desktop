import type { OoProjectCardListProps } from "./OoProjectCardList";
import type { Meta, StoryObj } from "@storybook/react";

import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

import { OoProjectCardList } from "./OoProjectCardList";

const storyMeta: Meta = {
  title: "OoProjectCard/OoProjectCardList",
  component: OoProjectCardList,
};

export default storyMeta;

export const OverView: StoryObj<OoProjectCardListProps> = {
  render: () => {
    const [loading, setLoading] = useState<boolean>(true);

    const cardList = faker.datatype.array(10).map(() => ({
      id: faker.datatype.uuid(),
      name: faker.random.words(3),
      user: faker.name.firstName(),
      createTime: faker.datatype.datetime(),
      description: faker.random.words(12),
    }));

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, [loading]);

    return (
      <div style={{ width: "100%" }}>
        <OoProjectCardList cardList={cardList} loading={loading} />
      </div>
    );
  },
};
