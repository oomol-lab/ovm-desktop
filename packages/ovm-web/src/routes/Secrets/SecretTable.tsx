import styles from "./SecretTable.module.scss";

import type { ColumnsType } from "antd/es/table";

import { PlusOutlined } from "@ant-design/icons";
import { Table, Button, Input, Space } from "antd";
import { useState } from "react";
import { useTranslate } from "val-i18n-react";

interface SecretTableProps {
  isEdit: boolean;
  secretDataItems: SecretDataType[];
  loading: boolean;
}

export interface SecretDataType {
  key: number;
  name: string;
  password: string;
}

export const SecretTable = ({
  isEdit,
  secretDataItems,
  loading,
}: SecretTableProps) => {
  const t = useTranslate();

  const [dataSource, setDataSource] = useState<SecretDataType[]>([]);
  const [count, setCount] = useState(dataSource.length);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };
  const handleAdd = () => {
    const newData: SecretDataType = {
      key: count,
      name: "",
      password: "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const columns: ColumnsType<SecretDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value: string) => {
        if (isEdit) {
          return <Input defaultValue={value} />;
        } else {
          return value;
        }
      },
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (value: string, record: { key: React.Key }) => {
        if (isEdit) {
          return (
            <div className={styles["edit-value"]}>
              <Input.Password defaultValue={value} />
              <Button
                onClick={() => handleDelete(record.key)}
                className={styles["edit-value-delete"]}
              >
                {t("secrets.delete")}
              </Button>
            </div>
          );
        } else {
          return (
            <Space.Compact style={{ width: "100%" }}>
              <Input.Password readOnly={!isEdit} defaultValue={value} />
              <Button>{t("secrets.copy")}</Button>
            </Space.Compact>
          );
        }
      },
    },
  ];
  if (isEdit) {
    return (
      <div className={styles.body}>
        <Table
          className={styles.table}
          bordered
          rowKey={record => record.key}
          columns={columns}
          dataSource={secretDataItems}
          pagination={false}
          footer={() => (
            <Button
              type="text"
              size="small"
              className={styles["add-row"]}
              onClick={() => handleAdd()}
            >
              <PlusOutlined />
              {t("secrets.add")}
            </Button>
          )}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.body}>
        <Table
          rowKey={record => record.key}
          className={styles.table}
          loading={loading}
          bordered
          columns={columns}
          dataSource={secretDataItems}
          pagination={false}
        />
      </div>
    );
  }
};
