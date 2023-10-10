import styles from "./HomeRoot.module.scss";

import type { RouteOutletContext } from "../typings";
import type { Val } from "value-enhancer";

import { DollarOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslate } from "val-i18n-react";
import { val } from "value-enhancer";
import { PricingCard } from "~/components/PricingCard";
import { UserAvatar } from "~/components/UserAvatar";
import { UserNotification } from "~/components/UserNotification";
import { OS } from "~/constants";
import { useOS } from "~/hooks";

import { HomeRootTitleBar } from "./HomeRootTitleBar";
import { SideNav } from "./SideNav";

export const HomeRoot = () => {
  const os = useOS();
  const t = useTranslate();
  const [titleBar$] = useState<Val<React.ReactNode>>(val);
  const [modalOpen, setModalOpen] = useState(false);
  const outletContext: RouteOutletContext = titleBar$.set;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sidebar} ${
          os === OS.Mac ? styles["sidebar-mac"] : ""
        }`}
      >
        {os !== OS.Mac && (
          <div className={styles["sidebar-header"]}>
            <div className={styles["sidebar-header-box"]}>
              <div className={styles.left}>
                <UserAvatar os={os} src="https://placekitten.com/64/64" />
              </div>
              <UserNotification os={os} />
            </div>
          </div>
        )}
        <div className={styles["sidebar-content"]}>
          <SideNav />
        </div>
        <div className={styles["sidebar-footer"]}>
          <div className={styles["sidebar-plan"]}>
            <Button
              onClick={() => setModalOpen(true)}
              className={styles["sidebar-plan-btn"]}
              type="primary"
              ghost
            >
              <DollarOutlined />
              {t("home.vip")}
            </Button>
          </div>
          <Modal
            centered
            footer
            width={1080}
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
          >
            <PricingCard />
          </Modal>
        </div>
      </div>
      <div className={styles.main}>
        <div
          className={`${styles.header} ${
            os === OS.Mac ? styles["header-mac"] : ""
          }`}
        >
          <HomeRootTitleBar titleBar$={titleBar$} />
        </div>
        <div className={styles.content}>
          <Outlet context={outletContext} />
        </div>
      </div>
    </div>
  );
};
