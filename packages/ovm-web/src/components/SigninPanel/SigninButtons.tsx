import styles from "./SigninButtons.module.scss";

import type { SigninButtonProviderType } from "./SigninButton";

import { SigninButton } from "./SigninButton";

export type { SigninButtonProviderType };

export type SigninButtonsDescription = Array<{
  provider: SigninButtonProviderType;
  text?: string | undefined;
}>;

export interface SigninButtonsProps {
  buttons: SigninButtonsDescription;
  onClick: (provider: SigninButtonProviderType) => void;
}

export const SigninButtons: React.FC<SigninButtonsProps> = ({
  buttons,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      {buttons.map(({ provider, text }) => (
        <SigninButton
          key={provider}
          provider={provider}
          text={text}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
