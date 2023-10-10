import styles from "./Community.module.scss";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useTranslate } from "val-i18n-react";

import { CommunityContainer } from "./CommunityContainer";

export const Community = () => {
  const t = useTranslate();
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div className={styles.title}>{t("community.slogan")}</div>
        <Input
          className={styles["search-box"]}
          prefix={<SearchOutlined />}
          size="large"
          placeholder={t("community.search")}
        />
      </div>
      <div className={styles["inner-container"]}>
        <CommunityContainer />
      </div>
    </div>
  );
};
