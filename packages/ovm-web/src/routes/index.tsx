import type { AppContext as UpgradeContext } from "./Settings/Upgrade";
import type { OVMStore } from "../store";
import type { ConnectionClientService } from "@oomol/connection";
import type {
  WindowService,
  SigninService,
  OVMService,
} from "@oomol-lab/ovm-service/common";
import type { ReadonlyVal } from "value-enhancer";
import type { OSLiteral } from "~/constants";

import { useMemo } from "react";
import {
  Navigate,
  RouterProvider,
  createHashRouter,
  generatePath,
} from "react-router-dom";
import { Volumes } from "~/routes/Volumes";

import { RoutePath } from "./constants";
import { Containers } from "./Containers";
import { HomeRoot } from "./HomeRoot";
import { Images } from "./Images";
import { ConfigurationEnum, Settings } from "./Settings";

export type AppContext = {
  os$: ReadonlyVal<OSLiteral>;
  darkMode$: ReadonlyVal<boolean>;
  windowService?: ConnectionClientService<WindowService>;
  signinService: ConnectionClientService<SigninService>;
  ovmService: ConnectionClientService<OVMService>;
  ovmStore: OVMStore;
} & UpgradeContext;

const createRouter = () =>
  createHashRouter([
    {
      path: RoutePath.Root,
      children: [
        {
          path: RoutePath.Root,
          element: <Navigate to={RoutePath.Containers} replace />,
        },
        {
          path: RoutePath.HomeRoot,
          element: <HomeRoot />,
          children: [
            {
              path: RoutePath.HomeRoot,
              element: <Navigate to={RoutePath.Containers} replace />,
            },
            {
              path: RoutePath.Containers,
              element: <Containers />,
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
              path: RoutePath.Images,
              element: <Images />,
            },
            {
              path: RoutePath.Volumes,
              element: <Volumes />,
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
