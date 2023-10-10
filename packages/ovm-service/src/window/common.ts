import type { DefineService } from "@oomol/connection";

import { token } from "@oomol/token";

export type WindowSizeParams = {
  width: number;
  height: number;
};

// undefined will have no effect on anything
export type WindowSettingParams = {
  moveToCenter?: true;
  // more priority than minimize
  maximize?: true;
  minimize?: true;

  resizable?: boolean;
  minimumSize?: {
    width: number;
    height: number;
  };
  maximizable?: boolean;
};

export type WindowStatus = "minimize" | "maximize" | "close";

export type WindowService = DefineService<{
  events: {};
  emits: {
    updateWindowSize: WindowSizeParams;
    updateWindowSetting: WindowSettingParams;
    updateWindowStatus: WindowStatus;
  };
  invokes: {
    openURL(url: string): Promise<void>;
    getPlatform(): "mac" | "win" | "linux" | "web";
  };
}>;

export const WindowService = token<WindowService>("WindowService");
