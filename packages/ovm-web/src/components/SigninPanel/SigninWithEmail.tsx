/* eslint-disable @typescript-eslint/no-misused-promises */
import styles from "./SigninWithEmail.module.scss";

import type { SigninAgreementProps } from "./SigninAgreement";
import type {
  SigninButtonProviderType,
  SigninButtonsDescription,
} from "./SigninButtons";

import { Button, Input, message, Modal } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useTranslate } from "val-i18n-react";
import { useIsUnMounted, useSafePromise } from "~/hooks/use-safe-promise";

import checkedSVG from "./icons/checked.svg";
import emailSVG from "./icons/email.svg";
import lockSVG from "./icons/lock.svg";
import { SigninAgreement } from "./SigninAgreement";
import { SigninButtons } from "./SigninButtons";
import { SigninContent } from "./SigninContent";
import { SigninTitle } from "./SigninTitle";

const emailRegex = /^[^\s.:@](?:[^\s:@]*[^\s.:@])?@[^\s.@]+(?:\.[^\s.@]+)*$/;

const usernameRegex = /^[\dA-Za-z]+(-?[\dA-Za-z])+$/;

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

function validateUsername(username: string): boolean {
  return usernameRegex.test(username);
}

function validateEmailOrUsername(emailOrUsername: string): boolean {
  return validateEmail(emailOrUsername) || validateUsername(emailOrUsername);
}

function validateProfileName(profileName: string): boolean {
  if (profileName.length < 1) {
    return false;
  }

  const encoder = new TextEncoder();
  for (const char of profileName) {
    if (encoder.encode(char).length > 3) {
      return false;
    }
  }

  return true;
}

function validatePassword(password: string): boolean {
  return password.length >= 8 && password.length <= 64;
}

export interface RequestAgreementParams {
  privacyURL?: string;
  serviceURL?: string;
}

export interface SigninWithEmailProps {
  buttons?: SigninButtonProviderType[];
  privacyURL?: SigninAgreementProps["privacyURL"];
  serviceURL?: SigninAgreementProps["serviceURL"];
  sendVerificationCode: (email: string) => Promise<boolean>;
  sendResetPasswordCode: (email: string) => Promise<boolean>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  resetPassword: (
    email: string,
    code: string,
    password: string
  ) => Promise<boolean>;
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    profileName: string,
    password: string
  ) => Promise<boolean>;
  signinWithGitHub: () => Promise<{
    username: string;
    profileName: string;
  } | void>;
  signupWithThirdParty: (
    username: string,
    profileName: string
  ) => Promise<boolean>;
  jumpToHomePage: () => void;
}

