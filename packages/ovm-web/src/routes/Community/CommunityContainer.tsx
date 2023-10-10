import styles from "./CommunityContainer.module.scss";

import type { OoProjectCardItem } from "~/components/OoProjectCard/OoProjectCard";

import { Segmented, Select } from "antd";
import { useState, useEffect } from "react";
import { useTranslate } from "val-i18n-react";
import { OoProjectCardList } from "~/components/OoProjectCard/OoProjectCardList";
import { useAppContext } from "~/hooks";

export const CommunityContainer = () => {
  const { getOoProjects } = useAppContext();
  const [projectItems, setProjectItems] = useState<OoProjectCardItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let isMounted = true;

    getOoProjects(10).then(res => {
      if (isMounted) {
        setProjectItems(preState => [...preState, ...res]);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className={styles["nav-box"]}>
        <CommunityNav />
      </div>
      {projectItems && (
        <OoProjectCardList cardList={projectItems} loading={loading} />
      )}
    </>
  );
};

const CommunityNav = () => {
  const t = useTranslate();
  return (
    <div className={styles["inner-nav"]}>
      <Segmented
        defaultValue={"All"}
        className={styles["nav-segmented"]}
        options={[
          {
            label: t("community.options-all"),
            value: "All",
          },
          {
            label: t("community.workflow"),
            value: "Workflow",
          },
          {
            label: t("community.block"),
            value: "Block",
          },
        ]}
      />
      <div>
        <Select
          defaultValue="All"
          bordered={false}
          popupMatchSelectWidth={false}
          placement={"bottomRight"}
          options={[
            { value: "All", label: t("community.select-all") },
            { value: "AI", label: t("community.ai") },
            { value: "Transaction", label: t("community.transaction") },
            { value: "Data analysis", label: t("community.data-analysis") },
            {
              value: "Mathematical model",
              label: t("community.mathematical-model"),
            },
          ]}
        />
        <Select
          defaultValue="trending"
          popupMatchSelectWidth={false}
          placement={"bottomRight"}
          bordered={false}
          options={[
            { value: "trending", label: t("community.trending") },
            { value: "popular", label: t("community.popular") },
            { value: "recent", label: t("community.recent") },
          ]}
        />
      </div>
    </div>
  );
};
