import styles from "./Secrets.module.scss";

import type { SecretDataType } from "./SecretTable";
import type { OoSecretTemplateItem } from "./SecretTemplateList";
import type { OoSecretItem } from "~/components/OoSecretCard/OoSecretCard";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useTranslate } from "val-i18n-react";
import { OoSecretCardList } from "~/components/OoSecretCard/OoSecretCardList";
import { useAppContext } from "~/hooks";

import { SecretNav } from "./SecretNav";
import { SecretTable } from "./SecretTable";
import { SecretTemplateList } from "./SecretTemplateList";

export type OoSecretTitleType = {
  secretId: string;
  name: string;
  icon: string;
  platform: string;
};

export interface AppContext {
  getOoSecrets: (_page?: number, count?: number) => Promise<OoSecretItem[]>;
  getOoSecretTable: (
    _page?: number,
    count?: number
  ) => Promise<SecretDataType[]>;
  getOoSecretTitle: () => Promise<OoSecretTitleType>;
  getOoSecretTemplates: (
    _page?: number,
    count?: number
  ) => Promise<OoSecretTemplateItem[]>;
}

export const Secrets = () => {
  const [isEdit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useTranslate();
  const {
    getOoSecrets,
    getOoSecretTable,
    getOoSecretTitle,
    getOoSecretTemplates,
  } = useAppContext();
  const [secretItems, setSecretItems] = useState<OoSecretItem[]>([]);
  const [secretTitle, setSecretTitle] = useState<OoSecretTitleType>({
    secretId: "",
    name: "",
    icon: "",
    platform: "",
  });
  const [secretDetailItems, setSecretDetailItems] = useState<SecretDataType[]>(
    []
  );

  const [secretsLoading, setSecretsLoading] = useState<boolean>(true);
  const [secretDetailLoading, setSecretDetailLoading] = useState<boolean>(true);
  const [secretTitleLoading, setSecretTitleLoading] = useState<boolean>(true);
  useEffect(() => {
    let isMounted = true;

    getOoSecrets(10).then(res => {
      if (isMounted) {
        setSecretItems(preState => [...preState, ...res]);
        setSecretsLoading(false);
      }
    });

    getOoSecretTable(1, 4).then(res => {
      if (isMounted) {
        setSecretDetailItems(res);
        setSecretDetailLoading(false);
      }
    });

    getOoSecretTitle().then(res => {
      if (isMounted) {
        setSecretTitle(res);
        setSecretTitleLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles["secret-cell-container"]}>
        <div className={styles["secret-cell-nav"]}>
          <Input placeholder={t("secrets.search-holder")} />
          <Button
            onClick={() => setOpen(true)}
            className={styles["secret-cell-create"]}
            type="primary"
            icon={<PlusOutlined />}
          />
          <Modal
            title="添加秘钥"
            centered
            width={720}
            open={open}
            footer={null}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          >
            <SecretTemplateList getOoSecretTemplates={getOoSecretTemplates} />
          </Modal>
        </div>
        {secretItems && (
          <OoSecretCardList cardList={secretItems} loading={secretsLoading} />
        )}
      </div>
      <div className={styles["secret-cell-description"]}>
        <SecretNav
          isEdit={isEdit}
          setEdit={setEdit}
          titleData={secretTitle}
          loading={secretTitleLoading}
        />
        <Divider />
        <SecretTable
          isEdit={isEdit}
          secretDataItems={secretDetailItems}
          loading={secretDetailLoading}
        />
        <div className={styles["nav-edit-time"]}>
          <div>
            <span>{t("secrets.update-time")}</span> 2023/8/24 22:25:50
          </div>
          <div>
            <span>{t("secrets.create-time")}</span> 2023/8/24 08:29:17
          </div>
        </div>
      </div>
    </div>
  );
};
