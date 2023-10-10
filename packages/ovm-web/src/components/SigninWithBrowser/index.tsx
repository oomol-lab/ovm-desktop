import styles from "./SigninWithBrowser.module.scss";

import { Button } from "antd";

export interface SigninWithBrowserProps {
  isError?: boolean;
  signinSrc: string;
  signupSrc: string;
}

export const SigninWithBrowser: React.FC<SigninWithBrowserProps> = ({
  isError,
  signinSrc,
  signupSrc,
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in to OOMOL Studio</h1>
      {isError && (
        <p className={styles.errorText}>
          An error has occurred. Please try again.
        </p>
      )}
      <Button href={signinSrc} className={styles.button}>
        <p className={styles.buttonText}>Sign in with browser</p>
      </Button>
      <div className={styles.subTextBox}>
        <p className={styles.subText}>No a account?</p>
        <a className={styles.link} href={signupSrc}>
          Create one
        </a>
      </div>
    </div>
  );
};
