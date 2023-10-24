import styles from "./Images.module.scss";

import type { ImageInfo } from "@oomol-lab/ovm-service/common";
import type { ColumnsType } from "antd/es/table";
import type { TFunction } from "val-i18n";

import {
  CaretRightOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Divider, Input, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useTranslate } from "val-i18n-react";

import { ImageSearch } from "./search";
import { useAppContext } from "../../hooks";

const createColumns = (
  t: TFunction,
  removeImage: (id: string) => Promise<void>
): ColumnsType<ImageInfo> => {
  return [
    {
      title: t("page.name"),
      dataIndex: "name",
    },
    {
      title: t("page.size"),
      dataIndex: "size",
      render: (size: number) => {
        return (size / 1024 / 1024).toFixed(2) + " MB";
      },
    },
    {
      title: t("page.created"),
      dataIndex: "created",
    },
    {
      title: t("page.actions"),
      dataIndex: "actions",
      render: (_, image) => (
        <div>
          <Button type="text" icon={<CaretRightOutlined />} />
          <Divider type="vertical" />
          <Button
            type="text"
            onClick={() => removeImage(image.id)}
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];
};

export const Images = () => {
  const { ovmStore } = useAppContext();
  const [images, setImages] = useState<ImageInfo[]>([]);
  useEffect(() => {
    ovmStore.listImages().then(images => {
      if (images) {
        setImages(images);
      }
    });
  }, []);

  const removeImage = async (id: string) => {
    try {
      await ovmStore.removeImage(id);
    } catch (error) {
      if (error instanceof Error) {
        message.info(error.message);
      }
      return;
    }
    const newImages = images.filter(image => image.id !== id);
    setImages(newImages);
  };

  const t = useTranslate();
  const columns = createColumns(t, removeImage);
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
          &nbsp;
          <ImageSearch ovmStore={ovmStore} />
        </div>
      </div>
      <div className={styles.body}>
        <Table
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={images}
          rowKey={record => record.id}
          scroll={{ y: "calc(100vh - 200px)" }}
        />
      </div>
    </div>
  );
};
