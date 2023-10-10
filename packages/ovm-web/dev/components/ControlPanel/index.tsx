import styles from "./ControlPanel.module.scss";

import type { GUI } from "lil-gui";

import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { val } from "value-enhancer";

export interface ControlPanelProps {
  gui: GUI;
}

/**
 * A hidden control panel.
 * To show/hide the control panel, press `Ctrl+oomol`
 */
export const ControlPanel = ({ gui }: ControlPanelProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(
    () => localStorage.getItem("lil-gui-show") === "show"
  );

  useEffect(() => {
    if (show && ref.current) {
      ref.current.appendChild(gui.domElement);
    }
  }, [show]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const keyStrokes$ = val("");
    keyStrokes$.reaction(keyStrokes => {
      if (keyStrokes === "oo") {
        setShow(show => !show);
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => keyStrokes$.set(""), 500);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key !== "Control") {
        keyStrokes$.set(keyStrokes$.value + e.key.toLowerCase());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem("lil-gui-show", show ? "show" : "hide");
  }, [show]);

  return (
    <>
      {show && (
        <div className={styles.container}>
          <div ref={ref}></div>
          <button className={styles.close} onClick={() => setShow(false)}>
            <CloseOutlined />
          </button>
        </div>
      )}
    </>
  );
};
