import { defineConfig, presetIcons, presetWind } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
        "user-select": "none",
        cursor: "default",
      },
    }),
    presetWind(),
  ],
});
