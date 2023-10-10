/**!
 * @fileOverview For vite dev.
 */
import type { AppContext } from "../src/main";
import type { ReadonlyVal } from "value-enhancer";

import { ConnectionClient } from "@oomol/connection";
import { WebClientAdapter } from "@oomol/connection-websocket-adapter/client";
import { GUI } from "lil-gui";
import { createRoot } from "react-dom/client";
import { from, unwrap, val } from "value-enhancer";

import { StudioHome, Appearance, OS } from "../src/main";
import { ControlPanel } from "./components/ControlPanel";
import { port } from "./constants";
import { preferencesData } from "./fake-data/preferencesData";
import { upgradeData } from "./fake-data/upgradeData";
import { SigninService, WindowService } from "../../ovm-service/src/common";

const gui = new GUI({ autoPlace: false });

const ws = new WebSocket(`ws://localhost:${port}/`);
const adapter = new WebClientAdapter(ws);
const client = new ConnectionClient(adapter);
client.start();

const signinService = client.use(SigninService);
const windowService = client.use(WindowService);

const appearance$ = val(Appearance.Dark);
gui.add(appearance$, "value", [
  Appearance.Auto,
  Appearance.Light,
  Appearance.Dark,
]);

const darkMode$ = unwrap(appearance$, mapAppearanceToDarkMode);
darkMode$.subscribe(darkMode => {
  document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
});

const localeLang$ = val<string | undefined>();
gui.add(localeLang$, "value", ["en", "zh-CN", undefined]).name("localeLang");

const os$ = val(OS.Windows);
os$.subscribe(os => localStorage.setItem("os", os));
gui.add(os$, "value", [OS.Mac, OS.Windows, OS.Linux]).name("os");

const appContext: AppContext = {
  os$,
  darkMode$,
  getOoUpgrade: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return upgradeData();
  },
  getOoPreferences: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return preferencesData();
  },

  signinService,
  windowService,
};

setupGUIPersistence(gui);

const root = createRoot(document.getElementById("root")!);
root.render(
  <StudioHome appContext={appContext} localeLang$={localeLang$}>
    <ControlPanel gui={gui} />
  </StudioHome>
);

function setupGUIPersistence(gui: GUI): void {
  try {
    const storage = localStorage.getItem("lil-gui");
    if (storage) {
      gui.load(JSON.parse(storage));
    }
  } catch (e) {
    console.error(e);
  }

  let guiSaveTimeout: ReturnType<typeof setTimeout> | undefined;
  gui.onChange(() => {
    clearTimeout(guiSaveTimeout);
    guiSaveTimeout = setTimeout(() => {
      localStorage.setItem("lil-gui", JSON.stringify(gui.save()));
    }, 1000);
  });
}

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
