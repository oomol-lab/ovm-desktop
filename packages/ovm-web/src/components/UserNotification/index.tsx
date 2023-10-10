import styles from "./UserNotification.module.scss";

import type { MenuProps } from "antd";
import type MenuItem from "antd/es/menu/MenuItem";
import type { OSLiteral } from "~/constants";

import {
  BellOutlined,
  ClearOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Menu, Popover, Segmented } from "antd";
import { useEffect, useState } from "react";
import { useTranslate } from "val-i18n-react";
import { OS } from "~/constants";
import { useAppContext } from "~/hooks";

import { ThemeProvider } from "../ThemeProvider";
import { NotificationList } from "./NotificationList";

interface UserNotificationProps {
  os: OSLiteral;
}

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

enum NotificationEnum {
  Unread = "unread",
  HasRead = "has-read",
}

export type OoNotificationItem = {
  key: string;
  avatar: string;
  title: string;
  description: string;
  time: Date;
};

export interface AppContext {
  getOoNotifications: (
    _page?: number,
    count?: number
  ) => Promise<OoNotificationItem[]>;
}

export const UserNotification = ({ os }: UserNotificationProps) => {
  const t = useTranslate();

  const { getOoNotifications } = useAppContext();
  const [notificationItem, setNotificationItems] = useState<
    OoNotificationItem[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    getOoNotifications(10).then(res => {
      if (isMounted) {
        setNotificationItems(preState => [...preState, ...res]);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);
  const items: MenuItem[] = [
    getItem(t("notification.all-notification"), "1"),
    getItem(t("notification.follow"), "2"),
    getItem(t("notification.like"), "3"),
    getItem(t("notification.comments"), "4"),
    getItem(t("notification.pending"), "5"),
    getItem(t("notification.system-notification"), "6"),
    getItem(t("notification.other-notification"), "7"),
  ];
  const content = (
    <ThemeProvider>
      <div className={styles["notification-container"]}>
        <div className={styles["notification-menu"]}>
          <div className={styles["notification-menu-title"]}>
            <span>{t("notification.title")}</span>
          </div>
          <Menu
            className={styles["notification-menu-item"]}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
          <div className={styles["notification-settings"]}>
            <Button type="text" style={{ marginLeft: 6 }}>
              <SettingOutlined />
            </Button>
          </div>
        </div>
        <div className={styles["notification-content"]}>
          <div className={styles["notification-nav"]}>
            <Segmented
              size="small"
              className={styles["notification-nav-segmented"]}
              options={[
                {
                  label: t("notification.unread"),
                  value: NotificationEnum.Unread,
                },
                {
                  label: t("notification.has-read"),
                  value: NotificationEnum.HasRead,
                },
              ]}
            />
            <Button size="small" type="text">
              <ClearOutlined />
              {t("notification.read-all")}
            </Button>
          </div>
          <div className={styles["notification-mid-box"]}>
            <NotificationList
              notificationList={notificationItem}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
  return (
    <Popover
      content={content}
      arrow={false}
      placement={os === OS.Windows ? "bottomLeft" : "bottomRight"}
    >
      <Button
        className={styles.bell}
        shape="circle"
        type="text"
        icon={<BellOutlined />}
      />
    </Popover>
  );
};
