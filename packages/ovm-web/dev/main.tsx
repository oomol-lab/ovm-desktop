/**!
 * @fileOverview For vite dev.
 */
import type { AppContext } from "../src/main";
import type { ReadonlyVal } from "value-enhancer";

import { ConnectionClient } from "@oomol/connection";
import { WebClientAdapter } from "@oomol/connection-websocket-adapter/client";
import { SigninService, WindowService } from "../../ovm-service/src/common";
import { GUI } from "lil-gui";
import { createRoot } from "react-dom/client";
import { from, unwrap, val } from "value-enhancer";

import { StudioHome, Appearance, OS } from "../src/main";
import { ControlPanel } from "./components/ControlPanel";
import { port } from "./constants";
import { accountInfoData } from "./fake-data/accountInfoData";
import { billRecordsData } from "./fake-data/billRecordsData";
import { invoicesData } from "./fake-data/invoicesData";
import { linkAccountData } from "./fake-data/linkAccountData";
import { loginDeviceData } from "./fake-data/loginDeviceData";
import { membersInfoData } from "./fake-data/membersInfoData";
import { notificationsData } from "./fake-data/notificationsData";
import { paymentHistoryData } from "./fake-data/paymentHistoryData";
import { preferencesData } from "./fake-data/preferencesData";
import { pricingData } from "./fake-data/pricingData";
import { pricingTitleData } from "./fake-data/pricingTitleData";
import { profileData } from "./fake-data/profileData";
import { projectsData } from "./fake-data/projectsData";
import { safetyRecordData } from "./fake-data/safetyRecordData";
import { secretDetailData } from "./fake-data/secretDetailData";
import { secretsData } from "./fake-data/secretsData";
import { secretTemplatesData } from "./fake-data/secretTemplatesData";
import { secretTitleData } from "./fake-data/secretTitleData";
import { upgradeData } from "./fake-data/upgradeData";

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
  getOoProjects: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return projectsData(page, count);
  },
  getOoSecrets: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return secretsData(page, count);
  },
  getOoBillRecords: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return billRecordsData(page, count);
  },
  getOoPaymentHistory: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return paymentHistoryData(page, count);
  },
  getOoInvoices: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return invoicesData(page, count);
  },
  getOoNotifications: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return notificationsData(page, count);
  },
  getOoDeviceInfo: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return loginDeviceData(page, count);
  },
  getOoSafetyRecord: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return safetyRecordData(page, count);
  },
  getOoAccountInfo: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return accountInfoData();
  },
  getOoLinkAccounts: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return linkAccountData(page, count);
  },
  getOoSecretTable: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return secretDetailData(page, count);
  },
  getOoSecretTitle: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return secretTitleData();
  },
  getOoMembersInfo: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return membersInfoData();
  },
  getOoUpgrade: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return upgradeData();
  },
  getOoPricing: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return pricingData();
  },
  getOoPricingTitle: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return pricingTitleData();
  },
  getOoProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return profileData();
  },
  getOoPreferences: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return preferencesData();
  },
  getOoSecretTemplates: async (page?: number, count?: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return secretTemplatesData(page, count);
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
