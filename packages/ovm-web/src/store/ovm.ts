import type { ConnectionClientService } from "@oomol/connection";
import type {
  ContainerInfo,
  ImageInfo,
  OVMService,
} from "@oomol-lab/ovm-service/common";

import { throttle } from "lodash-es";
import { val } from "value-enhancer";

export class OVMStore {
  private whenReady: Promise<void> | undefined;

  public loading$ = val(true);
  public images$ = val<ImageInfo[]>([]);
  public containers$ = val<ContainerInfo[]>([]);

  public constructor(private ovmService: ConnectionClientService<OVMService>) {
    this.whenReady = new Promise(resolve => {
      const dispose = this.ovmService.on("ready", () => {
        resolve();
      });

      this.ovmService.invoke("isReady").then(ready => {
        if (ready) {
          dispose();
          resolve();
        }
      });
    });
    this.whenReady.then(() => {
      this.loading$.set(false);
    });
  }

  public async listContainers() {
    await this.whenReady;
    const containers = await this.ovmService.invoke("listContainers");
    if (containers) {
      this.containers$.set(containers);
    }
  }

  public async getContainer(id: string) {
    await this.whenReady;
    return this.ovmService.invoke("getContainer", id);
  }

  public async getContainerLog(id: string) {
    await this.whenReady;
    return this.ovmService.invoke("getContainerLog", id);
  }

  public filterContainers(term: string) {
    const filterContainers = this.containers$.value.filter(container =>
      container.name.includes(term)
    );
    this.containers$.set(filterContainers);
  }

  public async createContainer(
    imageName: string,
    containerName: string | undefined
  ) {
    await this.whenReady;
    return this.ovmService.invoke("createContainer", imageName, containerName);
  }

  public async removeContainer(id: string) {
    await this.whenReady;
    return this.ovmService.invoke("removeContainer", id);
  }

  public async listImages() {
    await this.whenReady;
    const images = await this.ovmService.invoke("listImages");
    if (images) {
      this.images$.set(images);
    }
  }

  public filterImages = (term: string) => {
    const images = this.images$.value.filter(image =>
      image.name.includes(term)
    );
    this.images$.set(images);
  };

  public async removeImage(name: string, force?: boolean) {
    await this.whenReady;
    return this.ovmService.invoke("removeImage", name, force);
  }

  public async listVolumes() {
    await this.whenReady;
    return this.ovmService.invoke("listVolumes");
  }

  public async removeVolume(name: string) {
    await this.whenReady;
    return this.ovmService.invoke("removeVolume", name);
  }

  public searchImages = throttle(async (term: string) => {
    await this.whenReady;
    return this.ovmService.invoke("searchImages", term);
  }, 1000);

  public getImage(name: string) {
    return this.ovmService.invoke("getImage", name);
  }

  public pullImage(name: string) {
    return this.ovmService.invoke("pullImage", name);
  }
}
