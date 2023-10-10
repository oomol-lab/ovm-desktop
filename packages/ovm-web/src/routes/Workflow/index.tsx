import styles from "./Workflow.module.scss";

import { CloudDownloadOutlined, StarOutlined } from "@ant-design/icons";

export const Workflow = () => {
  return (
    <div className={styles.box}>
      <div className={styles["cell-box"]}>
        <div className={styles.title}>Image to PDF</div>
        <div className={styles["cell-content"]}>
          Transforms the text in speech and hear it using player or generate an
          audio file to be used with third parties nodes. Works with voices from
          Amazon,
        </div>
        <div className={styles["cell-footer"]}>
          <div className={styles["cell-footer-left"]}>
            <span>v2.2.1</span>
            <span style={{ marginLeft: 8 }}>
              <CloudDownloadOutlined />
              <span style={{ marginLeft: 4 }}>148</span>
            </span>
            <span style={{ marginLeft: 8 }}>
              <StarOutlined />
              <span style={{ marginLeft: 4 }}> 4.5</span>
            </span>
          </div>
          <div className={styles["cell-footer-right"]}></div>
        </div>
      </div>
    </div>
  );
};
