import styles from "./OoProjectCardList.module.scss";

import type { OoProjectCardItem } from "./OoProjectCard";
import type { FC } from "react";

import { OoProjectCardSkeleton } from "../OoProject/OoProjectCardSkeleton";
import { OoProjectCard } from "./OoProjectCard";

export interface OoProjectCardListProps {
  cardList: OoProjectCardItem[];
  loading?: boolean;
}

export const OoProjectCardList: FC<OoProjectCardListProps> = ({
  cardList,
  loading,
}) => {
  const defaultSkeletonCount = 10;
  const skeletonList =
    loading &&
    Array.from({ length: defaultSkeletonCount }).map((_, index) => (
      <OoProjectCardSkeleton key={index} />
    ));

  return (
    <div className={styles.container}>
      {!loading &&
        cardList.map(cardItem => (
          <div key={cardItem.id}>
            <OoProjectCard item={cardItem} />
          </div>
        ))}
      {skeletonList}
    </div>
  );
};
