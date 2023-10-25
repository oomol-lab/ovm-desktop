import type { IConnectionService } from "@oomol/connection";
import type { DarwinOVM } from "@oomol-lab/ovm";
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
  private ovm: DarwinOVM | undefined;

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
        gvproxy: path.join(resourcesDir, "gvproxy"),
        vfkit: path.join(resourcesDir, "vfkit-arm64"),
        kernel: path.join(resourcesDir, "Image"),
        initrd: path.join(resourcesDir, "initrd.gz"),
        rootfs: path.join(resourcesDir, "rootfs.btrfs.zip"),
      },
      socketDir: path.join(ovmDir, "socket"),
      logDir: path.join(ovmDir, "log"),
      targetDir: path.join(ovmDir, "target"),
    });
    this.ovm = ovm;

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
        name: trimName(container.Names?.[0] || shortId(container.Id)),
        image: container.Image,
        status: container.State,
        created: dayjs(container.Created * 1000).format("YYYY-MM-DD HH:mm:ss"),
      };
    });
  }

  public async createContainer(
    imageName: string,
    containerName: string | undefined
  ) {
    const container = await this.docker?.createContainer({
      Image: imageName,
      name: containerName,
    });
    await container?.start();
    const inspect = await container?.inspect();
    return inspect?.Name;
  }

  public async getContainer(id: string) {
    const container = await this.docker?.getContainer(id);
    if (container) {
      const inspect = await container.inspect();
      return {
        id: inspect.Id,
        name: trimName(inspect.Name),
        status: inspect.State.Status,
        image: inspect.Config.Image,
        created: dayjs(inspect.Created).format("YYYY-MM-DD HH:mm:ss"),
      };
    }
  }

  public async getContainerLog(id: string): Promise<string | undefined> {
    const container = await this.docker?.getContainer(id);
    if (container) {
      return new Promise((resolve, reject) => {
        container.logs({ stdout: true }, (err, buffer) => {
          if (err) {
            reject(err);
          }
          resolve(buffer?.toString() || "");
        });
      });
    }
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
      return toImageInfo(image);
    });
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
    return new Promise((resolve, reject) => {
      this.docker?.pull(name, (err: Error, stream: Stream) => {
        if (err) {
          reject(err);
        }
        stream.on("data", (data: Buffer) => {
          console.log(data.toString());
        });
        stream.on("end", () => {
          resolve(true);
        });
        stream.on("error", (err: Error) => {
          console.error(err);
        });
      });
    });
  }

  public async getImage(name: string) {
    const image = await this.docker?.getImage(name);
    if (image) {
      const inspect = await image.inspect();
      return toImageInfo(inspect);
    }
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

  public async stop() {
    await this.ovm?.stop();
  }

  public isReady() {
    return this._ready;
  }
}

function toImageInfo(image: Docker.ImageInfo | Docker.ImageInspectInfo) {
  const created =
    typeof image.Created === "number" ? image.Created * 1000 : image.Created;
  return {
    id: image.Id,
    name: image.RepoTags?.[0] || shortId(image.Id),
    created: dayjs(created).format("YYYY-MM-DD HH:mm:ss"),
    size: image.Size,
    tags: image.RepoTags || [],
  };
}

function shortId(id: string) {
  return id.replace("sha256:", "").slice(0, 12);
}

function trimName(name: string) {
  return name.startsWith("/") ? name.slice(1) : name;
}
