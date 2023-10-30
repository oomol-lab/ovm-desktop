import styles from "./Preferences.module.scss";

import type { RadioChangeEvent } from "antd";

import { Radio } from "antd";
import { useVal } from "use-value-enhancer";
import { useI18n, useLang, useTranslate } from "val-i18n-react";
import { Appearance } from "~/constants";
import { useAppContext } from "~/hooks";

import autoSVG from "../images/auto.svg";
import darkSVG from "../images/dark.svg";
import lightSVG from "../images/light.svg";

export const Preferences = () => {
  const t = useTranslate();
  const { appearance$ } = useAppContext();
  const i18n = useI18n();
  const lang = useLang();
  const appearance = useVal(appearance$);

  const onLanguageChange = (e: RadioChangeEvent) => {
    i18n.switchLang(e.target.value);
  };
  const onAppearanceChange = (e: RadioChangeEvent) => {
    appearance$.set(e.target.value as Appearance);
  };

  return (
    <div className={styles["preference-container"]}>
      <div className={styles.section}>
        <div className={styles["section-title"]}>{t("settings.language")}</div>
        <Radio.Group onChange={onLanguageChange} value={lang}>
          <Radio value={"en"}>English</Radio>
          <Radio value={"zh-CN"}>中文</Radio>
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
