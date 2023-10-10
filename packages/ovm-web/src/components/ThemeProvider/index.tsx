import "./ThemeProvider.scss";

import type { PropsWithChildren, ReactElement } from "react";

import { createContext, useContext } from "react";
import { useDarkMode } from "~/hooks";

export interface ThemeData {
  // TODO: add theme data
}

export interface ThemeProviderProps {}

const ThemeContext = createContext<ThemeData | null>(null);

export const ThemeProvider = ({
  children,
}: PropsWithChildren<ThemeProviderProps>): ReactElement => {
  const darkMode = useDarkMode();

  return (
    <ThemeContext.Provider value={null}>
      <div
        className={`oomol-theme-root ${
          darkMode ? "oomol-theme-dark" : "oomol-theme-light"
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeData = (): ThemeData => {
  const data = useContext(ThemeContext);
  if (!data) {
    throw new Error("Must be used within a ThemeProvider");
  }
  return data;
};
