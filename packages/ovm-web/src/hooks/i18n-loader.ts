import type { Locale, LocaleLang } from "val-i18n";
import type { ReadonlyVal } from "value-enhancer";

import { useEffect } from "react";
import { I18n, detectLang } from "val-i18n";
import { joinDisposers } from "~/misc/utils";

import { useAsyncMemo } from "./use-async-memo";

const i18nLoader = (lang?: string): Promise<I18n> => {
  const localeModules = import.meta.glob<boolean, string, Locale>(
    "~/locales/*.json",
    {
      import: "default",
    }
  );

  const localeLoaders = Object.keys(localeModules).reduce((loaders, path) => {
    if (localeModules[path]) {
      const langMatch = path.match(/\/([^/]+)\.json$/);
      if (langMatch) {
        loaders[langMatch[1]] = localeModules[path];
      }
    }
    return loaders;
  }, {} as Record<LocaleLang, () => Promise<Locale>>);

  const langs = Object.keys(localeLoaders);

  return I18n.preload(
    lang || detectLang(langs) || (localeLoaders.en ? "en" : langs[0]),
    lang => localeLoaders[lang]()
  );
};

export const useI18nLoader = (
  localeLang$: ReadonlyVal<string | undefined>
): I18n | undefined => {
  const maybeI18n = useAsyncMemo(() => i18nLoader(localeLang$.value), []);
  useEffect(
    () =>
      joinDisposers(
        localeLang$.subscribe(lang => lang && void maybeI18n?.switchLang(lang)),
        maybeI18n?.lang$.subscribe(lang => {
          document.documentElement.lang = lang;
        })
      ),
    [maybeI18n, localeLang$]
  );
  return maybeI18n;
};
