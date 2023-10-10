import styles from "./Account.module.scss";

import { Button } from "antd";
import { useState, useEffect } from "react";
import { useTranslate } from "val-i18n-react";
import { useAppContext } from "~/hooks";

import { AccountList } from "./AccountList";
import { LinkAccountList } from "./LinkAccountList";

export type AccountInfoType = {
  key: string;
  state: boolean;
  name: string;
  account: string;
};

export type LinkAccountType = {
  key: string;
  state: boolean;
  icon: string;
  name: string;
};

export interface AppContext {
  getOoAccountInfo: () => Promise<AccountInfoType[]>;
  getOoLinkAccounts: (
    _page?: number,
    count?: number
  ) => Promise<LinkAccountType[]>;
}

const accountListLength = 4;
const linkAccountListLength = 4;

export const Account = () => {
  const t = useTranslate();
  const { getOoAccountInfo, getOoLinkAccounts } = useAppContext();
  const [accountInfoItems, setAccountInfoItems] = useState<AccountInfoType[]>(
    []
  );
  const [linkAccountItems, setLinkAccountItems] = useState<LinkAccountType[]>(
    []
  );

  const [accountInfoLoading, setAccountInfoLoading] = useState<boolean>(true);
  const [linkAccountLoading, setLinkAccountLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    getOoAccountInfo().then(res => {
      if (isMounted) {
        setAccountInfoItems(res);
        setAccountInfoLoading(false);
      }
    });

    getOoLinkAccounts(1, linkAccountListLength).then(res => {
      if (isMounted) {
        setLinkAccountItems(res);
        setLinkAccountLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles["account-container"]}>
      <div className={styles["title-container"]}>
        <div className={styles["account-title"]}>
          {t("settings.account-binding")}
        </div>
      </div>
      <AccountList
        accountInfoList={accountInfoItems}
        skeletonLength={accountListLength}
        loading={accountInfoLoading}
      />
      <div className={styles["title-container"]}>
        <div className={styles["account-title"]}>
          {t("settings.bind-account")}
        </div>
        <div className={styles["account-description"]}>
          {t("settings.bind-account-description")}
        </div>
      </div>
      <LinkAccountList
        linkAccountList={linkAccountItems}
        skeletonLength={linkAccountListLength}
        loading={linkAccountLoading}
      />
      <div className={styles["title-container"]}>
        <div className={styles["account-title"]}>
          {t("settings.delete-account")}
        </div>
      </div>
      <Button danger>{t("settings.delete-account")}</Button>
    </div>
  );
};
