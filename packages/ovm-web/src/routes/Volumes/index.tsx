import styles from "./Volumes.module.scss";

import type { VolumeInfo } from "@oomol-lab/ovm-service/common";
import type { ColumnsType } from "antd/es/table";

import {
  CaretRightOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Badge, Button, Divider, Input, Table } from "antd";
import { useEffect, useState } from "react";
import { useTranslate } from "val-i18n-react";

import { useAppContext } from "../../hooks";

export const Volumes = () => {
  const { ovmStore } = useAppContext();
  const [volumes, setVolumes] = useState<VolumeInfo[]>([]);
  useEffect(() => {
    ovmStore.listVolumes().then(volumes => {
      console.log(volumes);
      if (volumes) {
        setVolumes(volumes);
      }
    });
  }, []);

  const removeVolume = async (name: string) => {
    await ovmStore.removeVolume(name);
    const newVolumes = volumes.filter(volume => volume.name !== name);
    setVolumes(newVolumes);
  };
  const t = useTranslate();
  const columns: ColumnsType<VolumeInfo> = [
    {
      title: t("page.name"),
      dataIndex: "name",
    },
    {
      title: t("page.status"),
      dataIndex: "status",
      render: () => <Badge status="success" text="Finished" />,
    },
    {
      title: t("page.created"),
      dataIndex: "created",
    },
    {
      title: t("page.actions"),
      dataIndex: "actions",
      render: (_, volume) => (
        <div>
          <Button type="text" icon={<CaretRightOutlined />} />
          <Divider type="vertical" />
          <Button
            type="text"
            onClick={() => removeVolume(volume.name)}
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div>
          <Input
            prefix={<SearchOutlined />}
            placeholder={t("page.search-holder")}
            size="middle"
          />
        </div>
        <div>
          <Button icon={<PlusCircleOutlined />} type="primary">
            {t("page.create")}
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        <Table
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={volumes}
          scroll={{ y: "calc(100vh - 200px)" }}
        />
      </div>
    </div>
  );
};
