import type { IConnectionService } from "@oomol/connection";
import type { Stream } from "stream";

import { ConnectionService } from "@oomol/connection";
import { createDarwinOVM } from "@oomol-lab/ovm";
import dayjs from "dayjs";
import Docker from "dockerode";
import { homedir } from "node:os";
import path from "node:path";

import { OVMService } from "./common";

export class OVMServiceImpl
  extends ConnectionService<OVMService, number>
  implements IConnectionService<OVMService, number>
{
  private _ready = false;
  private docker: Docker | undefined;

  public constructor(private isPackaged: boolean, private appPath: string) {
    super(OVMService);
    this.init();
  }

  private async init() {
    const ovmDir = path.join(homedir(), ".ovm");
    const resourcesDir = this.isPackaged
      ? path.join(this.appPath, "../resources")
      : path.resolve(__dirname, "../../resources");

    const ovm = await createDarwinOVM({
      originPath: {
        gvproxy: path.join(resourcesDir, "gvproxy").toString(),
        vfkit: path.join(resourcesDir, "vfkit-arm64").toString(),
        kernel: path.join(resourcesDir, "Image").toString(),
        initrd: path.join(resourcesDir, "initrd.gz").toString(),
        rootfs: path.join(resourcesDir, "rootfs.btrfs.zip").toString(),
      },
      socketDir: path.join(ovmDir, "socket").toString(),
      logDir: path.join(ovmDir, "log").toString(),
      targetDir: path.join(ovmDir, "target").toString(),
    });

    ovm.on("ready", () => {
      console.log("[OVM]: ready");
      this._ready = true;
      this.send("ready", true);

      this.docker = new Docker({
        host: "127.0.0.1",
        port: ovm.info().podmanPort,
      });
    });
    console.log("[OVM]: start");
    await ovm.start();
  }

  public async listContainers() {
    const containers = await this.docker?.listContainers({ all: true });
    return containers?.map(container => {
      return {
        id: container.Id,
        name: container.Names?.[0] || this.shortId(container.Id),
        image: container.Image,
        status: container.State,
        created: dayjs(container.Created * 1000).format("YYYY-MM-DD HH:mm:ss"),
      };
    });
  }

  public async removeContainer(id: string) {
    const container = this.docker?.getContainer(id);
    if (container) {
      await container.remove();
    }
  }

  public async listImages() {
    const images = await this.docker?.listImages();
    return images?.map(image => {
      return {
        id: image.Id,
        name: image.RepoTags?.[0] || this.shortId(image.Id),
        created: dayjs(image.Created * 1000).format("YYYY-MM-DD HH:mm:ss"),
        size: image.Size,
        tags: image.RepoTags || [],
        labels: image.Labels,
      };
    });
  }

  public async removeImage(name: string, force = false) {
    const image = await this.docker?.getImage(name);
    if (image) {
      await image.remove({ force });
    }
  }

  public async listVolumes() {
    const volumes = await this.docker?.listVolumes();
    return volumes?.Volumes.map(volume => {
      return {
        name: volume.Name,
        driver: volume.Driver,
        scope: volume.Scope,
        mountpoint: volume.Mountpoint,
        size: volume.UsageData?.Size || 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        created: dayjs((volume as any).CreatedAt).format("YYYY-MM-DD HH:mm:ss"),
      };
    });
  }

  public async removeVolume(name: string) {
    const volume = await this.docker?.getVolume(name);
    if (volume) {
      await volume.remove();
    }
  }

  public async searchImages(term: string) {
    const searchItems = (await this.docker?.searchImages({ term })) || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return searchItems.map((item: any) => {
      return {
        index: item.Index,
        name: item.Name,
        official: item.Official,
        stars: item.Stars,
        description: item.Description,
        tag: item.Tag,
        automated: item.Automated,
      };
    });
  }

  public pullImage(name: string) {
    this.docker?.pull(name, (err: Error, stream: Stream) => {
      if (err) {
        console.log(err);
      }
      stream.on("data", (data: Buffer) => {
        console.log(data.toString());
      });
      stream.on("end", () => {
        console.log("pull end");
      });
    });
  }

  private shortId(id: string) {
    return id.replace("sha256:", "").slice(0, 12);
  }

  public isReady() {
    return this._ready;
  }
}
