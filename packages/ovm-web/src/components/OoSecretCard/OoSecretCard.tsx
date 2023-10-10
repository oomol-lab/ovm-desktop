import styles from "./OoSecretCard.module.scss";

import type { FC } from "react";

import { Avatar } from "antd";

export interface OoSecretItem {
  id: string;
  icon: string;
  platform: string;
  object: string;
}

export interface OoProjectCardProps {
  item: OoSecretItem;
}

export const OoSecretCard: FC<OoProjectCardProps> = ({ item }) => {
  return (
    <div className={styles["secret-cell"]} key={item.id}>
      <Avatar
        className={styles["secret-cell-avatar"]}
        shape="square"
        size="large"
        src={item.icon}
      />
      <div className={styles["secret-cell-text"]}>
        <div className={styles["secret-cell-platform"]}>{item.platform}</div>
        <div className={styles["secret-cell-obj"]}>{item.object}</div>
      </div>
    </div>
  );
};
