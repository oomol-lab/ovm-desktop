import styles from "./Settings.module.scss";

import type { MenuProps } from "antd";

import {
  CrownOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  ScheduleOutlined,
  SyncOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useMemo } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useTranslate } from "val-i18n-react";

import { RoutePath } from "../constants";
import { Account } from "./Account";
import { Bill } from "./Bill";
import { ComingSoon } from "./ComingSoon";
import { MembersInfo } from "./MembersInfo";
import { Preferences } from "./Preferences";
import { Profile } from "./Profile";
import { SecurityLog } from "./SecurityLog";
import { Upgrade } from "./Upgrade";

type MenuItem = Required<MenuProps>["items"][number];

export enum ConfigurationEnum {
  Profile = "profile",
  Preferences = "preferences",
  SecurityLog = "security_log",
  Account = "account",
  Upgrade = "upgrade",
  Analysis = "analysis",
  About = "about",
  MembersInfo = "members_info",
  Bill = "bill",
  Token = "token",
  Authorize = "authorize",
}

const getMenuKey = (menuKey?: string): ConfigurationEnum => {
  switch (menuKey) {
    case ConfigurationEnum.Profile:
      return ConfigurationEnum.Profile;
    case ConfigurationEnum.Preferences:
      return ConfigurationEnum.Preferences;
    case ConfigurationEnum.SecurityLog:
      return ConfigurationEnum.SecurityLog;
    case ConfigurationEnum.Account:
      return ConfigurationEnum.Account;
    case ConfigurationEnum.Upgrade:
      return ConfigurationEnum.Upgrade;
    case ConfigurationEnum.Analysis:
      return ConfigurationEnum.Analysis;
    case ConfigurationEnum.About:
      return ConfigurationEnum.About;
    case ConfigurationEnum.MembersInfo:
      return ConfigurationEnum.MembersInfo;
    case ConfigurationEnum.Bill:
      return ConfigurationEnum.Bill;
    case ConfigurationEnum.Token:
      return ConfigurationEnum.Token;
    case ConfigurationEnum.Authorize:
      return ConfigurationEnum.Authorize;
    default:
      return ConfigurationEnum.Profile;
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
      case ConfigurationEnum.Profile:
        return <Profile />;
      case ConfigurationEnum.Preferences:
        return <Preferences />;
      case ConfigurationEnum.SecurityLog:
        return <SecurityLog />;
      case ConfigurationEnum.Account:
        return <Account />;
      case ConfigurationEnum.Upgrade:
        return <Upgrade />;
      case ConfigurationEnum.Analysis:
        return <ComingSoon />;
      case ConfigurationEnum.About:
        return <ComingSoon />;
      case ConfigurationEnum.MembersInfo:
        return <MembersInfo />;
      case ConfigurationEnum.Bill:
        return <Bill />;
      case ConfigurationEnum.Token:
        return <ComingSoon />;
      case ConfigurationEnum.Authorize:
        return <ComingSoon />;
    }
  };

  const items = useMemo<MenuItem[]>(
    () => [
      getItem(
        t("settings.account"),
        "account",
        undefined,
        [
          getItem(
            t("settings.profile"),
            ConfigurationEnum.Profile,
            <UserOutlined />
          ),
          getItem(
            t("settings.preferences"),
            ConfigurationEnum.Preferences,
            <ToolOutlined />
          ),
          getItem(
            t("secrets.security-log"),
            ConfigurationEnum.SecurityLog,
            <SafetyCertificateOutlined />
          ),
          getItem(
            t("settings.management"),
            ConfigurationEnum.Account,
            <ScheduleOutlined />
          ),
          getItem(
            t("settings.upgrade"),
            ConfigurationEnum.Upgrade,
            <SyncOutlined />
          ),
        ],
        "group"
      ),
      // getItem(
      //   "内容",
      //   "content",
      //   "",
      //   [
      //     getItem("数据统计", "analysis", <BarChartOutlined />),
      //     getItem("积分", "about", <TrophyOutlined />),
      //   ],
      //   "group"
      // ),
      getItem(
        t("settings.member"),
        "member",
        undefined,
        [
          getItem(
            t("settings.member-info"),
            ConfigurationEnum.MembersInfo,
            <CrownOutlined />
          ),
          getItem(t("settings.bill"), "bill", <FileTextOutlined />),
        ],
        "group"
      ),
      // getItem(
      //   "开发者",
      //   "developer",
      //   "",
      //   [
      //     getItem("Token", "token", <SecurityScanOutlined />),
      //     getItem("授权", "authorize", <KeyOutlined />),
      //   ],
      //   "group"
      // ),
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
