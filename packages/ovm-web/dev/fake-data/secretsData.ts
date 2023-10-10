import { faker } from "@faker-js/faker";

import { defaultDataLength } from "../constants";

export const secretsData = (_page?: number, count = defaultDataLength) => {
  return faker.datatype.array(count).map(() => ({
    id: faker.datatype.uuid(),
    icon: faker.image.abstract(64, 64),
    platform: faker.random.words(2),
    object: faker.random.words(2),
  }));
};
