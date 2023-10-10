import styles from "./SecretNavSkeleton.module.scss";

import { Skeleton } from "antd";

export const SecretNavSkeleton = () => {
  return (
    <div className={styles.list}>
      <Skeleton.Node active className={styles.card}>
        <div className={styles.icon} />
      </Skeleton.Node>
    </div>
  );
};
