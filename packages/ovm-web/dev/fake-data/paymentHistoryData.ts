import { faker } from "@faker-js/faker";

import { defaultDataLength } from "../constants";

export const paymentHistoryData = (
  _page?: number,
  count = defaultDataLength
) => {
  return faker.datatype.array(count).map(() => ({
    key: faker.datatype.uuid(),
    order_number: faker.datatype.number(8),
    content: faker.random.words(8),
    transaction_time: faker.datatype.datetime(),
    transaction_amount: faker.datatype.number(2),
    operation: faker.internet.url(),
  }));
};
