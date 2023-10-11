import { LanguageEnum, ThemeEnum } from "~/routes/Settings/Preferences";

export const preferencesData = () => {
  return {
    language: LanguageEnum.English,
    theme: ThemeEnum.Auto,
  };
};
