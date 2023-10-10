import { faker } from "@faker-js/faker";

import { defaultDataLength } from "../constants";

export const linkAccountData = (_page?: number, count = defaultDataLength) => {
  return faker.datatype.array(count).map(() => ({
    key: faker.datatype.uuid(),
    state: faker.datatype.boolean(),
    icon: faker.image.abstract(64, 64),
    name: faker.random.words(1),
  }));
};
