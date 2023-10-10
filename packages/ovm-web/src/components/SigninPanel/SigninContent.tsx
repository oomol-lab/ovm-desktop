import styles from "./SigninContent.module.scss";

import { CSSTransition, TransitionGroup } from "react-transition-group";

export interface SigninContentProps {
  transitionKey: React.Key;
  children: React.ReactNode;
}

export const SigninContent: React.FC<SigninContentProps> = ({
  transitionKey,
  children,
}) => {
  return (
    <TransitionGroup className={styles.container}>
      <CSSTransition
        key={transitionKey}
        unmountOnExit
        classNames={{
          enter: styles.sliderInEnter,
          exit: styles.sliderInExit,
          enterActive: styles.sliderInEnterActive,
          exitActive: styles.sliderInExitActive,
        }}
        timeout={400}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
