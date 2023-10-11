import styles from "./Upgrade.module.scss";

import type { CheckboxChangeEvent } from "antd/es/checkbox";

import { SyncOutlined } from "@ant-design/icons";
import { Button, Checkbox, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslate } from "val-i18n-react";
import { useAppContext } from "~/hooks";

import logo from "../images/logo.svg";

export type UpgradeDataType = {
  version: string;
  isAutoUpdate: boolean;
  updateLog: string;
  userAgreement: string;
  privacyProtection: string;
  openSource: string;
};
export interface AppContext {
  getOoUpgrade: () => Promise<UpgradeDataType>;
}
export const Upgrade = () => {
  const t = useTranslate();
  const { getOoUpgrade } = useAppContext();
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const [upgradeLoading, setUpgradeLoading] = useState<boolean>(true);
  const [upgradeData, setUpgradeData] = useState<UpgradeDataType>();
  useEffect(() => {
    let isMounted = true;

    getOoUpgrade().then(res => {
      if (isMounted) {
        setUpgradeData(res);
        setUpgradeLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!upgradeLoading && upgradeData) {
    return (
      <div className={styles["about-box"]}>
        <div className={styles["about-img-box"]}>
          <img src={logo} />
        </div>
        <div className={styles["about-name"]}>OOMOL STUDIO</div>
        <div className={styles["about-update"]}>
          <div className={styles.version}>
            <span>{t("settings.version")}</span>: {upgradeData.version}
          </div>
          <Button type="primary" size="small" icon={<SyncOutlined />}>
            <span>{t("settings.check-update")}</span>
          </Button>
        </div>
        <div className={styles["installation-update"]}>
          <Checkbox checked onChange={onChange}>
            {t("settings.auto-update")}
          </Checkbox>
        </div>
        <div className={styles.title}>
          <span>{t("settings.version-about")}</span> OOMOL STUDIO
          <span> {upgradeData.version}</span>
        </div>
        <div className={styles.link}>
          <div>
            <a target="_blank" href={upgradeData.updateLog}>
              {t("settings.update-log")}
            </a>
          </div>
          <div>
            <a target="_blank" href={upgradeData.userAgreement}>
              {t("settings.agreement")}
            </a>
          </div>
          <div>
            <a target="_blank" href={upgradeData.privacyProtection}>
              {t("settings.privacy")}
            </a>
          </div>
          <div>
            <a target="_blank" href={upgradeData.openSource}>
              {t("settings.open-source")}
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles["about-box"]}>
        <Skeleton.Button active style={{ width: 95, height: 96 }} />
        <Skeleton active paragraph={{ rows: 8 }} style={{ width: 280 }} />
      </div>
    );
  }
};
