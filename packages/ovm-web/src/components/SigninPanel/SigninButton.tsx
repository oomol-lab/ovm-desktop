import styles from "./SigninButton.module.scss";

import githubSVG from "./icons/github.svg";
import googleSVG from "./icons/google.svg";
import wechatSVG from "./icons/wechat.svg";

export interface SigninButtonProps {
  provider: SigninButtonProviderType;
  text?: string;
  onClick: (provider: SigninButtonProviderType) => void;
}

const svgDict = {
  wechat: wechatSVG,
  github: githubSVG,
  google: googleSVG,
} as const;

export type SigninButtonProviderType = keyof typeof svgDict;

export const SigninButton: React.FC<SigninButtonProps> = ({
  provider,
  text,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles[`button-${provider}`]}`}
        onClick={() => onClick(provider)}
      >
        <img alt={provider} src={svgDict[provider]} />
      </button>
      <span>{text || provider}</span>
    </div>
  );
};
