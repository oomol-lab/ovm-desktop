import { Menu, Tray, nativeImage } from "electron";
import path from "path";

export const createTray = () => {
  const image = nativeImage.createFromPath(
    path.join(__dirname, "../../resources/icons/logo.png")
  );
  image.setTemplateImage(true);
  const tray = new Tray(image);
  const trayMenu = Menu.buildFromTemplate([{ label: "quit" }]);
  tray.setContextMenu(trayMenu);
};
