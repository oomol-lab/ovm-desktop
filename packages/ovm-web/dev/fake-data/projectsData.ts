import { faker } from "@faker-js/faker";

import { defaultDataLength } from "../constants";

export const projectsData = (_page?: number, count = defaultDataLength) => {
  return faker.datatype.array(count).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.random.words(3),
    user: faker.name.firstName(),
    createTime: faker.datatype.datetime(),
    description: faker.random.words(12),
  }));
};
