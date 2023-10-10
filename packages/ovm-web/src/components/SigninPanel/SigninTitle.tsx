import styles from "./SigninTitle.module.scss";

import { useTranslate } from "val-i18n-react";

import logoSVG from "./icons/oomol-logo.svg";

export interface SigninTitleProps {
  title?: string;
  subtitle?: string;
}

export const SigninTitle: React.FC<SigninTitleProps> = ({ subtitle }) => {
  const t = useTranslate();
  return (
    <div className={styles.container}>
      <img src={logoSVG} alt="oomol logo" />
      <p className={styles.subtext}>
        {subtitle || t("signin-panel.signin-title-subtitle")}
      </p>
    </div>
  );
};
