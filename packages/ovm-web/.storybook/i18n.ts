import { I18n } from "val-i18n";
import en from "../src/locales/en.json";
import zhCN from "../src/locales/zh-CN.json";

export const i18n = new I18n(
  "en",
  {
    en,
    ["zh-CN"]: zhCN,
  },
  {
    fetcher: lang =>
      import(`../src/locales/${lang}.json`).then(module => module.default),
  }
);
