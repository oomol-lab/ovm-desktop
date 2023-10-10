import styles from "./MacWindowControls.module.scss";

/**
 * For vite dev, displaying the macOS Window Control Buttons on the top left.
 */
export const MacWindowControls = () => {
  return (
    <div className={styles.buttons}>
      <div className={styles.close}></div>
      <div className={styles.minimize}></div>
      <div className={styles.maximize}></div>
    </div>
  );
};
