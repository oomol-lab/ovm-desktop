import type { AppContext as PreferencesContext } from "./Settings/Preferences";
import type { AppContext as UpgradeContext } from "./Settings/Upgrade";
import type {
  WindowService,
  SigninService,
} from "../../../ovm-service/src/common";
import type { ConnectionClientService } from "@oomol/connection";
import type { ReadonlyVal } from "value-enhancer";
import type { OSLiteral } from "~/constants";

import { useMemo } from "react";
import {
  Navigate,
  RouterProvider,
  createHashRouter,
  generatePath,
} from "react-router-dom";
import { Secrets } from "~/routes/Secrets";

import { Community } from "./Community";
import { RoutePath } from "./constants";
import { HomeRoot } from "./HomeRoot";
import { Projects } from "./Projects";
import { ConfigurationEnum, Settings } from "./Settings";

export type AppContext = {
  os$: ReadonlyVal<OSLiteral>;
  darkMode$: ReadonlyVal<boolean>;
  windowService?: ConnectionClientService<WindowService>;
  signinService: ConnectionClientService<SigninService>;
} & UpgradeContext &
  PreferencesContext;

const createRouter = () =>
  createHashRouter([
    {
      path: RoutePath.Root,
      children: [
        {
          path: RoutePath.Root,
          element: <Navigate to={RoutePath.Projects} replace />,
        },
        {
          path: RoutePath.HomeRoot,
          element: <HomeRoot />,
          children: [
            {
              path: RoutePath.HomeRoot,
              element: <Navigate to={RoutePath.Projects} replace />,
            },
            {
              path: RoutePath.Projects,
              element: <Projects />,
            },
            {
              path: RoutePath.SettingsMenu,
              element: <Settings />,
            },
            {
              path: RoutePath.Settings,
              element: (
                <Navigate
                  to={generatePath(RoutePath.SettingsMenu, {
                    menuKey: ConfigurationEnum.Preferences,
                  })}
                  replace
                />
              ),
            },
            {
              path: RoutePath.Community,
              element: <Community />,
            },
            {
              path: RoutePath.Secrets,
              element: <Secrets />,
            },
          ],
        },
      ],
    },
  ]);

export const Routes = () => {
  const router = useMemo(createRouter, []);

  return <RouterProvider router={router} />;
};
