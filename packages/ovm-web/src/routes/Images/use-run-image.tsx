import type { ImageInfo } from "@oomol-lab/ovm-service/common";
import type { TabsProps } from "antd";
import type { FC } from "react";

import { Button, Form, Input, Modal, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "val-i18n-react";

import { RoutePath } from "../constants";
import { useAppContext } from "../../hooks";

export const useRunImageModal = () => {
  const [modal, contextHolder] = Modal.useModal();
  const { ovmStore } = useAppContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createContainer = (imageName: string) => {
    setLoading(true);
    ovmStore.createContainer(imageName, undefined).then(id => {
      setLoading(false);
      message.success(`Container ${id} created`);
      navigate(RoutePath.Containers);
    });
  };

  const open = async (imageName: string) => {
    modal.info({
      width: 650,
      icon: null,
      closable: true,
      maskClosable: true,
      content: <ModalContent imageName={imageName} />,
      footer: (
        <Button
          loading={loading}
          block={true}
          onClick={() => createContainer(imageName)}
        >
          Start Container
        </Button>
      ),
    });
  };
  return { contextHolder, open };
};

const ModalContent: FC<{ imageName: string }> = ({ imageName }) => {
  const { ovmStore } = useAppContext();
  const t = useTranslate();
  const [image, setImage] = useState<ImageInfo | null>(null);

  const loadImage = (imageName: string) => {
    ovmStore.getImage(imageName).then(image => {
      if (image) {
        setImage(image);
      }
    });
  };

  useEffect(() => {
    loadImage(imageName);
  }, [imageName]);

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: t("images.basic"),
      children: (
        <Form>
          <Form.Item label="Container name">
            <Input placeholder={t("images.container-name-holder")} />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: t("images.advanced"),
      children: <div>Advanced</div>,
    },
  ];

  return (
    <div style={{ marginBottom: 10 }}>
      <div>
        {t("images.run-image-from")} {image?.name}
      </div>
      <Tabs
        defaultActiveKey="1"
        style={{ marginTop: 10 }}
        items={tabItems}
      ></Tabs>
    </div>
  );
};
