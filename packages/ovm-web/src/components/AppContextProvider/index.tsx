import type { AppContext } from "~/routes";

import { createContext } from "react";

export const AppContextContext = createContext<AppContext | null>(null);

export const AppContextProvider = ({
  children,
  context,
}: React.PropsWithChildren<{ context: AppContext }>) => (
  <AppContextContext.Provider value={context}>
    {children}
  </AppContextContext.Provider>
);
