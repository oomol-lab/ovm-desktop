import styles from "./LinkAccountList.module.scss";

import type { LinkAccountType } from ".";

import { LinkAccountCell } from "./LinkAccountCell";
import { LinkAccountSkeleton } from "./LinkAccountSkeleton";

export interface LinkAccountListProps {
  linkAccountList: LinkAccountType[];
  skeletonLength?: number;
  loading?: boolean;
}

export const LinkAccountList = ({
  linkAccountList,
  skeletonLength,
  loading,
}: LinkAccountListProps) => {
  const defaultSkeletonCount = 10;
  const skeletonList =
    loading &&
    Array.from({
      length: skeletonLength ? skeletonLength : defaultSkeletonCount,
    }).map((_, index) => <LinkAccountSkeleton key={index} />);

  return (
    <div className={styles["link-container"]}>
      {!loading &&
        linkAccountList.map(linkAccountList => (
          <div key={linkAccountList.key}>
            <LinkAccountCell item={linkAccountList} />
          </div>
        ))}
      {skeletonList}
    </div>
  );
};
