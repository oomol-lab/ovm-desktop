import type { OSLiteral } from "~/constants";
import type { AppContext } from "~/routes";

import { useContext } from "react";
import { useVal } from "use-value-enhancer";
import { AppContextContext } from "~/components/AppContextProvider";

export const useAppContext = (): Readonly<AppContext> => {
  const appContext = useContext(AppContextContext);
  if (!appContext) {
    throw new Error("AppContextProvider not found");
  }
  return appContext;
};

export const useOS = (): OSLiteral => useVal(useAppContext().os$);

export const useDarkMode = (): boolean => useVal(useAppContext().darkMode$);
