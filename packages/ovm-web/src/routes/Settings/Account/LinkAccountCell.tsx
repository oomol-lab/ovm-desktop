import styles from "./LinkAccountCell.module.scss";

import type { LinkAccountType } from ".";

import { Button } from "antd";
import { useTranslate } from "val-i18n-react";

interface LinkAccountCellProps {
  item: LinkAccountType;
}

export const LinkAccountCell = ({ item }: LinkAccountCellProps) => {
  const t = useTranslate();
  return (
    <div className={styles["link-box"]} key={item.key}>
      <div className={styles.left}>
        <img className={styles.icon} src={item.icon} />
        <div className={styles.name}>{item.name}</div>
      </div>
      <Button type="link" size="small">
        <span className={styles.edit}> {t("settings.binding")}</span>
      </Button>
    </div>
  );
};
