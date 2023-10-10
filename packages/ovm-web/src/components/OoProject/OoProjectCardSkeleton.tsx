import styles from "./OoProjectCardSkeleton.module.scss";

import { Skeleton } from "antd";

export const OoProjectCardSkeleton = () => {
  return (
    <div className={styles.list}>
      <Skeleton.Node active className={styles.card}>
        <div className={styles.icon} />
      </Skeleton.Node>
    </div>
  );
};
