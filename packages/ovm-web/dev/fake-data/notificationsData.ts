import { faker } from "@faker-js/faker";

import { defaultDataLength } from "../constants";

export const notificationsData = (
  _page?: number,
  count = defaultDataLength
) => {
  return faker.datatype.array(count).map(() => ({
    key: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    time: faker.date.recent(),
  }));
};
