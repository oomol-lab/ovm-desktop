import { faker } from "@faker-js/faker";

import { defaultDataLength } from "../constants";

export const safetyRecordData = (_page?: number, count = defaultDataLength) => {
  return faker.datatype.array(count).map(() => ({
    key: faker.datatype.uuid(),
    detail: faker.lorem.sentence(5),
    ip: faker.internet.ip(),
    time: faker.date.recent().toLocaleString(),
  }));
};
