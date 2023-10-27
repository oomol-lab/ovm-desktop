import type { AppContext } from "./routes";
import type { PropsWithChildren } from "react";
import type { ReadonlyVal } from "value-enhancer";

import { I18nProvider } from "val-i18n-react";

import { AntdProvider } from "./components/AntdProvider";
import { AppContextProvider } from "./components/AppContextProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { useI18nLoader } from "./hooks";
import { Routes } from "./routes";

export interface StudioHomeProps {
  localeLang$: ReadonlyVal<string | undefined>;
  appContext: AppContext;
}

export const StudioHome = ({
  localeLang$,
  appContext,
  children,
}: PropsWithChildren<StudioHomeProps>) => {
  const i18n = useI18nLoader(localeLang$);

  if (!i18n) {
    return null; // blank page
  }

  return (
    <AppContextProvider context={appContext}>
      <I18nProvider i18n={i18n}>
        <ThemeProvider>
          <AntdProvider>
            <Routes />
            {children}
          </AntdProvider>
        </ThemeProvider>
      </I18nProvider>
    </AppContextProvider>
  );
};
