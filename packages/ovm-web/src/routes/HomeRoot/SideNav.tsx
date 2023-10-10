import styles from "./SideNav.module.scss";

import type { ReactNode } from "react";

import {
  GlobalOutlined,
  KeyOutlined,
  NodeIndexOutlined,
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
        label: t("projects.title"),
        key: RoutePath.Projects,
        icon: <NodeIndexOutlined />,
      },
      // {
      //   label: t("flows.title"),
      //   key: RoutePath.Flows,
      //   icon: <NodeIndexOutlined />,
      // },
      // {
      //   label: t("blocks.title"),
      //   key: RoutePath.Blocks,
      //   icon: <CodeOutlined />,
      // },
      {
        label: t("community.title"),
        key: RoutePath.Community,
        icon: <GlobalOutlined />,
      },
      {
        label: t("secrets.title"),
        key: RoutePath.Secrets,
        icon: <KeyOutlined />,
      },
      // {
      //   label: t("extensions.title"),
      //   key: RoutePath.Extensions,
      //   icon: <BuildOutlined />,
      // },
      {
        label: t("settings.title"),
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

  const selectedKeys = useMemo(
    () =>
      items.some(item => item.key === location.pathname)
        ? [location.pathname]
        : [],
    [items, location.pathname]
  );

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
