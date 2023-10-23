import styles from "./Win11WindowControls.module.scss";

import type { WindowStatus } from "@oomol-lab/ovm-service";
import type { FC } from "react";

export interface Win11WindowControlsProps {
  onClickWin11SystemBtn: (winSystemBtn: WindowStatus) => void;
}

export const Win11WindowControls: FC<Win11WindowControlsProps> = ({
  onClickWin11SystemBtn,
}) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => onClickWin11SystemBtn("minimize")}
      >
        <i className="i-fluent-line-horizontal-1-16-regular" />
      </button>
      <button
        className={styles.button}
        onClick={() => onClickWin11SystemBtn("maximize")}
      >
        <i className="i-fluent-restore-16-regular" />
      </button>
      <button
        className={`${styles.button} ${styles.close}`}
        onClick={() => onClickWin11SystemBtn("close")}
      >
        <i className="i-fluent-dismiss-16-regular" />
      </button>
    </div>
  );
};
