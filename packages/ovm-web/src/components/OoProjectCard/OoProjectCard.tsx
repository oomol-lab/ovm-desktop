import styles from "./OoProjectCard.module.scss";

import type { FC } from "react";

import dayjs from "dayjs";

import { generateGradientColor } from "../OoProject/utils";
import code from "./images/code.svg";

export interface OoProjectCardItem {
  id?: string;
  name: string;
  user: string;
  createTime: Date;
  description: string;
  lastUpdateTime?: string;
}

export interface OoProjectCardProps {
  item: OoProjectCardItem;
}

export const OoProjectCard: FC<OoProjectCardProps> = ({ item }) => {
  return (
    <div
      className={styles["cell-container"]}
      style={{ background: generateGradientColor(item.name) }}
    >
      <div className={styles["cell-meta"]}>
        <div className={styles["cell-meta-left"]}>
          <div className={styles["cell-image-box"]}>
            <img className={styles["cell-image"]} src={code} />
          </div>
          <div className={styles["cell-name-box"]}>
            <div className={styles["cell-name"]}>{item.name}</div>
            <div className={styles["cell-time"]}>
              {`${item.user} ${dayjs(item.createTime).format("MMM D h:mm A")}`}
            </div>
          </div>
        </div>
        <div className={styles["cell-meta-right"]}></div>
      </div>
      <div className={styles["cell-description"]}>{item.description}</div>
    </div>
  );
};
