import styles from "./OoSecretCardList.module.scss";

import type { OoSecretItem } from "./OoSecretCard";
import type { FC } from "react";

import { OoSecretCard } from "./OoSecretCard";
import { OoSecretCardSkeleton } from "./OoSecretCardSkeleton";

export interface OoSecretCardListProps {
  cardList: OoSecretItem[];
  loading?: boolean;
}

export const OoSecretCardList: FC<OoSecretCardListProps> = ({
  cardList,
  loading,
}) => {
  const defaultSkeletonCount = 10;
  const skeletonList =
    loading &&
    Array.from({ length: defaultSkeletonCount }).map((_, index) => (
      <OoSecretCardSkeleton key={index} />
    ));

  return (
    <div className={styles["secret-cell-box"]}>
      {!loading &&
        cardList.map(cardItem => (
          <div key={cardItem.id}>
            <OoSecretCard item={cardItem} />
          </div>
        ))}
      {skeletonList}
    </div>
  );
};
