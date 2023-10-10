import { electronAPI } from "@electron-toolkit/preload";
import { setupConnectionPreload } from "@oomol/connection-electron-adapter/preload";
import { contextBridge } from "electron";

declare global {
  interface Window {
    electron: typeof electronAPI;
    api: typeof api;
  }
}

// Custom APIs for renderer
const api = {};
setupConnectionPreload();
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
