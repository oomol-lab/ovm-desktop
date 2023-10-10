import styles from "./OoProjectItemList.module.scss";

import type { OoProjectItemProps } from "./OoProjectItem";

import { OoProjectItem } from "./OoProjectItem";

export interface OoProjectItemListProps {
  OoProjectItems: OoProjectItemProps[];
}

export const OoProjectItemList: React.FC<OoProjectItemListProps> = ({
  OoProjectItems,
}) => {
  return (
    <div className={styles.listContainer}>
      {OoProjectItems.map((projectItem, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <OoProjectItem {...projectItem} />
          </div>
        );
      })}
    </div>
  );
};
