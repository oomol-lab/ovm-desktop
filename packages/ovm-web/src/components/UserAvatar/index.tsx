import styles from "./UserAvatar.module.scss";

import type { MenuProps } from "antd";
import type { OSLiteral } from "~/constants";

import {
  BgColorsOutlined,
  ControlOutlined,
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useTranslate } from "val-i18n-react";
import { OS } from "~/constants";

interface UserAvatarProps {
  src: string;
  os: OSLiteral;
}

export const UserAvatar = ({ src, os }: UserAvatarProps) => {
  const t = useTranslate();
  const items: MenuProps["items"] = [
    {
      key: "info",
      type: "group",
      label: <InfoBox />,
    },
    {
      type: "divider",
    },
    {
      key: "theme",
      label: (
        <div className={styles.cell}>
          <div className={styles.left}>
            <BgColorsOutlined />
            <span className={styles.name}>{t("home.theme")}</span>
          </div>
        </div>
      ),
    },
    {
      key: "settings",
      label: (
        <div className={styles.cell}>
          <div className={styles.left}>
            <ControlOutlined />
            <span className={styles.name}>{t("home.settings")}</span>
          </div>
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div className={styles.cell}>
          <div className={styles.left}>
            <LogoutOutlined />
            <span className={styles.name}>{t("home.log-out")}</span>
          </div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "console",
      label: (
        <div className={styles.cell}>
          <div className={styles.left}>
            <DashboardOutlined />
            <span className={styles.name}>{t("admin-console")}</span>
          </div>
        </div>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement={os === OS.Windows ? "bottomLeft" : "bottomRight"}
    >
      <Avatar src={src} icon={<UserOutlined />} />
    </Dropdown>
  );
};

const InfoBox = () => {
  return (
    <div className={styles["info-box"]}>
      <div className={styles["info-avatar"]}>
        <Avatar
          size={64}
          src="https://placekitten.com/300/300"
          icon={<UserOutlined />}
        />
      </div>
      <div className={styles["info-name"]}>Beings</div>
      <div className={styles["info-email"]}>beingswu@gmail.com</div>
    </div>
  );
};
