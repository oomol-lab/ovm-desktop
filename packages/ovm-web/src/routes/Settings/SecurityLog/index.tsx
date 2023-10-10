import styles from "./SecurityLog.module.scss";

import type { ColumnsType } from "antd/es/table";

import { Table } from "antd";
import { useEffect, useState } from "react";
import { useTranslate } from "val-i18n-react";
import { useAppContext } from "~/hooks";

import { DeviceInfoList } from "./DeviceInfoList";

interface SafetyRecordItem {
  key: string;
  detail: string;
  ip: string;
  time: string;
}

export interface OoDeviceInfoItem {
  key: string;
  address: string;
  ip: string;
  state: boolean;
  time: string;
  device: string;
}

export interface AppContext {
  getOoDeviceInfo: (
    _page?: number,
    count?: number
  ) => Promise<OoDeviceInfoItem[]>;
  getOoSafetyRecord: (
    _page?: number,
    count?: number
  ) => Promise<SafetyRecordItem[]>;
}

const deviceInfoLength = 5;

export const SecurityLog = () => {
  const t = useTranslate();

  const { getOoDeviceInfo, getOoSafetyRecord } = useAppContext();
  const [deviceInfoItems, setDeviceInfoItems] = useState<OoDeviceInfoItem[]>(
    []
  );
  const [safetyRecordItems, setSafetyRecordItems] = useState<
    SafetyRecordItem[]
  >([]);

  const [deviceInfoLoading, setDeviceInfoLoading] = useState<boolean>(true);
  const [safetyRecordLoading, setSafetyRecordLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    getOoDeviceInfo(1, deviceInfoLength).then(res => {
      if (isMounted) {
        setDeviceInfoItems(res);
        setDeviceInfoLoading(false);
      }
    });
    getOoSafetyRecord(10).then(res => {
      if (isMounted) {
        setSafetyRecordItems(preState => [...preState, ...res]);
        setSafetyRecordLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const columns: ColumnsType<SafetyRecordItem> = [
    {
      title: t("settings.detail"),
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: t("settings.ip"),
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: t("settings.time"),
      dataIndex: "time",
      key: "time",
    },
  ];

  return (
    <div className={styles["log-container"]}>
      <div className={styles.title}>{t("settings.login-device")}</div>
      <div className={styles["sub-title"]}>
        {t("settings.login-device-description")}
      </div>
      <DeviceInfoList
        deviceInfoList={deviceInfoItems}
        skeletonLength={deviceInfoLength}
        loading={deviceInfoLoading}
      />
      <div className={styles.title}>{t("settings.safety-record")}</div>
      <Table
        columns={columns}
        bordered
        loading={safetyRecordLoading}
        dataSource={safetyRecordItems}
      />
    </div>
  );
};
