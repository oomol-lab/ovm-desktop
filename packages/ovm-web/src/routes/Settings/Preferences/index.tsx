import styles from "./Preferences.module.scss";

import type { RadioChangeEvent } from "antd";

import { Radio } from "antd";
import { useState } from "react";
import { useVal } from "use-value-enhancer";
import { useTranslate } from "val-i18n-react";
import { Appearance } from "~/constants";
import { useAppContext } from "~/hooks";

import autoSVG from "../images/auto.svg";
import darkSVG from "../images/dark.svg";
import lightSVG from "../images/light.svg";

export enum LanguageEnum {
  English = "en",
  Chinese = "zh-CN",
}

export type PreferencesDataType = {
  language: LanguageEnum;
};

export const Preferences = () => {
  const t = useTranslate();
  const { appearance$ } = useAppContext();
  const appearance = useVal(appearance$);
  const [language, setLanguage] = useState<LanguageEnum>(LanguageEnum.English);

  const onLanguageChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setLanguage(e.target.value as LanguageEnum);
  };
  const onAppearanceChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    appearance$.set(e.target.value as Appearance);
  };

  return (
    <div className={styles["preference-container"]}>
      <div className={styles.section}>
        <div className={styles["section-title"]}>{t("settings.language")}</div>
        <Radio.Group
          onChange={onLanguageChange}
          defaultValue={language}
          value={language}
        >
          <Radio value={LanguageEnum.English}>English</Radio>
          <Radio value={LanguageEnum.Chinese}>中文</Radio>
        </Radio.Group>
      </div>
      <div className={styles.section}>
        <div className={styles["section-title"]}>{t("settings.theme")}</div>
        <div className={styles["appearance-picker-container"]}>
          <Radio.Group
            name="appearance"
            value={appearance}
            onChange={onAppearanceChange}
          >
            <Radio value={Appearance.Dark}>
              <div className={styles["appearance-picker-option"]}>
                <img src={darkSVG} />
                <span>{t("settings.dark")}</span>
              </div>
            </Radio>
            <Radio value={Appearance.Light}>
              <div className={styles["appearance-picker-option"]}>
                <img src={lightSVG} />
                <span>{t("settings.light")}</span>
              </div>
            </Radio>
            <Radio value={Appearance.Auto}>
              <div className={styles["appearance-picker-option"]}>
                <img src={autoSVG} />
                <span>{t("settings.system")}</span>
              </div>
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};
