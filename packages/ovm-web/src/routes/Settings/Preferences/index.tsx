import styles from "./Preferences.module.scss";

import type { RadioChangeEvent } from "antd";

import { Radio, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslate } from "val-i18n-react";
import { useAppContext } from "~/hooks";

import autoSVG from "../images/auto.svg";
import darkSVG from "../images/dark.svg";
import lightSVG from "../images/light.svg";

export enum ThemeEnum {
  Light = "light",
  Dark = "dark",
  Auto = "auto",
}

export enum LanguageEnum {
  English = "en",
  Chinese = "zh-CN",
}

export type PreferencesDataType = {
  language: LanguageEnum;
  theme: ThemeEnum;
};

const initPreferencesData = {
  language: LanguageEnum.English,
  theme: ThemeEnum.Auto,
};

export interface AppContext {
  getOoPreferences: () => Promise<PreferencesDataType>;
}

export const Preferences = () => {
  const t = useTranslate();
  const { getOoPreferences } = useAppContext();
  const [preferencesLoading, setPreferencesLoading] = useState<boolean>(true);
  const [preferencesData, setPreferencesData] =
    useState<PreferencesDataType>(initPreferencesData);
  const [value, setValue] = useState<LanguageEnum>(preferencesData.language);
  const [theme, setTheme] = useState<ThemeEnum>(preferencesData.theme);

  useEffect(() => {
    let isMounted = true;

    getOoPreferences().then(res => {
      if (isMounted) {
        setPreferencesData(res);
        setPreferencesLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const onLanguageChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value as LanguageEnum);
  };
  const onThemeChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setTheme(e.target.value as ThemeEnum);
  };

  if (!preferencesLoading && preferencesData) {
    return (
      <div className={styles["preference-container"]}>
        <div className={styles.section}>
          <div className={styles["section-title"]}>
            {t("settings.language")}
          </div>
          <Radio.Group
            onChange={onLanguageChange}
            defaultValue={preferencesData.language}
            value={value}
          >
            <Radio value={LanguageEnum.English}>English</Radio>
            <Radio value={LanguageEnum.Chinese}>中文</Radio>
          </Radio.Group>
        </div>
        <div className={styles.section}>
          <div className={styles["section-title"]}>{t("settings.theme")}</div>
          <div className={styles["appearance-picker-container"]}>
            <Radio.Group name="theme" value={theme} onChange={onThemeChange}>
              <Radio value={"dark"}>
                <div className={styles["appearance-picker-option"]}>
                  <img src={darkSVG} />
                  <span>{t("settings.dark")}</span>
                </div>
              </Radio>
              <Radio value={"light"}>
                <div className={styles["appearance-picker-option"]}>
                  <img src={lightSVG} />
                  <span>{t("settings.light")}</span>
                </div>
              </Radio>
              <Radio value={"auto"}>
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
  } else {
    return (
      <div className={styles["preference-container"]}>
        <div className={styles.section}>
          <div className={styles["section-title"]}>
            {t("settings.language")}
          </div>
          <Skeleton.Button active size="small" style={{ width: 140 }} />
        </div>
        <div className={styles.section}>
          <div className={styles["section-title"]}>{t("settings.theme")}</div>
          <div className={styles["appearance-picker-container"]}>
            <Skeleton.Button
              active
              size="small"
              style={{ width: 120, height: 80, marginRight: 18 }}
            />
            <Skeleton.Button
              active
              size="small"
              style={{ width: 120, height: 80, marginRight: 18 }}
            />
            <Skeleton.Button
              active
              size="small"
              style={{ width: 120, height: 80, marginRight: 18 }}
            />
          </div>
        </div>
      </div>
    );
  }
};
