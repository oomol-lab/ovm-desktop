import styles from "./Preferences.module.scss";

import type { RadioChangeEvent } from "antd";

import { Divider, Radio, Select, Skeleton, Switch } from "antd";
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

export enum MessageOperationEnum {
  MessageAndMail = "message-and-mail",
  MessageOnly = "message-only",
  NotAccepting = "not-accepting",
}

export type PreferencesDataType = {
  language: LanguageEnum;
  theme: ThemeEnum;
  reminder: {
    dynamic: boolean;
    blueDot: boolean;
  };
  notification: {
    follow: MessageOperationEnum;
    like: MessageOperationEnum;
    at: MessageOperationEnum;
    pending: MessageOperationEnum;
    system: MessageOperationEnum;
    other: MessageOperationEnum;
  };
};

const initPreferencesData = {
  language: LanguageEnum.English,
  theme: ThemeEnum.Auto,
  reminder: {
    dynamic: false,
    blueDot: false,
  },
  notification: {
    follow: MessageOperationEnum.MessageAndMail,
    like: MessageOperationEnum.MessageAndMail,
    at: MessageOperationEnum.MessageAndMail,
    pending: MessageOperationEnum.MessageAndMail,
    system: MessageOperationEnum.MessageAndMail,
    other: MessageOperationEnum.MessageAndMail,
  },
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onLanguageChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value as LanguageEnum);
  };
  const onThemeChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setTheme(e.target.value as ThemeEnum);
  };

  if (!preferencesLoading && preferencesData) {
    const messageData = [
      {
        key: "follow",
        title: t("settings.follow"),
        description: t("settings.follows-description"),
        operation: preferencesData.notification.follow,
      },
      {
        key: "like",
        title: t("settings.like"),
        description: t("settings.like-description"),
        operation: preferencesData.notification.like,
      },
      {
        key: "at",
        title: t("settings.at"),
        description: t("settings.at-description"),
        operation: preferencesData.notification.at,
      },
      {
        key: "pending",
        title: t("settings.pending"),
        description: t("settings.pending-description"),
        operation: preferencesData.notification.pending,
      },
      {
        key: "system",
        title: t("settings.system"),
        description: t("settings.system-description"),
        operation: preferencesData.notification.system,
      },
      {
        key: "other",
        title: t("settings.other"),
        description: t("settings.other-description"),
        operation: preferencesData.notification.other,
      },
    ];
    const messageNode = messageData.map(item => {
      return (
        <div className={styles["preference-box"]} key={item.key}>
          <div className={styles.left}>
            <div className={styles.up}>{item.title}</div>
            <div className={styles.down}>{item.description}</div>
          </div>
          <div>
            <Select
              defaultValue={item.operation}
              style={{ width: 140 }}
              onChange={handleChange}
              options={[
                {
                  value: MessageOperationEnum.MessageAndMail,
                  label: t("settings.notify-email"),
                },
                {
                  value: MessageOperationEnum.MessageOnly,
                  label: t("settings.notify"),
                },
                {
                  value: MessageOperationEnum.NotAccepting,
                  label: t("settings.disable"),
                },
              ]}
            />
          </div>
        </div>
      );
    });
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
                  <span>{t("settings.theme-dark")}</span>
                </div>
              </Radio>
              <Radio value={"light"}>
                <div className={styles["appearance-picker-option"]}>
                  <img src={lightSVG} />
                  <span>{t("settings.theme-light")}</span>
                </div>
              </Radio>
              <Radio value={"auto"}>
                <div className={styles["appearance-picker-option"]}>
                  <img src={autoSVG} />
                  <span>{t("settings.follows-system")}</span>
                </div>
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <Divider />
        <div className={styles["section-title"]}>
          {t("settings.reminder-settings")}
        </div>
        <div className={styles["preference-box"]}>
          <div className={styles.left}>
            <div className={styles.up}>{t("settings.dynamic-reminders")}</div>
            <div className={styles.down}>
              {t("settings.dynamic-reminders-description")}
            </div>
          </div>
          <div>
            <Switch defaultChecked={preferencesData.reminder.dynamic} />
          </div>
        </div>
        <div className={styles["preference-box"]}>
          <div className={styles.left}>
            <div className={styles.up}>{t("settings.blue-dot")}</div>
            <div className={styles.down}>
              {t("settings.blue-dot-description")}
            </div>
          </div>
          <div>
            <Switch defaultChecked={preferencesData.reminder.blueDot} />
          </div>
        </div>
        <Divider />
        <div className={styles["section-title"]}>
          {t("settings.notification-settings")}
        </div>
        {messageNode}
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
        <Divider />
        <div className={styles["section-title"]}>
          {t("settings.reminder-settings")}
        </div>
        <div className={styles["preference-box"]}>
          <div className={styles.left}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </div>
          <div>
            <Skeleton.Button active size="small" style={{ width: 48 }} />
          </div>
        </div>
        <div className={styles["preference-box"]}>
          <div className={styles.left}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </div>
          <div>
            <Skeleton.Button active size="small" style={{ width: 48 }} />
          </div>
        </div>
        <Divider />
        <div className={styles["section-title"]}>
          {t("settings.notification-settings")}
        </div>
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <div className={styles["preference-box"]} key={index}>
            <div className={styles.left}>
              <Skeleton.Button
                active
                style={{ marginBottom: 8, width: 64 }}
                size="small"
              />
              <Skeleton.Button style={{ width: 200 }} active size="small" />
            </div>
            <div>
              <Skeleton.Button active style={{ width: 120 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
};
