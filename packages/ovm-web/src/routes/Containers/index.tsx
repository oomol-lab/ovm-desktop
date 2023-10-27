import styles from "./Projects.module.scss";

import type { ContainerInfo } from "@oomol-lab/ovm-service/common";
import type { ColumnsType } from "antd/es/table";

import {
  CaretRightOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Divider, Input, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { useVal } from "use-value-enhancer";
import { useTranslate } from "val-i18n-react";

import { RoutePath } from "../constants";
import { useAppContext } from "../../hooks";

export const Containers = () => {
  const { ovmStore } = useAppContext();
  const containers = useVal(ovmStore.containers$);
  useEffect(() => {
    ovmStore.listContainers();
  }, []);
  const removeContainer = async (id: string) => {
    await ovmStore.removeContainer(id);
    await ovmStore.listContainers();
  };

  const t = useTranslate();
  const columns: ColumnsType<ContainerInfo> = [
    {
      title: t("page.name"),
      dataIndex: "name",
      render: (name, record) => {
        return (
          <Link to={generatePath(RoutePath.ContainerDetail, { id: record.id })}>
            {name}
          </Link>
        );
      },
    },
    {
      title: t("page.image"),
      dataIndex: "image",
    },
    {
      title: t("page.status"),
      dataIndex: "status",
      render: (status: string) => {
        return status;
      },
    },
    {
      title: t("page.created"),
      dataIndex: "created",
    },
    {
      title: t("page.actions"),
      dataIndex: "actions",
      render: (_, info) => (
        <div>
          <Button type="text" icon={<CaretRightOutlined />} />
          <Divider type="vertical" />
          <Button
            type="text"
            onClick={() => removeContainer(info.id)}
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  useEffect(() => {
    if (searchTerm !== "") {
      ovmStore.filterContainers(searchTerm);
    } else {
      ovmStore.listContainers();
    }
  }, [searchTerm]);
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
            onChange={e => setSearchTerm(e.target.value)}
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
          dataSource={containers}
          rowKey={row => row.id}
          scroll={{ y: "calc(100vh - 200px)" }}
        />
      </div>
    </div>
  );
};

export { ContainerDetail } from "./detail";
