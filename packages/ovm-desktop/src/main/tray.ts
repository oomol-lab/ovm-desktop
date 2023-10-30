import { Menu, Tray, nativeImage } from "electron";
import path from "path";

export const createTray = () => {
  const image = nativeImage.createFromPath(
    path.join(__dirname, "../../resources/icons/ovm.png")
  );

  const tray = new Tray(image);
  const trayMenu = Menu.buildFromTemplate([{ label: "quit" }]);
  tray.setContextMenu(trayMenu);
  tray.setTitle("OVM");
};
