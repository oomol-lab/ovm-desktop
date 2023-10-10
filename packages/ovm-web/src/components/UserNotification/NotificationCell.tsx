import styles from "./NotificationCell.module.scss";

import type { OoNotificationItem } from ".";

import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export interface OoNotificationCellProps {
  item: OoNotificationItem;
}

export const NotificationCell = ({ item }: OoNotificationCellProps) => {
  return (
    <div className={styles["notification-cell"]} key={item.key}>
      <div className={styles["notification-cell-left"]}>
        <Avatar size="large" src={item.avatar} icon={<UserOutlined />} />
      </div>
      <div className={styles["notification-cell-right"]}>
        <div className={styles["notification-cell-title"]}>{item.title}</div>
        <div className={styles["notification-cell-description"]}>
          {item.description}
        </div>
        <div className={styles["notification-cell-time"]}>
          {item.time.toLocaleString()}
        </div>
      </div>
    </div>
  );
};
