import styles from "./MembersInfoSkeleton.module.scss";

import { Skeleton } from "antd";

export const MembersInfoSkeleton = () => {
  return (
    <div className={styles.list}>
      <Skeleton.Node active className={styles.card}>
        <div className={styles.icon} />
      </Skeleton.Node>
    </div>
  );
};
