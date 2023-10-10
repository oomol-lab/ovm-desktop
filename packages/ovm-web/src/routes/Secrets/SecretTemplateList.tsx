import styles from "./SecretTemplateList.module.scss";

import { SearchOutlined } from "@ant-design/icons";
import { Input, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { ThemeProvider } from "~/components/ThemeProvider";

import { SecretTemplateCell } from "./SecretTemplateCell";

export type OoSecretTemplateItem = {
  key: string;
  icon: string;
  title: string;
};

interface SecretTemplateListProps {
  getOoSecretTemplates: (
    _page?: number,
    count?: number
  ) => Promise<OoSecretTemplateItem[]>;
}

export const SecretTemplateList = ({
  getOoSecretTemplates,
}: SecretTemplateListProps) => {
  const [secretTemplateItems, setSecretTemplateItems] = useState<
    OoSecretTemplateItem[]
  >([]);
  const [secretTemplateLoading, setSecretTemplateLoading] =
    useState<boolean>(true);
  useEffect(() => {
    let isMounted = true;

    getOoSecretTemplates(1, 20).then(res => {
      if (isMounted) {
        setSecretTemplateItems(res);
        setSecretTemplateLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const defaultSkeletonCount = 20;
  const skeletonList =
    secretTemplateLoading &&
    Array.from({
      length: defaultSkeletonCount,
    }).map((_, index) => <SecretTemplateSkeleton key={index} />);

  return (
    <ThemeProvider>
      <>
        <Input
          size="large"
          prefix={<SearchOutlined />}
          placeholder="你要在 OOMOL 中添加什么秘钥？"
        />
        <div className={styles["template-box"]}>
          {!secretTemplateLoading &&
            secretTemplateItems.map(templateItem => (
              <SecretTemplateCell item={templateItem} />
            ))}
          {skeletonList}
        </div>
      </>
    </ThemeProvider>
  );
};

const SecretTemplateSkeleton = () => {
  return (
    <Skeleton.Node active className={styles.card}>
      <div className={styles.icon} />
    </Skeleton.Node>
  );
};
