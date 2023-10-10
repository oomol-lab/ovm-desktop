import styles from "./OoSecretCardSkeleton.module.scss";

import { Skeleton } from "antd";

export const OoSecretCardSkeleton = () => {
  return (
    <div className={styles.list}>
      <Skeleton.Node active className={styles.card}>
        <div className={styles.icon} />
      </Skeleton.Node>
    </div>
  );
};
