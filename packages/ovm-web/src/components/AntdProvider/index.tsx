import type { MappingAlgorithm } from "antd";
import type { PropsWithChildren } from "react";

import { ConfigProvider, theme } from "antd";
import { useMemo } from "react";
import { useDarkMode } from "~/hooks";

export const antdDarkTheme: MappingAlgorithm = (seedToken, mapToken) => ({
  ...theme.darkAlgorithm(seedToken, mapToken),
  colorBgLayout: "#161B22",
});

export const antdLightTheme: MappingAlgorithm = seedToken => ({
  ...theme.defaultAlgorithm(seedToken),
  colorBgLayout: "#ecf0f7",
});

export const AntdProvider = ({ children }: PropsWithChildren) => {
  const darkMode = useDarkMode();
  const theme = useMemo(
    () => ({
      token: {
        colorPrimary: "#7d7fe9",
      },
      algorithm: darkMode ? antdDarkTheme : antdLightTheme,
    }),
    [darkMode]
  );
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};
