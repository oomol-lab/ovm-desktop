import styles from "./Profile.module.scss";

import { ToTopOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import { useTranslate } from "val-i18n-react";
import { useAppContext } from "~/hooks";

export type ProfileDataType = {
  avatar: string;
  nickName: string;
};
export interface AppContext {
  getOoProfile: () => Promise<ProfileDataType>;
}

export const Profile = () => {
  const t = useTranslate();
  const { getOoProfile } = useAppContext();
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<ProfileDataType>();
  useEffect(() => {
    let isMounted = true;

    getOoProfile().then(res => {
      if (isMounted) {
        setProfileData(res);
        setProfileLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!profileLoading && profileData) {
    return (
      <div className={styles["user-box"]}>
        <div className={styles.section}>
          <div className={styles["user-nick-name"]}>{t("settings.avatar")}</div>
          <div className={styles["user-image"]}>
            <div className={styles.left}>
              <img src={profileData.avatar} />
            </div>
            <div className={styles.right}>
              <Button
                icon={<ToTopOutlined />}
                className={styles["user-image-upload-btn"]}
              >
                {t("secrets.update-avatar")}
              </Button>
              <div className={styles["user-image-upload"]}>
                {t("settings.avatar-description")}
              </div>
            </div>
          </div>
          <div className={styles["user-nick-name-box"]}>
            <div className={styles["user-nick-name"]}>
              {t("settings.nickname")}
            </div>
            <Input
              defaultValue={profileData.nickName}
              className={styles["user-nick-input"]}
            />
          </div>
          <Button type="primary">{t("settings.update-info")}</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles["user-box"]}>
        <div className={styles.section}>
          <div className={styles["user-nick-name"]}>{t("settings.avatar")}</div>
          <div className={styles["user-image"]}>
            <div className={styles.left}>
              <Skeleton.Avatar active size={96} shape="circle" />
            </div>
            <div className={styles.right}>
              <Skeleton.Button active style={{ width: 108 }} />
              <div className={styles["user-image-upload"]}>
                {t("settings.avatar-description")}
              </div>
            </div>
          </div>
          <div className={styles["user-nick-name-box"]}>
            <div className={styles["user-nick-name"]}>
              {t("settings.nickname")}
            </div>
            <Skeleton.Input active style={{ width: 240 }} />
          </div>
          <Skeleton.Button active style={{ width: 96 }} />
        </div>
      </div>
    );
  }
};
