import { faker } from "@faker-js/faker";

export const profileData = () => {
  return {
    avatar: faker.image.avatar(),
    nickName: faker.name.firstName(),
  };
};
