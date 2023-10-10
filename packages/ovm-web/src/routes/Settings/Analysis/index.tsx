import styles from "./Analysis.module.scss";

import { Select } from "antd";

// TODO
export const Analysis = () => {
  return (
    <div className={styles["analysis-container"]}>
      <div className={styles.overview}>
        <div className={styles["title-section"]}>
          <div className={styles.left}>
            <div className={styles.title}>数据统计</div>
            <div className={styles.content}>记录每一份成长</div>
          </div>
          <Select
            defaultValue="1-year"
            bordered={false}
            className={styles.select}
            options={[
              { value: "1-year", label: "近 1 年" },
              { value: "30-day", label: "近 30 天" },
            ]}
          />
        </div>
        <div className={styles["data-section"]}>
          <div className={styles["cell-box"]}>
            <div className={styles["cell-title"]}>文章</div>
            <div className={styles.number}>6</div>
          </div>
        </div>
      </div>
    </div>
  );
};
