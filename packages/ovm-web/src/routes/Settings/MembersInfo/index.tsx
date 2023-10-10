import styles from "./MembersInfo.module.scss";

import { RightOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { useEffect, useState } from "react";
import { useTranslate } from "val-i18n-react";
import { useAppContext } from "~/hooks";

import { MembersInfoList } from "./MembersInfoList";

export enum MembersInfoValueTypeEnum {
  CUP = "CUP",
  GPU = "GPU",
}

export type MembersInfoDataType = {
  valueType: MembersInfoValueTypeEnum;
  used_value: number;
  total_value: number;
};
export interface AppContext {
  getOoMembersInfo: () => Promise<MembersInfoDataType[]>;
}

export const MembersInfo = () => {
  const t = useTranslate();
  const { getOoMembersInfo } = useAppContext();
  const [membersInfoLoading, setMembersInfoLoading] = useState<boolean>(true);
  const [membersInfoItems, setMembersInfoItems] = useState<
    MembersInfoDataType[]
  >([
    {
      valueType: MembersInfoValueTypeEnum.CUP,
      used_value: 0,
      total_value: 100,
    },
    {
      valueType: MembersInfoValueTypeEnum.GPU,
      used_value: 0,
      total_value: 1000,
    },
  ]);

  useEffect(() => {
    let isMounted = true;

    getOoMembersInfo().then(res => {
      if (isMounted) {
        setMembersInfoItems(res);
        setMembersInfoLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles["members-info-container"]}>
      <div className={styles.info}>
        <div>
          <div className={styles["user-name"]}>伍双</div>
          <div className={styles["user-rights"]}>
            {t("settings.member-description")}
          </div>
        </div>
        <div>
          <Button style={{ marginRight: 8 }}>{t("settings.use-credit")}</Button>
          <Button type="primary">{t("settings.bug-vip")}</Button>
        </div>
      </div>
      <Divider />
      <div className={styles.rights}>
        <div className={styles.nav}>
          <div className={styles.title}>{t("settings.my-rights")}</div>
          <div className={styles.link}>
            {t("settings.view-rights")} <RightOutlined />
          </div>
        </div>
        <MembersInfoList
          skeletonLength={2}
          membersInfoList={membersInfoItems}
          loading={membersInfoLoading}
        />
      </div>
    </div>
  );
};
