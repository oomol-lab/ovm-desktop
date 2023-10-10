import { faker } from "@faker-js/faker";

import { defaultDataLength } from "../constants";

export const loginDeviceData = (_page?: number, count = defaultDataLength) => {
  return faker.datatype.array(count).map(() => ({
    key: faker.datatype.uuid(),
    address: faker.address.city(),
    ip: faker.internet.ip(),
    state: faker.datatype.boolean(),
    time: faker.date.recent().toLocaleString(),
    device: "Desktop on macOS",
  }));
};
