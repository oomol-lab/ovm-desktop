import type { Val } from "value-enhancer";

import { useLocation } from "react-router-dom";
import { useVal } from "use-value-enhancer";
import { HomeTitleBarLayout } from "~/components/HomeTitleBar";
import { UserAvatar } from "~/components/UserAvatar";
import { UserNotification } from "~/components/UserNotification";
import { OS } from "~/constants";
import { useIsomorphicLayoutEffect, useOS } from "~/hooks";

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
  return <>{titleBar || <DefaultHomeTitleBar />}</>;
};

const DefaultHomeTitleBar = () => {
  const os = useOS();
  return (
    <HomeTitleBarLayout
      footer={
        os === OS.Mac && (
          <>
            <UserNotification os={os} />
            <UserAvatar os={os} src={"https://placekitten.com/64/64"} />
          </>
        )
      }
    />
  );
};
