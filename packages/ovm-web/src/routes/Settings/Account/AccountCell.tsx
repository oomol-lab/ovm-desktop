import styles from "./AccountCell.module.scss";

import type { AccountInfoType } from ".";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslate } from "val-i18n-react";

interface AccountInfoProps {
  item: AccountInfoType;
}

export const AccountCell = ({ item }: AccountInfoProps) => {
  const t = useTranslate();
  return (
    <div className={styles.box} key={item.key}>
      <div className={styles.left}>
        <div className={styles.icon}>
          {item.state ? <CheckOutlined /> : <CloseOutlined />}
        </div>
        <div className={styles.text}>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.account}>{item.account}</div>
        </div>
      </div>
      <Button size="small">
        <span className={styles.edit}>{t("settings.binding-operation")}</span>
      </Button>
    </div>
  );
};
