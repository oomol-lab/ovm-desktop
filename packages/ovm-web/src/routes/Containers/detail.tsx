import styles from "./detail.module.scss";

import type { OVMStore } from "../../store";
import type { ContainerInfo } from "@oomol-lab/ovm-service/common";
import type { FC } from "react";

import { Breadcrumb, Tabs } from "antd";
import { useEffect, useState } from "react";
import { generatePath, useParams } from "react-router-dom";
import { useTranslate } from "val-i18n-react";

import { RoutePath } from "../constants";
import { shortId } from "../utils";
import { useAppContext } from "../../hooks";

export const ContainerDetail = () => {
  const t = useTranslate();
  const { id } = useParams();
  const { ovmStore } = useAppContext();
  const [container, setContainer] = useState<ContainerInfo | null>(null);

  useEffect(() => {
    if (id) {
      ovmStore.getContainer(id).then(container => {
        if (container) {
          setContainer(container);
        }
      });
    }
  }, []);

  if (!id) {
    return null;
  }

  return (
    <div className={styles["detail-container"]}>
      <Breadcrumb
        items={[
          {
            title: t("containers.title"),
            path: generatePath(RoutePath.Containers),
          },
          { title: t("containers.detail") },
        ]}
      />
      <p>Id {shortId(id)}</p>
      <p>Image {container?.image}</p>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "info",
            key: "1",
            children: (
              <div>
                <p>Status: {container?.status}</p>
                <p>Created: {container?.created}</p>
              </div>
            ),
          },
          {
            key: "2",
            label: "logs",
            children: <ContainerLog ovmStore={ovmStore} id={id} />,
          },
        ]}
      ></Tabs>
    </div>
  );
};

// TODO use xterm render logs
export const ContainerLog: FC<{ ovmStore: OVMStore; id: string }> = ({
  ovmStore,
  id,
}) => {
  const [logs, setLogs] = useState<string | null>(null);
  useEffect(() => {
    ovmStore.getContainerLog(id).then(log => {
      if (log) {
        setLogs(log);
      }
    });
  }, []);
  return <pre style={{ margin: 0 }}>{logs}</pre>;
};
