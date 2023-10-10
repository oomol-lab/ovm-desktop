import styles from "./Projects.module.scss";

import type { ConnectionClientService } from "@oomol/connection";
import type { WindowService } from "../../../../ovm-service/src/common";
import type { OoProjectCardItem } from "~/components/OoProjectCard/OoProjectCard";

import { FolderOutlined, NodeIndexOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Modal, Segmented, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslate } from "val-i18n-react";
import { OoProjectCardList } from "~/components/OoProjectCard/OoProjectCardList";
import { useAppContext } from "~/hooks";

import { pageConfigure } from "../utils";
import block_icon from "./images/block.svg";
import import_icon from "./images/import.svg";
import workflow_icon from "./images/workflow.svg";

export interface AppContext {
  getOoProjects: (
    _page?: number,
    count?: number
  ) => Promise<OoProjectCardItem[]>;
  windowService: ConnectionClientService<WindowService>;
}

export const Projects = () => {
  const t = useTranslate();

  const [modalOpen, setModalOpen] = useState(false);

  const btnData = [
    {
      key: "create-workflow",
      icon: workflow_icon,
      title: t("projects.create-workflow"),
    },
    {
      key: "create-block",
      icon: block_icon,
      title: t("projects.create-block"),
    },
    {
      key: "import-project",
      icon: import_icon,
      title: t("projects.import"),
    },
  ];

  const renderBtnNode = btnData.map((item, index) => {
    return (
      <Button
        onClick={() => setModalOpen(true)}
        className={styles["create-container"]}
        key={`btn-${index}`}
      >
        <div className={styles.icon}>
          <img src={item.icon} alt="icon" />
        </div>
        <div className={styles.text}>
          <div className={styles.title}>{item.title}</div>
        </div>
      </Button>
    );
  });

  return (
    <div className={styles["project-container"]}>
      <div className={styles["btn-container"]}>{renderBtnNode}</div>
      <div className={styles.recent}>{t("oo-project.recent")}</div>
      <FileList />
      <Modal
        title="Create Workflow Projects"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>,
          <Button type="primary" onClick={() => setModalOpen(false)}>
            Create
          </Button>,
        ]}
      >
        <div className={styles["workflow-modal-container"]}>
          <Input
            defaultValue={"/Users/shaun/oomolProjects"}
            suffix={<FolderOutlined />}
            size={"large"}
          />
          <div className={styles["workflow-info"]}>
            <Avatar
              className={styles["workflow-info-avatar"]}
              shape="square"
              size="large"
              icon={<NodeIndexOutlined />}
            />
            <Input defaultValue={"Input gray Borders"} size={"large"} />
          </div>
          <TextArea className={styles["workflow-description"]} rows={4} />
        </div>
      </Modal>
    </div>
  );
};

const FileList = () => {
  const t = useTranslate();
  const location = useLocation();
  const { getOoProjects, windowService } = useAppContext();
  pageConfigure(windowService, location.pathname);
  const [projectItems, setProjectItems] = useState<OoProjectCardItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    getOoProjects(10).then(res => {
      if (isMounted) {
        setProjectItems(preState => [...preState, ...res]);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles["file-container"]}>
      <div className={styles.nav}>
        <Segmented
          defaultValue={"Edited"}
          className={styles["nav-segmented"]}
          options={[
            {
              label: t("projects.edited"),
              value: "Edited",
            },
            {
              label: t("projects.ran"),
              value: "Ran",
            },
          ]}
        />
        <div className={styles.right}>
          <Select
            defaultValue="all"
            bordered={false}
            placement={"bottomRight"}
            popupMatchSelectWidth={false}
            options={[
              { value: "all", label: t("projects.all-projects") },
              { value: "workflow", label: t("projects.workflow") },
              { value: "block", label: t("projects.blocks") },
            ]}
          />
          <Select
            defaultValue="all"
            bordered={false}
            placement={"bottomRight"}
            popupMatchSelectWidth={false}
            options={[
              { value: "all", label: t("projects.all-people") },
              { value: "my", label: t("projects.my") },
            ]}
          />
        </div>
      </div>
      <div className={styles["file-body"]}>
        {projectItems && (
          <OoProjectCardList cardList={projectItems} loading={loading} />
        )}
      </div>
    </div>
  );
};