export const SigninWithEmail: React.FC<SigninWithEmailProps> = ({
  buttons: userButtons,
  privacyURL,
  serviceURL,
  sendVerificationCode,
  sendResetPasswordCode,
  verifyEmail,
  resetPassword,
  signin,
  signup,
  signinWithGitHub,
  signupWithThirdParty,
  jumpToHomePage,
}) => {
  const t = useTranslate();
  const sp = useSafePromise();

  const buttons = useMemo<SigninButtonsDescription>(
    () =>
      userButtons
        ? userButtons.map(e => ({ provider: e, text: t(`signin-${e}`) }))
        : [
            { provider: "google", text: t("signin-panel.google") },
            { provider: "github", text: t("signin-panel.github") },
          ],
    [t, userButtons]
  );

  const isUnMountRef = useIsUnMounted();
  const [page, setPage] = useState<
    | "signin"
    | "verify-email"
    | "signup"
    | "third-party-signup"
    | "reset-password"
  >("signin");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profileName, setProfileName] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [code, setCode] = useState("");
  const [clickedSignin, setClickedSignin] = useState(false);
  const [clickedSignup, setClickedSignup] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [isSettingPassword, setSettingPassword] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const canSignin =
    !clickedSignin &&
    !clickedSignup &&
    validateEmailOrUsername(emailOrUsername) &&
    validatePassword(password);

  function requestAgreement({
    privacyURL,
    serviceURL,
  }: RequestAgreementParams): Promise<boolean> {
    return new Promise<boolean>(resolve =>
      Modal.confirm({
        content: (
          <div>
            {t("signin-panel.have-read-and-agree")}{" "}
            <a href={privacyURL} rel="noreferrer" target="_blank">
              {t("signin-panel.privacy-agreement")}
            </a>{" "}
            {t("signin-panel.and")}{" "}
            <a href={serviceURL} rel="noreferrer" target="_blank">
              {t("signin-panel.service-policy")}
            </a>
          </div>
        ),
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      })
    );
  }

  function validateCode(code: string): boolean {
    return code.length === 8;
  }

  const doSignin = useCallback(async () => {
    if (!agreed) {
      if (!(await requestAgreement({ privacyURL, serviceURL }))) {
        return;
      }
      setAgreed(true);
    }
    setClickedSignin(true);
    if (await sp(signin(emailOrUsername, password))) {
      await new Promise(resolve => setTimeout(resolve, 60_000));
    } else {
      void message.info(t("signin-panel.signin-failed"));
    }
    setClickedSignin(false);
  }, [
    agreed,
    emailOrUsername,
    signin,
    password,
    privacyURL,
    serviceURL,
    sp,
    t,
  ]);

  const doSignup = useCallback(async () => {
    if (!agreed) {
      if (!(await requestAgreement({ privacyURL, serviceURL }))) {
        return;
      }
      setAgreed(true);
    }
    setClickedSignup(true);
    setPage("verify-email");
    setClickedSignup(false);
  }, [agreed, privacyURL, serviceURL, sp, t]);

  const handleSignup = useCallback(async () => {
    if (
      validateUsername(username) &&
      validateProfileName(profileName) &&
      validatePassword(password)
    ) {
      setClickedSignup(true);
      if (await sp(signup(username, profileName, password))) {
        jumpToHomePage();
      } else {
        void message.info(t("signin-panel.signup-failed"));
      }
      setClickedSignup(false);
    }
  }, [username, profileName, password, signup]);

  const forgotPassword = useCallback(async () => {
    if (!agreed) {
      if (!(await requestAgreement({ privacyURL, serviceURL }))) {
        return;
      }
      setAgreed(true);
    }
    setPage("reset-password");
  }, [agreed, privacyURL, serviceURL]);

  const sendCode = useCallback(
    async (sendCodeFn: (email: string) => Promise<boolean>) => {
      if (validateEmail(email)) {
        setSendingCode(true);
        const sent = await sp(sendCodeFn(email));
        setSendingCode(false);
        if (sent) {
          void message.info(t("signin-panel.sent-verify-code-email"));
          let count = 60;
          setCountdown(count);
          const timer = setInterval(() => {
            if (isUnMountRef.current) {
              clearInterval(timer);
              return;
            }
            setCountdown(--count);
            if (count === 0) {
              clearInterval(timer);
            }
          }, 1000);
        } else {
          void message.error(t("signin-panel.send-verify-code-failed"));
        }
      }
    },
    [isUnMountRef, email, sendVerificationCode, sp, t]
  );

  const sendVerifyCode = useCallback(async () => {
    await sendCode(() => sendVerificationCode(email));
  }, [email, sendVerificationCode]);

  const sendResetCode = useCallback(async () => {
    await sendCode(() => sendResetPasswordCode(email));
  }, [email, sendResetPasswordCode]);

  const doVerifyEmail = useCallback(async () => {
    if (validateEmail(email) && validateCode(code)) {
      setVerifiedCode(false);
      setVerifyingCode(true);
      const verified = await sp(verifyEmail(email, code));
      setVerifyingCode(false);
      if (verified) {
        setPage("signup");
        setVerifiedCode(true);
      } else {
        void message.info(t("signin-panel.incorrect-code"));
      }
    }
  }, [code, email, sp, t, verifyEmail]);

  const doResetPassword = useCallback(async () => {
    if (
      validateEmail(email) &&
      validateCode(code) &&
      validatePassword(password)
    ) {
      setSettingPassword(true);
      await sp(resetPassword(email, code, password));
      void message.info(t(""));
      if (await sp(signin(email, password))) {
        jumpToHomePage();
      } else {
        void message.info(t("signin-panel.has-reset-password"));
      }
      setSettingPassword(false);
    }
  }, [code, email, signin, password, resetPassword, sp, t, verifiedCode]);

  const thirdPartyAuthHandler = useCallback(
    async (signinChannel: SigninButtonProviderType) => {
      switch (signinChannel) {
        case "github": {
          const isSignedUp = await signinWithGitHub();
          if (isSignedUp) {
            const { username, profileName } = isSignedUp;
            setPage("third-party-signup");
            setUsername(username);
            setProfileName(profileName);
          }
          return;
        }
        case "google": {
          return;
        }
        default: {
          return;
        }
      }
    },
    [signinWithGitHub]
  );

  const onClick = useCallback(
    async (provider: SigninButtonProviderType) => {
      if (!agreed) {
        if (!(await requestAgreement({ privacyURL, serviceURL }))) {
          return;
        }
        setAgreed(true);
      }
      await thirdPartyAuthHandler(provider);
    },
    [agreed, privacyURL, serviceURL]
  );

  const thirdPartySignup = useCallback(async () => {
    if (validateUsername(username) && validateProfileName(profileName)) {
      setClickedSignup(true);
      if (await sp(signupWithThirdParty(username, profileName))) {
        jumpToHomePage();
      } else {
        void message.info(t("signin-panel.signup-failed"));
      }
      setClickedSignup(false);
    }
  }, [username, profileName, signupWithThirdParty]);

  function renderSigninPage(): React.ReactNode {
    return (
      <div className={styles.container}>
        <div className={styles.limiter}>
          <SigninTitle />
          <Input
            placeholder={t("signin-panel.enter-email-or-username")}
            prefix={<img alt="email" src={emailSVG} />}
            status={
              !emailOrUsername || validateEmailOrUsername(emailOrUsername)
                ? undefined
                : "error"
            }
            type="email"
            value={emailOrUsername}
            onChange={ev => setEmailOrUsername(ev.currentTarget.value)}
          />
          <div className={styles.passwordBtnWrapper}>
            <Input.Password
              placeholder={t("signin-panel.enter-password")}
              prefix={<img alt="password" src={lockSVG} />}
              value={password}
              onChange={ev => setPassword(ev.currentTarget.value)}
              onPressEnter={doSignin}
            />
            <Button
              className={styles.forgotPasswordBtn}
              disabled={clickedSignin || clickedSignup}
              type="link"
              onClick={forgotPassword}
            >
              {t("signin-panel.forgot")}
            </Button>
          </div>
          <SigninAgreement
            checked={agreed}
            privacyURL={privacyURL}
            serviceURL={serviceURL}
            onChange={setAgreed}
          />
          <Button
            className={`${styles.bigButton} ${styles.signinBtn}`}
            disabled={!canSignin}
            loading={clickedSignin}
            type="primary"
            onClick={doSignin}
          >
            {t("signin-panel.signin")}
          </Button>
          <Button
            className={styles.bigButton}
            loading={clickedSignup}
            type="link"
            onClick={doSignup}
          >
            {t("signin-panel.signup")}
          </Button>
        </div>
        <div className={styles.splitter}>
          <span className={styles.splitterText}>
            {t("signin-panel.also-signin-with")}
          </span>
        </div>
        <SigninButtons buttons={buttons} onClick={onClick} />
      </div>
    );
  }

  function renderVerifyEmailPage(): React.ReactNode {
    return (
      <div className={`${styles.container} ${styles.forgotPasswordBtn}`}>
        <div className={styles.limiter}>
          <SigninTitle
            subtitle=" "
            title={t("signin-panel.reset-password-by-email")}
          />
          <Input
            placeholder={t("signin-panel.enter-email")}
            prefix={<img alt="email" src={emailSVG} />}
            status={!email || validateEmail(email) ? undefined : "error"}
            type="email"
            value={email}
            onChange={ev => setEmail(ev.currentTarget.value)}
          />
          <Input
            placeholder={t("signin-panel.enter-code")}
            prefix={<img alt="code" src={checkedSVG} />}
            suffix={
              countdown > 0 ? (
                <span className="signin-countdown">Resend: {countdown}</span>
              ) : (
                <Button
                  disabled={sendingCode || !validateEmail(email)}
                  loading={sendingCode}
                  size="small"
                  type="link"
                  onClick={sendVerifyCode}
                >
                  {t("signin-panel.send-verify-code")}
                </Button>
              )
            }
            value={code}
            maxLength={8}
            onChange={ev => setCode(ev.currentTarget.value)}
          />
          <Button
            className={`${styles.bigButton} ${styles.nextBtn}`}
            disabled={
              verifyingCode || !validateEmail(email) || !validateCode(code)
            }
            loading={verifyingCode}
            type="primary"
            onClick={doVerifyEmail}
          >
            {t("signin-panel.next-step")}
          </Button>
          <Button
            className={styles.bigButton}
            disabled={verifyingCode}
            type="link"
            onClick={() => setPage("signin")}
          >
            {t("signin-panel.back")}
          </Button>
        </div>
      </div>
    );
  }

  function renderResetPasswordPage(): React.ReactNode {
    return (
      <div className={`${styles.container} ${styles.forgotPasswordBtn}`}>
        <div className={styles.limiter}>
          <SigninTitle
            subtitle=" "
            title={t("signin-panel.set-new-password")}
          />
          <Input
            placeholder={t("signin-panel.enter-password")}
            prefix={<img alt="email" src={emailSVG} />}
            status={!email || validateEmail(email) ? undefined : "error"}
            type="email"
            value={email}
            onChange={ev => setEmail(ev.currentTarget.value)}
          />
          <Input
            placeholder={t("signin-panel.enter-code")}
            prefix={<img alt="code" src={checkedSVG} />}
            suffix={
              countdown > 0 ? (
                <span className="signin-countdown">Resend: {countdown}</span>
              ) : (
                <Button
                  disabled={sendingCode || !validateEmail(email)}
                  loading={sendingCode}
                  size="small"
                  type="link"
                  onClick={sendResetCode}
                >
                  {t("signin-panel.send-verify-code")}
                </Button>
              )
            }
            value={code}
            maxLength={8}
            onChange={ev => setCode(ev.currentTarget.value)}
          />
          <Input.Password
            placeholder={t("signin-panel.enter-password")}
            prefix={<img alt="password" src={lockSVG} />}
            value={password}
            onChange={ev => setPassword(ev.currentTarget.value)}
          />
          <Button
            className={`${styles.bigButton} ${styles.nextBtn}`}
            disabled={
              isSettingPassword ||
              !validateEmail(email) ||
              !validatePassword(password)
            }
            loading={isSettingPassword}
            type="primary"
            onClick={doResetPassword}
          >
            {t("signin-panel.confirm-and-signin")}
          </Button>
          <Button
            className={styles.bigButton}
            disabled={isSettingPassword}
            type="link"
            onClick={() => setPage("signin")}
          >
            {t("signin-panel.back")}
          </Button>
        </div>
      </div>
    );
  }

  function renderSignupPage(): React.ReactNode {
    return (
      <div className={`${styles.container} ${styles.forgotPasswordBtn}`}>
        <div className={styles.limiter}>
          <SigninTitle />
          <Input
            placeholder={"username"}
            // TODO: 更换对应 icon @Cheerego7
            prefix={<img alt="email" src={emailSVG} />}
            status={
              !username || validateUsername(username) ? undefined : "error"
            }
            value={username}
            onChange={ev => setUsername(ev.currentTarget.value)}
          />
          <Input
            placeholder={"profileName"}
            // TODO: 更换对应 icon @Cheerego7
            prefix={<img alt="email" src={emailSVG} />}
            status={
              !profileName || validateProfileName(profileName)
                ? undefined
                : "error"
            }
            value={profileName}
            onChange={ev => setProfileName(ev.currentTarget.value)}
            maxLength={255}
          />
          <div className="signin-with-email-password-btn-wrapper">
            <Input.Password
              placeholder={t("signin-panel.enter-password")}
              prefix={<img alt="password" src={lockSVG} />}
              status={
                !password || validatePassword(password) ? undefined : "error"
              }
              value={password}
              onChange={ev => setPassword(ev.currentTarget.value)}
              maxLength={64}
            />
          </div>
          <Button
            className="signin-big-button"
            loading={clickedSignup}
            type="link"
            onClick={handleSignup}
          >
            {t("signin-panel.signup")}
          </Button>
        </div>
      </div>
    );
  }

  function renderSignupWithThirdPartyPage(): React.ReactNode {
    return (
      <div className={`${styles.container} ${styles.forgotPasswordBtn}`}>
        <div className={styles.limiter}>
          <SigninTitle />
          <Input
            placeholder={t("signin-panel.username")}
            // TODO: 更换对应 icon @Cheerego7
            prefix={<img alt="email" src={emailSVG} />}
            status={
              !username || validateUsername(username) ? undefined : "error"
            }
            value={username}
            onChange={ev => setUsername(ev.currentTarget.value)}
          />
          <Input
            placeholder={t("signin-panel.profile-name")}
            // TODO: 更换对应 icon @Cheerego7
            prefix={<img alt="email" src={emailSVG} />}
            status={
              !profileName || validateProfileName(profileName)
                ? undefined
                : "error"
            }
            value={profileName}
            onChange={ev => setProfileName(ev.currentTarget.value)}
            maxLength={255}
          />
          <Button
            className={`${styles.bigButton} ${styles.signinBtn}`}
            disabled={
              !validateUsername(username) || !validateProfileName(profileName)
            }
            type="primary"
            loading={clickedSignup}
            onClick={thirdPartySignup}
          >
            {t("signin-panel.signup-and-signin")}
          </Button>
          <Button
            className={styles.bigButton}
            disabled={isSettingPassword}
            type="link"
            onClick={() => setPage("signin")}
          >
            {t("signin-panel.back")}
          </Button>
        </div>
      </div>
    );
  }

  function renderSigninContent(
    page:
      | "signin"
      | "verify-email"
      | "signup"
      | "third-party-signup"
      | "reset-password"
  ): React.ReactNode {
    switch (page) {
      case "signin": {
        return renderSigninPage();
      }
      case "verify-email": {
        return renderVerifyEmailPage();
      }
      case "signup": {
        return renderSignupPage();
      }
      case "third-party-signup": {
        return renderSignupWithThirdPartyPage();
      }
      case "reset-password": {
        return renderResetPasswordPage();
      }
      default: {
        return renderSigninPage();
      }
    }
  }

  return (
    <SigninContent transitionKey={page}>
      {renderSigninContent(page)}
    </SigninContent>
  );
};
