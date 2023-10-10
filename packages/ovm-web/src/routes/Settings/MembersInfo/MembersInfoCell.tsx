import styles from "./MembersInfoCell.module.scss";

import type { MembersInfoDataType } from ".";

import { DeploymentUnitOutlined } from "@ant-design/icons";
import { Slider } from "antd";
import { useTranslate } from "val-i18n-react";

import { MembersInfoValueTypeEnum } from ".";

interface MembersInfoCellProps {
  item: MembersInfoDataType;
}

export const MembersInfoCell = ({ item }: MembersInfoCellProps) => {
  const { valueType, used_value, total_value } = item;
  const usedValue = `${used_value}/${total_value}`;
  const t = useTranslate();
  return (
    <div className={styles["slider-box"]} key={valueType}>
      <div className={styles["slider-nav"]}>
        <DeploymentUnitOutlined />
        <span className={styles["slider-nav-title"]}>
          {valueType === MembersInfoValueTypeEnum.CUP
            ? t("settings.cup-number")
            : t("settings.gpu-number")}
          {usedValue}
        </span>
      </div>
      <div>
        <Slider defaultValue={30} trackStyle={{ backgroundColor: "#7D7FE9" }} />
      </div>
    </div>
  );
};
