import styles from "./Settings.module.scss";

import type { MenuProps } from "antd";

import { SyncOutlined, ToolOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useMemo } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useTranslate } from "val-i18n-react";

import { RoutePath } from "../constants";
import { Preferences } from "./Preferences";
import { Upgrade } from "./Upgrade";

type MenuItem = Required<MenuProps>["items"][number];

export enum ConfigurationEnum {
  Preferences = "preferences",
  Upgrade = "upgrade",
}

const getMenuKey = (menuKey?: string): ConfigurationEnum => {
  switch (menuKey) {
    case ConfigurationEnum.Preferences:
      return ConfigurationEnum.Preferences;
    case ConfigurationEnum.Upgrade:
      return ConfigurationEnum.Upgrade;
    default:
      return ConfigurationEnum.Preferences;
  }
};

export const Settings = () => {
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };

  const { menuKey } = useParams();
  const menuKeyEnum = getMenuKey(menuKey);
  const navigate = useNavigate();
  const t = useTranslate();

  const renderInner = () => {
    switch (menuKeyEnum) {
      case ConfigurationEnum.Preferences:
        return <Preferences />;
      case ConfigurationEnum.Upgrade:
        return <Upgrade />;
    }
  };

  const items = useMemo<MenuItem[]>(
    () => [
      getItem(
        t("settings.preferences"),
        ConfigurationEnum.Preferences,
        <ToolOutlined />
      ),
      getItem(
        t("settings.upgrade"),
        ConfigurationEnum.Upgrade,
        <SyncOutlined />
      ),
    ],
    [t]
  );

  return (
    <div className={styles["settings-box"]}>
      <div className={styles["settings-box-left"]}>
        <Menu
          className={styles["settings-menu"]}
          defaultSelectedKeys={[menuKeyEnum]}
          mode="inline"
          onSelect={e => {
            const menuKey = getMenuKey(e.key);
            navigate(generatePath(RoutePath.SettingsMenu, { menuKey }));
          }}
          items={items}
        />
      </div>
      <div className={styles["settings-box-right"]}>{renderInner()}</div>
    </div>
  );
};
