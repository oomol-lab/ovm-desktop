import "virtual:uno.css";

import type { Decorator, Parameters, Preview } from "@storybook/react";

import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import React, { useEffect } from "react";
import { I18nProvider } from "val-i18n-react";
import { i18n } from "./i18n";

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expands: true,
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      oomolDesktop: {
        name: "OOMOL Desktop",
        styles: { width: "960px", height: "640px" },
      },
    },
  },
};

const preview: Preview = {
  globalTypes: {
    prefersColorScheme: {
      name: "Prefers Color Scheme",
      description: "Prefers Color Scheme",
      defaultValue: "auto",
      toolbar: {
        icon: "paintbrush",
        items: ["auto", "light", "dark"],
      },
    },
    locale: {
      name: "Internationalization locale",
      description: "Prefers Color Scheme",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", right: "🇺🇸", title: "English" },
          { value: "zh-CN", right: "🇨🇳", title: "简体中文" },
        ],
      },
    },
  },
};

export default preview;

const I18nDecorator: Decorator<{ locale: string }> = (
  Story,
  { globals: { locale } }
) => {
  useEffect(() => {
    i18n.switchLang(locale);
  }, [i18n, locale]);

  return <I18nProvider i18n={i18n}>{Story()}</I18nProvider>;
};

export const decorators: Decorator<any>[] = [I18nDecorator];
