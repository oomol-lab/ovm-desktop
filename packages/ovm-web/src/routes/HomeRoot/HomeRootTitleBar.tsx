import type { Val } from "value-enhancer";

import { useLocation } from "react-router-dom";
import { useVal } from "use-value-enhancer";
import { useIsomorphicLayoutEffect } from "~/hooks";

export interface HomeRootTitleBarProps {
  titleBar$: Val<React.ReactNode>;
}

export const HomeRootTitleBar = ({ titleBar$ }: HomeRootTitleBarProps) => {
  const titleBar = useVal(titleBar$, true);
  const location = useLocation();
  useIsomorphicLayoutEffect(
    () => () => {
      titleBar$.set(null);
    },
    [location]
  );
  return titleBar;
};
