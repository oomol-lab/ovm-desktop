import styles from "./LinkAccountSkeleton.module.scss";

import { Skeleton } from "antd";

export const LinkAccountSkeleton = () => {
  return (
    <div className={styles.list}>
      <Skeleton.Node active className={styles.card}>
        <div className={styles.icon} />
      </Skeleton.Node>
    </div>
  );
};
