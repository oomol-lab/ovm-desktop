import { faker } from "@faker-js/faker";

export const upgradeData = () => {
  return {
    version: faker.system.semver(),
    isAutoUpdate: true,
    updateLog: faker.internet.url(),
    userAgreement: faker.internet.url(),
    privacyProtection: faker.internet.url(),
    openSource: faker.internet.url(),
  };
};
