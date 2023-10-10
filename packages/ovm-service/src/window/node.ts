// test.service.impl.ts
import type {
  WindowSettingParams,
  WindowSizeParams,
  WindowStatus,
} from "./common";
import type {
  AdapterServerEventPayload,
  IConnectionService,
} from "@oomol/connection";

import { ConnectionService } from "@oomol/connection";
import { BrowserWindow, shell, webContents } from "electron";

import { WindowService } from "./common";

type ElectronConnectionId = number;

export class WindowServiceImpl
  extends ConnectionService<WindowService, ElectronConnectionId>
  implements IConnectionService<WindowService, ElectronConnectionId>
{
  public constructor() {
    super(WindowService);
    this.events.on("updateWindowSize", e => this.updateWindowSize(e));
    this.events.on("updateWindowSetting", e => this.updateWindowSetting(e));
    this.events.on("updateWindowStatus", e => this.updateWindowStatus(e));
  }

  private updateWindowSize(
    e: AdapterServerEventPayload<WindowSizeParams, ElectronConnectionId>
  ): void {
    if (e.clientId && webContents.fromId(e.clientId)) {
      const window = BrowserWindow.fromWebContents(
        webContents.fromId(e.clientId!)!
      );
      if (!window) {
        return;
      }

      window.setSize(e.data.width, e.data.height);
    }
  }

  private updateWindowSetting(
    e: AdapterServerEventPayload<WindowSettingParams, ElectronConnectionId>
  ): void {
    if (e.clientId && webContents.fromId(e.clientId)) {
      const window = BrowserWindow.fromWebContents(
        webContents.fromId(e.clientId!)!
      );
      if (!window) {
        return;
      }

      const { moveToCenter, resizable, minimumSize, maximizable } = e.data;

      if (moveToCenter) {
        window.center();
      }

      if (minimumSize) {
        window.setMinimumSize(minimumSize.width, minimumSize.height);
      }

      if (resizable != null) {
        window.resizable = resizable;
      }

      if (maximizable) {
        window.maximizable = maximizable;
      } else if (maximizable === false) {
        // isMaximized() always return false on macOS. this is a workaround.
        window.isMaximizable() && window.unmaximize();
        window.maximizable = maximizable;
      }
    }
  }

  private updateWindowStatus(
    e: AdapterServerEventPayload<WindowStatus, ElectronConnectionId>
  ): void {
    if (e.clientId && webContents.fromId(e.clientId)) {
      const window = BrowserWindow.fromWebContents(
        webContents.fromId(e.clientId!)!
      );
      if (!window) {
        return;
      }

      switch (e.data) {
        case "minimize": {
          window.minimize();
          break;
        }
        case "maximize": {
          if (window.isMaximized()) {
            window.unmaximize();
          } else {
            window.maximize();
          }
          break;
        }
        case "close": {
          window.close();
          break;
        }
      }
    }
  }

  public async openURL(url: string): Promise<void> {
    await shell.openExternal(url);
  }

  public getPlatform(): "mac" | "win" | "linux" | "web" {
    return process.platform === "darwin"
      ? "mac"
      : process.platform === "win32"
      ? "win"
      : process.platform === "linux"
      ? "linux"
      : "web";
  }
}
