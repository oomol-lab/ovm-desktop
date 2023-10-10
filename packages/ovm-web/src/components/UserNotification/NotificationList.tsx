import styles from "./NotificationList.module.scss";

import type { OoNotificationItem } from ".";

import { NotificationCell } from "./NotificationCell";
import { OoNotificationSkeleton } from "./OoNotificationSkeleton";

export interface OoNotificationListProps {
  notificationList: OoNotificationItem[];
  loading?: boolean;
}

export const NotificationList = ({
  notificationList,
  loading,
}: OoNotificationListProps) => {
  const defaultSkeletonCount = 10;
  const skeletonList =
    loading &&
    Array.from({ length: defaultSkeletonCount }).map((_, index) => (
      <OoNotificationSkeleton key={index} />
    ));
  return (
    <div className={styles["notification-inner"]}>
      {!loading &&
        notificationList.map(notificationItem => (
          <div key={notificationItem.key}>
            <NotificationCell item={notificationItem} />
          </div>
        ))}
      {skeletonList}
    </div>
  );
};
