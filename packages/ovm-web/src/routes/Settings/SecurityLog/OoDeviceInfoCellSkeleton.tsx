import styles from "./OoDeviceInfoCellSkeleton.module.scss";

import { Skeleton } from "antd";

export const OoDeviceInfoCellSkeleton = () => {
  return (
    <div className={styles.list}>
      <Skeleton.Node active className={styles.card}>
        <div className={styles.icon} />
      </Skeleton.Node>
    </div>
  );
};
