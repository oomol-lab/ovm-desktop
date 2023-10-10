import styles from "./SigninAgreement.module.scss";

import { Checkbox } from "antd";
import { useTranslate } from "val-i18n-react";

export interface SigninAgreementProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  privacyURL?: string;
  serviceURL?: string;
}

export const SigninAgreement: React.FC<SigninAgreementProps> = ({
  checked,
  onChange,
  privacyURL,
  serviceURL,
}) => {
  const t = useTranslate();

  return (
    <div className={styles.container}>
      <Checkbox checked={checked} onChange={ev => onChange(ev.target.checked)}>
        {t("signin-panel.have-read-and-agree")}{" "}
        <a href={privacyURL} rel="noreferrer" target="_blank">
          {t("signin-panel.privacy-agreement")}
        </a>{" "}
        {t("signin-panel.and")}{" "}
        <a href={serviceURL} rel="noreferrer" target="_blank">
          {t("signin-panel.service-policy")}
        </a>
      </Checkbox>
    </div>
  );
};
