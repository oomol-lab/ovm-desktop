import { faker } from "@faker-js/faker";

import { defaultDataLength } from "../constants";

export const secretTemplatesData = (
  _page?: number,
  count = defaultDataLength
) => {
  return faker.datatype.array(count).map(() => ({
    key: faker.datatype.uuid(),
    icon: faker.image.image(64, 64),
    title: faker.lorem.sentence(2),
  }));
};
