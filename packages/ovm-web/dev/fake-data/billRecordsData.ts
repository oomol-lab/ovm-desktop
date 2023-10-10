import { faker } from "@faker-js/faker";
import { BillTypeEnum } from "~/routes/Settings/Bill";

import { defaultDataLength } from "../constants";

export const billRecordsData = (_page?: number, count = defaultDataLength) => {
  return faker.datatype.array(count).map(() => ({
    key: faker.datatype.uuid(),
    transaction_details: faker.random.words(3),
    transaction_type: faker.helpers.arrayElement(Object.values(BillTypeEnum)),
    transaction_time: faker.datatype.datetime(),
    transaction_amount: faker.datatype.number(8),
  }));
};
