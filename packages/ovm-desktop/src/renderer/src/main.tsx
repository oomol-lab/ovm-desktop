import "virtual:uno.css";

import type { AppContext } from "@oomol-lab/ovm-web";
import type { ReadonlyVal, Val } from "value-enhancer";

import { ConnectionClient } from "@oomol/connection";
import { ElectronClientAdapter } from "@oomol/connection-electron-adapter/client";
import {
  WindowService,
  SigninService,
  OVMService,
} from "@oomol-lab/ovm-service/common";
import { Appearance, StudioHome } from "@oomol-lab/ovm-web";
import { OVMStore } from "@oomol-lab/ovm-web/src/store";
import { createRoot } from "react-dom/client";
import { from, unwrap, val } from "value-enhancer";

const client = new ConnectionClient(new ElectronClientAdapter());

client.start();
const windowService = client.use(WindowService);
const signinService = client.use(SigninService);
const ovmService = client.use(OVMService);

const localeLang$ = setupPersistence(val<string | undefined>(), "localeLang");

const os = await windowService.invoke("getPlatform");
const os$ = val(os);

const appearance$ = setupPersistence(val(Appearance.Auto), "appearance");
const darkMode$ = unwrap(appearance$, mapAppearanceToDarkMode);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appContext: AppContext = {
  os$,
  appearance$,
  darkMode$,
  windowService,
  signinService,
  ovmService,
  ovmStore: new OVMStore(ovmService),
  getOoUpgrade: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any;
  },
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <StudioHome appContext={appContext} localeLang$={localeLang$} />
  </>
);

function mapAppearanceToDarkMode(
  appearance: Appearance
): ReadonlyVal<boolean> | boolean {
  if (appearance === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    return from(
      () => (prefersDark ? prefersDark.matches : false),
      notify => {
        prefersDark.addEventListener("change", notify);
        return () => prefersDark.removeEventListener("change", notify);
      }
    );
  } else {
    return appearance === "dark";
  }
}

function setupPersistence<T>(
  val$: Val<T>,
  name: string,
  parse: (str: string) => T = str => JSON.parse(str),
  serialize: (value: T) => string = value => JSON.stringify(value)
): Val<T> {
  try {
    const str = localStorage.getItem(name);
    if (str != null) {
      const data = parse(str);
      if (typeof data !== "undefined") {
        val$.set(data);
      }
    }
  } catch (e) {
    console.error(e);
  }

  val$.reaction(value => {
    localStorage.setItem(name, serialize(value));
  });

  return val$;
}
