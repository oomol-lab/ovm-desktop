import styles from "./Projects.module.scss";

import type { ColumnsType } from "antd/es/table";

import {
  DeleteOutlined,
  FolderOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { Badge, Button, Divider, Input, Table } from "antd";
import { useState } from "react";
import { useTranslate } from "val-i18n-react";

interface DataType {
  key: React.Key;
  status: string;
  created: number;
  actions: string;
}

const data = faker.datatype.array(20).map(() => ({
  key: faker.datatype.uuid(),
  name: faker.name.fullName(),
  status: faker.name.jobTitle(),
  created: faker.date.past().getTime(),
  actions: faker.address.streetAddress(),
}));

export const Containers = () => {
  const t = useTranslate();
  const columns: ColumnsType<DataType> = [
    {
      title: t("containers.name"),
      dataIndex: "name",
    },
    {
      title: t("containers.statues"),
      dataIndex: "status",
      render: () => <Badge status="success" text="Finished" />,
    },
    {
      title: t("containers.created"),
      dataIndex: "created",
    },
    {
      title: t("containers.actions"),
      dataIndex: "actions",
      render: () => (
        <div>
          <Button type="text" icon={<FolderOutlined />} />
          <Divider type="vertical" />
          <Button type="text" icon={<DeleteOutlined />} />
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
            placeholder={t("containers.search-holder")}
            size="middle"
          />
        </div>
        <div>
          <Button icon={<PlusCircleOutlined />} type="primary">
            {t("containers.create")}
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        <Table
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          scroll={{ y: "calc(100vh - 200px)" }}
        />
      </div>
    </div>
  );
};
