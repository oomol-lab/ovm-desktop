import styles from "./SecretNav.module.scss";

import type { OoSecretTitleType } from ".";

import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Avatar, Input, Button } from "antd";
import { useTranslate } from "val-i18n-react";

import { SecretNavSkeleton } from "./SecretNavSkeleton";

interface SecretNavProps {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  titleData: OoSecretTitleType;
  loading: boolean;
}

export const SecretNav = ({
  isEdit,
  setEdit,
  titleData,
  loading,
}: SecretNavProps) => {
  const t = useTranslate();
  const skeleton = loading && <SecretNavSkeleton />;

  if (isEdit) {
    return (
      <div className={styles["description-nav"]}>
        <div className={styles["nav-left"]}>
          <div className={styles["platform-box"]}>
            <div className={styles["avatar-box"]}>
              <div className={styles["avatar-icon"]}>
                <EditOutlined />
              </div>
              <Avatar shape="square" size={72} src={titleData.icon} />
            </div>
            <div className={styles["platform-cell-text"]}>
              <div className={styles["platform-cell-title"]}>
                <Input value={titleData.platform} />
              </div>
              <div className={styles["platform-cell-obj"]}>
                <Input value={titleData.name} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["nav-right"]}>
          <Button
            onClick={() => {
              setEdit(false);
            }}
          >
            {t("secrets.cancel")}
          </Button>
          <Button
            onClick={() => {
              setEdit(false);
            }}
            type={"primary"}
            className={styles.more}
          >
            {t("secrets.save")}
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {!loading && (
          <div className={styles["description-nav"]}>
            <div className={styles["nav-left"]}>
              <div className={styles["platform-box"]}>
                <Avatar shape="square" size={"large"} src={titleData.icon} />
                <div className={styles["platform-cell-text"]}>
                  <div className={styles["platform-cell-title"]}>
                    {titleData.platform}
                  </div>
                  <div className={styles["platform-cell-obj"]}>
                    {titleData.name}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["nav-right"]}>
              <Button
                onClick={() => {
                  setEdit(true);
                }}
                icon={<EditOutlined />}
              >
                {t("secrets.edit")}
              </Button>
              <Button className={styles.more} icon={<MoreOutlined />} />
            </div>
          </div>
        )}
        {skeleton}
      </div>
    );
  }
};
