import styles from "./DeviceInfoCell.module.scss";

import type { OoDeviceInfoItem } from ".";

import { DesktopOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslate } from "val-i18n-react";

interface DeviceInfoCellProps {
  item: OoDeviceInfoItem;
}

export const DeviceInfoCell = ({ item }: DeviceInfoCellProps) => {
  const t = useTranslate();
  return (
    <div className={styles["device-cell"]} key={item.key}>
      <div className={styles.left}>
        <div className={styles.icon}>
          <DesktopOutlined />
        </div>
        <div className={styles.text}>
          <div className={styles.up}>
            <div className={styles.address}>{item.address}</div>
            <div className={styles.ip}>{item.ip}</div>
            {item.state && (
              <span className={styles.state}>
                <div className={styles.point} />
                <div>{t("settings.current-device")}</div>
              </span>
            )}
          </div>
          <div className={styles.down}>
            <span className={styles.device}>{item.device}</span>
            <span>{t("settings.last-landing-time")}</span>
            <span className={styles.time}>{item.time}</span>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Button size="small" disabled={item.state}>
          <span className={styles.text}>{t("settings.delete")}</span>
        </Button>
      </div>
    </div>
  );
};
