import { faker } from "@faker-js/faker";
import {
  LanguageEnum,
  MessageOperationEnum,
  ThemeEnum,
} from "~/routes/Settings/Preferences";

export const preferencesData = () => {
  return {
    language: LanguageEnum.English,
    theme: ThemeEnum.Auto,
    reminder: {
      dynamic: faker.datatype.boolean(),
      blueDot: faker.datatype.boolean(),
    },
    notification: {
      follow: MessageOperationEnum.MessageAndMail,
      like: MessageOperationEnum.MessageAndMail,
      at: MessageOperationEnum.MessageAndMail,
      pending: MessageOperationEnum.MessageOnly,
      system: MessageOperationEnum.NotAccepting,
      other: MessageOperationEnum.MessageOnly,
    },
  };
};
