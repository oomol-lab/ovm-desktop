import { faker } from "@faker-js/faker";

export const secretTitleData = () => {
  return {
    secretId: faker.datatype.uuid(),
    name: faker.random.words(2),
    icon: faker.image.abstract(64, 64),
    platform: faker.random.words(2),
  };
};
