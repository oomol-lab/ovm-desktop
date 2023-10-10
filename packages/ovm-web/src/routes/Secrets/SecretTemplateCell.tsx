import styles from "./SecretTemplateCell.module.scss";

import type { OoSecretTemplateItem } from "./SecretTemplateList";

import { PlusOutlined } from "@ant-design/icons";

interface SecretTemplateCellProps {
  item: OoSecretTemplateItem;
}

export const SecretTemplateCell = ({ item }: SecretTemplateCellProps) => {
  return (
    <div className={styles["template-item"]} key={item.key}>
      <div className={styles["template-item-left"]}>
        <div className={styles["template-item-icon"]}>
          <img src={item.icon} alt="icon" />
        </div>
        <div className={styles["template-item-title"]}>{item.title}</div>
      </div>
      <PlusOutlined />
    </div>
  );
};
