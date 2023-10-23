import { build, Platform } from "electron-builder";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const run = async () => {
  await build({
    targets: Platform.MAC.createTarget(),
    config: {
      appId: "ovm-desktop",
      productName: "OVM-Desktop",
      files: ["dist", "package.json"],
      asar: true,
      icon: "./icon/ovm.png",
      extraResources: [
        {
          from: path.resolve(__dirname, "../resources"),
          to: "resources",
        },
      ],
      directories: {
        output: path.join(__dirname, "../out", process.arch),
      },
      mac: {
        artifactName: "${productName}.${ext}",
        target: "dmg",
        identity: null,
      },
    },
  });
  console.log("Build complete");
};

run().catch(e => {
  console.error(e);
  process.exit(1);
});
