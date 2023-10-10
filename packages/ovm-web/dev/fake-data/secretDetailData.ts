import { faker } from "@faker-js/faker";

import { defaultDataLength } from "../constants";

export const secretDetailData = (_page?: number, count = defaultDataLength) => {
  return faker.datatype.array(count).map((_, index) => ({
    key: index,
    name: faker.random.words(2),
    password: faker.random.words(5),
  }));
};
