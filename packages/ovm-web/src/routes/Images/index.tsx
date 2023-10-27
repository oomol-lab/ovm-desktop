import styles from "./Images.module.scss";

import type { ImageInfo } from "@oomol-lab/ovm-service/common";
import type { ColumnsType } from "antd/es/table";
import type { TFunction } from "val-i18n";

import {
  CaretRightOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Divider, Input, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useVal } from "use-value-enhancer";
import { useTranslate } from "val-i18n-react";

import { ImageSearch } from "./search";
import { useRunImageModal } from "./use-run-image";
import { useAppContext } from "../../hooks";

const createColumns = (
  t: TFunction,
  removeImage: (id: string) => Promise<void>,
  runImage: (id: string) => void
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
          <Button
            type="text"
            onClick={() => runImage(image.tags[0])}
            icon={<CaretRightOutlined />}
          />
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
  const images = useVal(ovmStore.images$);
  const { contextHolder, open } = useRunImageModal();

  useEffect(() => {
    ovmStore.listImages();
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
    await ovmStore.listImages();
  };

  const t = useTranslate();
  const columns = createColumns(t, removeImage, open);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm !== "") {
      ovmStore.filterImages(searchTerm);
    } else {
      ovmStore.listImages();
    }
  }, [searchTerm]);

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
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={t("page.search-holder")}
            size="middle"
          />
        </div>
        <div>
          {/* <Button icon={<PlusCircleOutlined />} type="primary">
            {t("page.create")}
          </Button>
          &nbsp; */}
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
      {contextHolder}
    </div>
  );
};
