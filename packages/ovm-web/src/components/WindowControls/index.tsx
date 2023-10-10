import type { Win11WindowControlsProps } from "./Win11WindowControls";
import type { FC } from "react";

import { OS } from "~/constants";
import { useOS } from "~/hooks";

import { MacWindowControls } from "./MacWindowControls";
import { Win11WindowControls } from "./Win11WindowControls";

/**
 * Windows Controls are the buttons on the top corner of the window.
 */

export const WindowControls: FC<Win11WindowControlsProps> = ({
  onClickWin11SystemBtn,
}) => {
  const os = useOS();
  return os === OS.Windows ? (
    <Win11WindowControls onClickWin11SystemBtn={onClickWin11SystemBtn} />
  ) : os === OS.Mac ? null : (
    <MacWindowControls />
  );
};
