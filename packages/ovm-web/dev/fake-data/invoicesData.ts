import { faker } from "@faker-js/faker";
import { InvoiceTypeEnum } from "~/routes/Settings/Bill";

import { defaultDataLength } from "../constants";

export const invoicesData = (_page?: number, count = defaultDataLength) => {
  return faker.datatype.array(count).map(() => ({
    key: faker.datatype.uuid(),
    invoice_type: faker.helpers.arrayElement(Object.values(InvoiceTypeEnum)),
    applicant: faker.random.words(5),
    application_time: faker.datatype.datetime(),
    operation: faker.internet.url(),
  }));
};
