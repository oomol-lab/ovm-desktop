import styles from "./AccountList.module.scss";

import type { AccountInfoType } from ".";
import type { FC } from "react";

import { AccountCell } from "./AccountCell";
import { AccountSkeleton } from "./AccountSkeleton";

export interface AccountListProps {
  accountInfoList: AccountInfoType[];
  skeletonLength?: number;
  loading?: boolean;
}

export const AccountList: FC<AccountListProps> = ({
  accountInfoList,
  skeletonLength,
  loading,
}) => {
  const defaultSkeletonCount = 10;
  const skeletonList =
    loading &&
    Array.from({
      length: skeletonLength ? skeletonLength : defaultSkeletonCount,
    }).map((_, index) => <AccountSkeleton key={index} />);

  return (
    <div className={styles["node-container"]}>
      {!loading &&
        accountInfoList.map(accountInfoItem => (
          <div key={accountInfoItem.key}>
            <AccountCell item={accountInfoItem} />
          </div>
        ))}
      {skeletonList}
    </div>
  );
};
