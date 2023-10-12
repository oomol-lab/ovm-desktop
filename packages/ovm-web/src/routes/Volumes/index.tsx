import styles from "./Volumes.module.scss";

import type { ColumnsType } from "antd/es/table";

import {
  CaretRightOutlined,
  DeleteOutlined,
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

export const Volumes = () => {
  const t = useTranslate();
  const columns: ColumnsType<DataType> = [
    {
      title: t("page.name"),
      dataIndex: "name",
    },
    {
      title: t("page.statues"),
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
      render: () => (
        <div>
          <Button type="text" icon={<CaretRightOutlined />} />
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
          dataSource={data}
          scroll={{ y: "calc(100vh - 200px)" }}
        />
      </div>
    </div>
  );
};
