import styles from "./search.module.scss";

import type { OVMStore } from "../../store";
import type { SearchItem } from "@oomol-lab/ovm-service/common";
import type { FC } from "react";

import { Button, Input, List, Modal, message } from "antd";
import { useState } from "react";
import { useTranslate } from "val-i18n-react";

export type ImageSearchProps = {
  ovmStore: OVMStore;
};

export const ImageSearch: FC<ImageSearchProps> = ({ ovmStore }) => {
  const t = useTranslate();
  const [visible, setVisible] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [items, setItems] = useState<SearchItem[]>([]);

  const toggleModal = () => setVisible(!visible);
  const onSearch = (value: string) => {
    setSearchLoading(true);
    ovmStore
      .searchImages(value)
      ?.then(images => {
        setSearchLoading(false);
        if (images) {
          setItems(images);
        }
      })
      .catch(_error => {
        setSearchLoading(false);
        // ignore
      });
  };

  return (
    <>
      <Button type="primary" onClick={toggleModal}>
        {t("page.pull-image")}
      </Button>
      <Modal open={visible} onCancel={toggleModal} footer={false}>
        <div className={styles["modal-content"]}>
          <Input.Search
            enterButton
            loading={searchLoading}
            placeholder={t("page.search-image-holder")}
            onChange={e => setSearchTerm(e.target.value)}
            onPressEnter={() => onSearch(searchTerm)}
          />
          <div className={styles.list}>
            <List
              style={{ minHeight: 400 }}
              bordered
              dataSource={items}
              renderItem={item => {
                return (
                  <List.Item key={item.name}>
                    <List.Item.Meta title={item.name} />
                    <PullImageButton ovmStore={ovmStore} name={item.name} />
                  </List.Item>
                );
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

const PullImageButton: FC<ImageSearchProps & { name: string }> = ({
  ovmStore,
  name,
}) => {
  const t = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);

  const pullImage = (name: string) => {
    setLoading(true);
    ovmStore.pullImage(name).then(() => {
      setLoading(false);
      ovmStore.listImages();
      message.success(t("images.pull-image-success", { name }));
    });
  };

  return (
    <Button loading={loading} onClick={() => pullImage(name)}>
      Pull
    </Button>
  );
};
