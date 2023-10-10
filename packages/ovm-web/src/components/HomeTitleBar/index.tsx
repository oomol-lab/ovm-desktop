import styles from "./HomeTitleBar.module.scss";

import type { RouteOutletContext } from "~/routes/typings";

import { createElement, memo, useMemo } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { useTranslate } from "val-i18n-react";
import { useIsomorphicLayoutEffect } from "~/hooks";

/**
 * Set its children to the title bar.
 */
export const TitleBarSetter = /* @__PURE__ */ memo<React.PropsWithChildren>(
  ({ children }) => {
    const setChild = useOutletContext<RouteOutletContext>();
    useIsomorphicLayoutEffect(() => {
      setChild(children);
    }, [children, setChild]);
    return null;
  }
);

export interface HomeTitleBarProps {
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * A default title bar UI.
 */
export const HomeTitleBarLayout = ({ title, footer }: HomeTitleBarProps) => {
  const t = useTranslate();
  const { pathname } = useLocation();
  const name = useMemo(() => {
    if (title) {
      return title;
    }
    const routeName = (/^\/home\/([^/]+)/.exec(pathname) || ["", ""])[1];
    return routeName && t(`${routeName}.title`);
  }, [title, t, pathname]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};

/**
 * Set a default UI to the title bar.
 */
export const HomeTitleBar = (props: HomeTitleBarProps) => (
  <TitleBarSetter>{createElement(HomeTitleBarLayout, props)}</TitleBarSetter>
);
