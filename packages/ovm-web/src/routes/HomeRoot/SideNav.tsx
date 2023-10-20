import styles from "./SideNav.module.scss";

import type { ReactNode } from "react";

import {
  CodepenOutlined,
  FileZipOutlined,
  InboxOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslate } from "val-i18n-react";

import { RoutePath } from "../constants";

export const SideNav = () => {
  const t = useTranslate();

  const items = useMemo(() => {
    const items: Array<{
      label: ReactNode;
      key: string;
      icon: ReactNode;
    }> = [
      {
        label: t("nav.containers"),
        key: RoutePath.Containers,
        icon: <CodepenOutlined />,
      },
      {
        label: t("nav.images"),
        key: RoutePath.Images,
        icon: <FileZipOutlined />,
      },
      {
        label: t("nav.volumes"),
        key: RoutePath.Volumes,
        icon: <InboxOutlined />,
      },
      {
        label: t("nav.settings"),
        key: RoutePath.Settings,
        icon: <SettingOutlined />,
      },
    ];

    for (const item of items) {
      item.label = <Link to={item.key}>{item.label}</Link>;
    }

    return items;
  }, [t]);

  const location = useLocation();

  const selectedKeys = useMemo(() => {
    const pathname = "/" + location.pathname.split("/").slice(1, 3).join("/");
    return items.some(item => item.key === pathname) ? [pathname] : [];
  }, [items, location.pathname]);

  const navigate = useNavigate();

  const onSelect = useCallback(
    (item: { key: string }) => navigate(item.key),
    [navigate]
  );

  return (
    <Menu
      className={styles.menu}
      items={items}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
    />
  );
};
