import styles from "./AccountSkeleton.module.scss";

import { Skeleton } from "antd";

export const AccountSkeleton = () => {
  return (
    <div className={styles.list}>
      <Skeleton.Node active className={styles.card}>
        <div className={styles.icon} />
      </Skeleton.Node>
    </div>
  );
};
