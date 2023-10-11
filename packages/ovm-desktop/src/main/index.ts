import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { ConnectionServer } from "@oomol/connection";
import { ElectronServerAdapter } from "@oomol/connection-electron-adapter/server";
import { WindowServiceImpl } from "@oomol-lab/ovm-service/node";
import { BrowserWindow, app, dialog, shell } from "electron";
import path, { join } from "path";

const server = new ConnectionServer(new ElectronServerAdapter());

server.start();

server.registerService(new WindowServiceImpl());

// 使用参考上文 `opensumi` 后端
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
    titleBarStyle: "hidden",
    trafficLightPosition: {
      x: 18,
      y: 18,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url).catch(err => {
      dialog.showErrorBox("Error", err.message);
    });
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("open-url", (_event, url) => {
  dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// https://www.electronjs.org/zh/docs/latest/tutorial/%E4%BB%8E%E5%85%B6%E4%BB%96%E5%BA%94%E7%94%A8%E4%B8%AD%E7%9A%84URL%E5%90%AF%E5%8A%A8%E5%BA%94%E7%94%A8
// TODO: Windows 下需要额外一些处理，需要在 Windows 下进行测试

const appSchema = "ovm-desktop";

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(appSchema, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  } else {
    app.setAsDefaultProtocolClient(appSchema);
  }
}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
